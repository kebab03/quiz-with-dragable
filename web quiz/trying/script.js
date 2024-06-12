const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Shri Lanka", correct: false },
        ]
    },
    {
        question: "Put the deserts in the correct order by size (smallest to largest):",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const optionsContainer = document.getElementById("optionsContainer");
const checkOrderBtn = document.getElementById("checkOrderBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    checkOrderBtn.innerHTML = "Check Order";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    if (currentQuestionIndex === 2) { // Special case for the drag-and-drop question
        optionsContainer.style.display = "flex";
        checkOrderBtn.style.display = "block";
    } else {
        answerButtons.style.display = "flex";
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        });
    }
}

function resetState() {
    answerButtons.style.display = "none";
    optionsContainer.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    checkOrderBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    checkOrderBtn.innerHTML = "Play Again";
    checkOrderBtn.style.display = "block";
}

function handleCheckOrderButton() {
    if (currentQuestionIndex === 2) {
        checkOrder();
    } else {
        handleNextButton();
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function checkOrder() {
    const itemsInOrder = ["Kalahari", "Gobi", "Sahara", "Antarctica"];
    const userOrder = Array.from(optionsContainer.children).map(option => option.textContent);

    if (arraysEqual(itemsInOrder, userOrder)) {
        document.getElementById("result").textContent = "Correct! Well done!";
        document.getElementById("result").classList.add("correct");
    } else {
        document.getElementById("result").textContent = "Incorrect. Try again.";
        document.getElementById("result").classList.remove("correct");
    }

    document.getElementById("result").style.display = "block";
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

checkOrderBtn.addEventListener("click", handleCheckOrderButton);

startQuiz();
