// Highscore Variables
var highscoreList = JSON.parse(localStorage.getItem("highscores")) || [];
var storedHighscores;

// HTML Elements
var highscoreListEL = document.getElementById('highscore-list');
var newGameBtn = document.getElementById('new-game');
var clearScoreBtn = document.getElementById('clear-scores');

// Event Listeners
newGameBtn.onclick = function () {
    location.href = "./index.html";
};
clearScoreBtn.addEventListener('click', clearHighscores);

// Gets and displays the stored highscores
function getHighscores() {
    if (highscoreList.length > 0) {
        storedHighscores = JSON.parse(localStorage.getItem('highscores'));
        storedHighscores.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)
        );
        for (i = 0; i < storedHighscores.length; i++) {
            let highscoreItem = document.createElement('li');
            highscoreItem.textContent = `${storedHighscores[i].name} - ${storedHighscores[i].score}`;

            highscoreListEL.appendChild(highscoreItem);
        } 
    } else {
        console.log("No highscores");
    }
};

function clearHighscores(event) {
    event.preventDefault();
    localStorage.removeItem('highscores');
    location.reload();
};
getHighscores();
