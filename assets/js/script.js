var startBtn = document.getElementById('start-btn');
var timerEl = document.getElementById('countdown-timer');
var introEl = document.getElementById('intro');
var questionsEl = document.getElementById('questions');
var questionContainer = document.createElement("div");
questionContainer.className = "question-container";
var timeLeft = 75;

var questions = [
    {q: "Commonly used data types do not include:", a1: "booleans", a2: "strings", a3: "numbers", a4: "alerts"},
    {q: "The condition in an if/else statement is enclosed with _____", a1: "curly brackets", a2: "square brackets", a3: "quotes", a4: "parenthesis"},
    {q: "Arrays in JavaScript can be used to store _____", a1: "other arrays", a2: "numbers and strings", a3: "booleans", a4: "all of the above"}
];

var player = {
    name: "",
    score: 0,
    reset: function () {
        this.name = "";
        this.score = 0;
    }
}

function countdown() {

    setInterval(function() {
        //start timer
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);

    introEl.style.display = 'none';
    createQuestion();
};

function createQuestion() {
    //debugger
    var questionText = document.createElement("h2");
    questionText.className = "question-text";
    var option1 = document.createElement("button");
    option1.className = "answer-option";
    var option2 = document.createElement("button");
    option2.className = "answer-option";
    var option3 = document.createElement("button");
    option3.className = "answer-option";
    var option4 = document.createElement("button");
    option4.className = "answer-option correct-answer";
    questionsEl.appendChild(questionContainer);
    questionContainer.appendChild(questionText);
    questionContainer.appendChild(option1);
    questionContainer.appendChild(option2);
    questionContainer.appendChild(option3);
    questionContainer.appendChild(option4);

    questionText.textContent = questions[0].q;
    option1.textContent = questions[0].a1;
    option2.textContent = questions[0].a2;
    option3.textContent = questions[0].a3;
    option4.textContent = questions[0].a4;

};

var clickAnswerHandler = function(event) {
    var targetEl = event.target;
    var horizontalLine = document.createElement("hr");
    var answerValid = document.createElement("p");

    if(targetEl.matches(".correct-answer")) {
        answerValid.textContent = "Correct";
        questionContainer.appendChild(horizontalLine);
        questionContainer.appendChild(answerValid);
    } else if(targetEl.matches(".answer-option")) {
        answerValid.textContent = "Incorrect";
        questionContainer.appendChild(horizontalLine);
        questionContainer.appendChild(answerValid);
        timeLeft = timeLeft - 10;
    }

    setTimeout(createQuestion, 1000);
};

startBtn.onclick = countdown;
questionsEl.addEventListener("click", clickAnswerHandler);    
