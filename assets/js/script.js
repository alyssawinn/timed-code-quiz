//Intro Section
var startBtn = document.getElementById('start-btn');
var timerEl = document.getElementById('countdown-timer');
var introEl = document.getElementById('intro');

//Questions Section
var questionsEl = document.getElementById('questions');
var questionContainer = document.createElement("div");
var timeLeft = 75;
var questionCounter = 0;
questionContainer.className = "question-container";
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

//Enter Score Page
var enterScoreEl = document.getElementById('enter-score');
var initialsInput = document.createElement("input");
initialsInput.className = "input-box";
initialsInput.setAttribute("id", "initials-input");
var scoreContainer = document.createElement("div");
var scoreHeader = document.createElement("h1");
var totalScore = document.createElement("h2");
var initialsContainer = document.createElement("p");
var submitButton = document.createElement("button");
submitButton.className = "submit-button";

//Highscores Page
var highscoresList = document.getElementById('high-scores-list');


var questions = [
    {q: "Commonly used data types do not include:", choices: ["booleans", "strings", "numbers", "alerts"], answer: "alerts"},
    {q: "The condition in an if/else statement is enclosed with _____", choices: [ "curly brackets", "square brackets", "quotes", "parenthesises"], answer: "parenthesises"},
    {q: "Arrays in JavaScript can be used to store _____", choices: ["other arrays", "numbers and strings", "booleans", "all of the above"], answer: "all of the above"}
];

var player = {
    name: "",
    score: 0,
    reset: function () {
        this.name = "";
        this.score = 0;
    }
}

function showHighScores() {
    var highScores = localStorage.setItem("player", JSON.stringify(player));
};

function redirectToHighscores() {
    player.name = document.getElementById('initials-input').value;
    showHighScores();
    setTimeout(function() {
        window.location = "./highscores.html";
    }, 100);
    showHighScores();
};

function setScore() {
    player.score = timeLeft;
    scoreHeader.textContent = "All done!";
    totalScore.textContent = "Your final score is " + player.score + ".";
    initialsContainer.textContent = "Enter initials: ";
    submitButton.textContent = "Submit";
    questionsEl.remove();
    enterScoreEl.appendChild(scoreContainer);
    scoreContainer.appendChild(scoreHeader);
    scoreContainer.appendChild(totalScore);
    scoreContainer.appendChild(initialsContainer);
    initialsContainer.appendChild(initialsInput);
    initialsContainer.appendChild(submitButton);
};

function countdown() {
    setInterval(function() {
        //start timer
        if (timeLeft > 0 && player.score == 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else if (timeLeft < 1 && player.score == 0) {
            timeLeft = 0;
            setScore();
        }
    }, 1000);
    introEl.style.display = 'none';
    createQuestion();
};

function createQuestion() {
    questionsEl.appendChild(questionContainer);
    questionContainer.appendChild(questionText);
    questionContainer.appendChild(option1);
    questionContainer.appendChild(option2);
    questionContainer.appendChild(option3);
    questionContainer.appendChild(option4);
    showQuestion();
};

function showQuestion() {
    if (questionCounter < questions.length) {
        questionText.textContent = questions[questionCounter].q;
        /* var randomArray = [];
        for (var i=0; i < questions.choices.length; i++) {
            var randomIndex = [Math.floor(Math.random() * questions.choices.length)];
            console.log(randomIndex);
            randomArray.push(questions.choices[randomIndex]);
          }
          
        randomArray.join(",");
        console.log(randomArray); */
        option1.textContent = questions[questionCounter].choices[0];
        option2.textContent = questions[questionCounter].choices[1];
        option3.textContent = questions[questionCounter].choices[2];
        option4.textContent = questions[questionCounter].choices[3];
        questionCounter++;
    } else {
        setScore();
    }
        
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

    setTimeout(function() {
        horizontalLine.remove();
        answerValid.remove();
        showQuestion();
    }, 1000);
};

startBtn.onclick = countdown;
submitButton.onclick = redirectToHighscores;
questionsEl.addEventListener("click", clickAnswerHandler);



