from flask import Flask, render_template

app = Flask(__name__)

# Your quiz code here (the functions and the tkinter GUI code)

# Define routes
@app.route('/')
def index():
    return render_template('quiz.html')  # Render the HTML containing the quiz

if __name__ == '__main__':
    app.run(debug=True)
