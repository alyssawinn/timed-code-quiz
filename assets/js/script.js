//Intro Section
var startBtn = document.getElementById('start-btn');
var timerEl = document.getElementById('countdown-timer');
var introEl = document.getElementById('intro');

//Questions Section
var questionsEl = document.getElementById('questions');
var timeLeft = 30;
var timeStopped = 0;
var questionCounter = 0;
answerContainer = document.createElement("div");
answerContainer.className = "answer-container";
var questionText = document.createElement("h2");
questionText.className = "question-text";
var option1Container = document.createElement("div");
option1Container.className = "option-container"
var option1 = document.createElement("button");
option1.className = "answer-option";
var option2Container = document.createElement("div");
option2Container.className = "option-container"
var option2 = document.createElement("button");
option2.className = "answer-option";
var option3Container = document.createElement("div");
var option3 = document.createElement("button");
option3.className = "answer-option";
option3Container.className = "option-container"
var option4Container = document.createElement("div");
option4Container.className = "option-container"
var option4 = document.createElement("button");
option4.className = "answer-option correct-answer";

//Enter Score Section
var enterScoreEl = document.getElementById('enter-score');
var initialsInput = document.createElement("input");
initialsInput.className = "input-box";
initialsInput.setAttribute("id", "initials-input");
initialsInput.setAttribute("name", "initials-input");
var scoreContainer = document.createElement("div");
var scoreHeader = document.createElement("h1");
var totalScore = document.createElement("h2");
var initialsContainer = document.createElement("p");
var submitButton = document.createElement("button");
submitButton.className = "submit-button";

//High Score Page
var highScoresContainer = document.getElementById('high-scores-container');
var restartBtn = document.getElementById('restart-btn');
var clearBtn = document.getElementById('clear-btn');
var scores = [];

var questions = [
    {q: "Commonly used data types do not include:", choices: ["booleans", "strings", "numbers", "alerts"], answer: "alerts"},
    {q: "The condition in an if/else statement is enclosed with _____", choices: [ "curly brackets", "square brackets", "quotes", "parenthesises"], answer: "parenthesises"},
    {q: "Arrays in JavaScript can be used to store _____", choices: ["other arrays", "numbers and strings", "booleans", "all of the above"], answer: "all of the above"}
];

var saveScore = function() {
    localStorage.setItem("scores", JSON.stringify(scores));
};

function loadScores() {
    var savedScores = localStorage.getItem("scores");

    if (!savedScores) {
        return false;
    }

    savedScores = JSON.parse(savedScores);
    for (var i = 0; i < savedScores.length; i++) {
        loadPlayer(savedScores[i]);
    }
}

function createPlayer() {
    var playerName = document.querySelector("input[name='initials-input']").value;
    var player = {
        name: playerName,
        score: timeLeft,
    };

    setTimeout(function() {
        window.location = "./highscores.html";
    }, 100);

    debugger
    loadScores();

    loadPlayer(player);
    
};

var loadPlayer = function(player) {
    var playerItem = document.createElement("li");
    playerItem.className = "player-item";
    var playerDetails = document.createElement("div");
    playerDetails.className = "player-details";
    playerDetails.innerHTML = player.name + " - " + player.score;
    scores.push(player);
    saveScore();
}

function setScore() {
    timeStopped = 1;
    var playerScore = timeLeft;
    timerEl.style.display = 'none';
    scoreHeader.textContent = "All done!";
    totalScore.textContent = "Your final score is " + playerScore + ".";
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
    var timer = setInterval(function() {
        //start timer
        if (timeLeft > 0 && timeStopped === 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else if (timeLeft == 0) {
            timeLeft = 0;
            setScore();
        }
    }, 1000);
    introEl.style.display = 'none';
    showQuestion();
};

function showQuestion() {
    questionsEl.appendChild(questionText);
    questionsEl.appendChild(answerContainer);
    answerContainer.appendChild(option1Container);
    answerContainer.appendChild(option2Container);
    answerContainer.appendChild(option3Container);
    answerContainer.appendChild(option4Container);
    option1Container.appendChild(option1);
    option2Container.appendChild(option2);
    option3Container.appendChild(option3);
    option4Container.appendChild(option4);
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
        answerContainer.appendChild(horizontalLine);
        answerContainer.appendChild(answerValid);
    } else if(targetEl.matches(".answer-option")) {
        answerValid.textContent = "Incorrect";
        answerContainer.appendChild(horizontalLine);
        answerContainer.appendChild(answerValid);
        timeLeft = timeLeft - 5;
    }

    setTimeout(function() {
        horizontalLine.remove();
        answerValid.remove();
        showQuestion();
    }, 1000);
};

startBtn.onclick = countdown;
submitButton.onclick = createPlayer;
questionsEl.addEventListener("click", clickAnswerHandler);



