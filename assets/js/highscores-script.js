/* var loadScores = function() {
    var highscoresList = localstorage.getItem("player");

    if (!highscoresList) {
        return false;
    }

    highscoresList = JSON.parse(highscoresList);

    for(var i = 0; i < highscoresList.length; i++) {
        createScoreEl(highscoresList[i]);
    }
};

var createScore = function(player) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "score-item";
    listItemEl.setAttribute("data-score-id", scoreIdCounter);
    var scoreInfoEl = document.createElement("div");
    scoreInfoEl.className = "score-info";
    scoreInfoEl.innerHTML = player.name + " - " + player.score;
    highscoresListEl.appendChild(listItemEl);
    listItemEl.appendChild(scoreInfoEl);
    player.id = scoreIdCounter;
    scores.push(player);
} */