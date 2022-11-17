// List of Questions for the Quiz
var questions = [
    {
        prompt: 'What is the correct precedence of the operator in javascript',
        choices: ['()[].++', '++.[]()' , '.++[]()', '()++.[]'],
        answer: '()[].++',
    },
    {
        prompt: 'What is the role of continue keyword inside a loop',
        choices: ['Restart the loop', 'Break out of the loop', 'Ignore the rest of the statements below it and continue the loop', 'None of the above'],
        answer: 'Ignore the rest of the statements below it and continue the loop',
    },
    {
        prompt: "Is a variable named 'apple' same as 'Apple' in javascript?",
        choices: ['YES', 'NO', 'Only when we used "strict', 'None of the above'],
        answer: 'NO',
    },
    {
        prompt: 'Which of the following represents loops in javascript?',
        choices: ['for', 'while', 'forEach', 'All of the above'],
        answer: 'All of the above',
    },
    {
        prompt:
            'An object is an unordered collection of _______.',
        choices: ['values', 'names', 'Properties', 'All of the above'],
        answer: 'Properties',
    },
];

// Quiz Variables
var interval = 15;
var time = questions.length * interval;
var timerCount;
var score;
var qIndex = 0;

// Highscore Variables
var highscoreList = JSON.parse(localStorage.getItem("highscores")) || [];
var storedHighscores;
// HTML Elements
var timeDisplayEL = document.getElementById('timer');
var timeEl = document.getElementById('time');
var finalTimeEl;
var startBtn = document.getElementById('start');
var overlayEl = document.getElementById('overlay');
var quizEl = document.getElementById('quiz');
var responseEl = document.getElementById('question-response');
var responseBackingEl = document.getElementById('backing');
var highscorePromptEl = document.getElementById('highscore-prompt');
var nameForm = document.getElementById('highscore-name');
var nameField = document.getElementById('name');
var questionEl;
var answerEl;

// Event Listeners
startBtn.addEventListener("click", startQuiz);

// Main Quiz Function
function startQuiz() {
    timeEl.textContent = time;
    // Hide the overlay and reveal the questions
    overlayEl.classList.add('hide');
    quizEl.classList.remove('hide');
    timeDisplayEL.classList.remove('hide');

    // Update and start the timer
    timerCount = setInterval(countDown, 1000);

    // Show Questions
    displayQuestion();
};

// Time Decrementor
function countDown() {
    // While there is time left
    if (time > 0) {
        // Decrement time
        time--;
        // Update shown time
        timeEl.textContent = time;
    } else {
        // When time runs out ends the game
        clearInterval(timerCount);
        endQuiz();
    }
};

// Builds the HTML for each Question
function displayQuestion() {
    
    // Container for the question 
    questionEl = document.createElement('div');

    // Prompt text for the question
    let qPromptEl = document.createElement('p');
    qPromptEl.classList.add('question-promt')
    qPromptEl.innerText = questions[qIndex].prompt;
    questionEl.appendChild(qPromptEl);

    // List of question choices
    let qListEl = document.createElement('ol');
    qListEl.classList.add('question-list');
    // Iterates over the list of choices and adds them to the list
    for (i = 0; i < questions[qIndex].choices.length; i++) {
        let choiceEl = document.createElement('li');
        choiceEl.classList.add('question');
        let choiceBtn = document.createElement('button');
        choiceBtn.innerHTML = (`${(i + 1)}. ${questions[qIndex].choices[i]}`);
        choiceBtn.setAttribute('value', questions[qIndex].choices[i])
        choiceEl.appendChild(choiceBtn);
        qListEl.appendChild(choiceEl);
        choiceEl.addEventListener('click', checkAnswer);

    }

    // Updates the HTML with the created DOM Elements
    questionEl.appendChild(qListEl);
    quizEl.append(questionEl);

};

// Removes the current question
function clearQuestion() {
    if (!quizEl.hasChildNodes()) {
        return;
    }
    quizEl.removeChild(questionEl);
}

// Checks if the current answer is correct
function checkAnswer(event) {
    event.preventDefault();
// Only activate on button clicks
    if (event.target.nodeName === 'BUTTON' && qIndex <= questions.length) {
        if (event.target.attributes.value.value === questions[qIndex].answer) {
            showAnswer('correct');
        } else {
            showAnswer('wrong');
            
            // Time penatly for wrong answers
            time -= interval;
            if (time <= 0) {
                time = 0;
            }
        }
    }
}

// Shows the correct answer with a background to indicate correct/wrong answer
function showAnswer(answerStatus) {
    // Reveals the response element and adds the correct answer to it
    responseBackingEl.classList.remove('hide');
    responseEl.classList.add(answerStatus);
    responseEl.innerText = `Correct Answer: ${questions[qIndex].answer}`;

    // Keeps the answer visible for 500ms
    setTimeout(function () {
        responseBackingEl.classList.add('hide');
        responseEl.classList.remove(answerStatus);
        nextQuestion();
    }, 250);

}

// Updates the questions index (getting a new question) if available, else ending the quiz
function nextQuestion() {
    qIndex++;
    // If time is up or there are no more questions
    if (time < 1 || qIndex >= questions.length) {
        clearQuestion();
        qIndex = questions.length;
        endQuiz();
    // If there are more questions clear the current one and get the next one
    } else if (qIndex < questions.length) {
        clearQuestion();
        displayQuestion();
    } 
}

// Updates time display (shows penalty if final answer was wrong) and stops the count
function endQuiz() {
    timeEl.textContent = time;
    if (time > 0) {
        clearInterval(timerCount);
    }
    clearQuestion();
    showForm();
};

// Shows form for submitting highscores
function showForm() {
    highscorePromptEl.classList.remove('hide');
    finalTimeEl = document.getElementById('final-time');
    finalTimeEl.textContent = time;
    nameForm.addEventListener('submit', setHighscores);
}

// Add the current score to the highscore list
function setHighscores(event) {
    event.preventDefault();
    score = {
        score: time,
        name: nameField.value
    };
    highscoreList.push(score);
    localStorage.setItem('highscores', JSON.stringify(highscoreList));
    // Go to the highscore page. Pause to ensure score is saved
    setInterval(location.href = "./highscores.html", 1000);

}
