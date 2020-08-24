// create an array of quiz questions
var questions = [
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answers: ["commas", "curly brackers", "quotes", "parenthesis"],
        correct: "quotes",
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above",
    },
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correct: "parenthesis",
    },
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correct: "alerts",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correct: "console.log",
    }
]

// get start button element
var startButtonEl = document.querySelector("#start-btn");
// get quiz question text element
var quizQuestionTextEl = document.querySelector("#quiz-question-text");
// get quiz question list element
var quizQuestionListEl = document.querySelector("#quiz-question-list");
// get correct alert p element
var correctAlertEl = document.querySelector("#correct-alert");
// get time display
var timeDisplayEl = document.querySelector("#time-display");
// get high score display
var highScoreDisplayEl = document.querySelector("#high-score-display");
// get last score display
var lastScoreDisplayEl = document.querySelector("#last-score-display");
// create var to track current question index
var currentQuestion = 0;
// create var for time left
var timeLeft = 75;

// function to start quiz on button click
var startQuiz = function(event){
    // set timeLeft
    timeLeft = 75;
    // set current question
    currentQuestion = 0;
    // update question text 
    updateQuizQuestion(currentQuestion);
    // start time
    countDown();
}

// function to decrement timer
var countDown = function (){
    // set timer to 75
    timeDisplayEl.textContent = timeLeft;
    // create setInterval function to decrement time
    var timeInterval = setInterval(function(){
        if (timeLeft > 0){
            // decrement timer
            timeDisplayEl.textContent = --timeLeft;
            //console.log(timeLeft);
        }
        else {
            clearInterval(timeInterval);
            // if time runs out, end the game
            endGame();
        }
        // if there are no more questions, stop timer
        if (currentQuestion == questions.length){
            // stop timer
            clearInterval(timeInterval);
        }
    }, 1000);
}

// function to add question text and question answer options to html
var updateQuizQuestion = function(index){
    // update question text
    quizQuestionTextEl.textContent = questions[index].question;
    // remove any previous answers in the ul
    quizQuestionListEl.innerHTML = "";
    // iterate through answers
    for (var i = 0; i < questions[index].answers.length; i++){
        // create button
        var answerListButtonEl = document.createElement("button");
        answerListButtonEl.className = "question-answer-btn";
        // change button text to answer value
        answerListButtonEl.textContent = questions[index].answers[i];
        answerListButtonEl.setAttribute("data-answer", questions[index].answers[i]);
        answerListButtonEl.setAttribute("data-question-number", index);
        answerListButtonEl.setAttribute("type", "button");
        // create list item 
        var answerListEl = document.createElement("li");
        answerListEl.className = "question-answer";
        answerListEl.setAttribute("data-question-number", index);
        // append button to li
        answerListEl.appendChild(answerListButtonEl);
        // append li to ul
        quizQuestionListEl.appendChild(answerListEl);
    }
}

// function to handle when user clicks one of the quiz answers
var questionAnswerHandler = function(event){
    // figure out if an answer button was clicked
    var answerSelected = event.target.closest(".question-answer-btn");
    var selectedAnswerEl = event.target;
    // if an answer button was clicked
    if (answerSelected){
        // determine which answer was chosen
        var selectedAnswerValue = selectedAnswerEl.getAttribute("data-answer");
        // retrieve the question number
        var questionNumber = selectedAnswerEl.getAttribute("data-question-number");
        // determine if the answer is correct
        if (selectedAnswerValue === questions[questionNumber].correct){
            // if correct, alert correct
            correctAlertEl.textContent = "correct"; 
        } else {
            // if wrong, alert wrong
            correctAlertEl.textContent = "wrong";
            // decrease time
            timeLeft -= 10;
        }
    }
    // increment question counter
    currentQuestion++;
    // load the next question if there are still quesitons
    if (currentQuestion < questions.length){
        updateQuizQuestion(currentQuestion);
    } 
    else if (currentQuestion == questions.length){
        // if there are no more questions, end the game
        endGame();
    }    
}

var endGame = function(){
    // delete questions
    quizQuestionListEl.innerHTML = "";
    quizQuestionTextEl.textContent = "The game is over.";
    // create li to display score
    var scoreDisplay = document.createElement("li");
    scoreDisplay.textContent = "Your score is " + timeLeft;
    quizQuestionListEl.appendChild(scoreDisplay);
    // create li to prompt user to save name
    var nameListEl = document.createElement("li");
    // create input for name
    var nameInputEl = document.createElement("input");
    nameInputEl.setAttribute("type", "text");
    nameInputEl.setAttribute("name", "player-name");
    nameInputEl.setAttribute("placeholder", "Your name");
    nameInputEl.setAttribute("id", "save-score-name");
    // create form for name input
    var nameInputFormEl = document.createElement("form");
    // append name input to list item
    nameListEl.appendChild(nameInputEl);
    // append li to form
    nameInputFormEl.appendChild(nameInputEl);
    // create submit button for saving the score
    var scoreSubmitBtnEl = document.createElement("button");
    scoreSubmitBtnEl.setAttribute("type", "submit");
    scoreSubmitBtnEl.setAttribute("data-button-type", "save-score");
    scoreSubmitBtnEl.textContent = "Save score";
    // create list item for score button
    var scoreListItemEl = document.createElement("li");
    // append button to li
    scoreListItemEl.appendChild(scoreSubmitBtnEl);
    // append li to form
    nameInputFormEl.appendChild(scoreListItemEl);
    // append form to list
    quizQuestionListEl.appendChild(nameInputFormEl);
}

// function to save name and score in local storage
var saveScore = function(event){
    // get name entered on 
    var name = document.querySelector("#save-score-name").value;
    //console.log(name);
    // if no name is entered
    if (!name){
        // stop form submission and ask user to try again
        event.preventDefault();
        alert("Please enter a name");
    } 
    // otherwise, save name and score
    else {
        localStorage.setItem("name-last", name);
        localStorage.setItem("score-last", timeLeft);
    }
    // check if current score is higher than high score
    var scoreHigh = localStorage.getItem("score-high");
    if (scoreHigh < timeLeft){
        localStorage.setItem("name-high", name);
        localStorage.setItem("score-high", timeLeft);
    }
}

var fillScores = function(){
    // get name and score from localStorage
    var nameLast = localStorage.getItem("name-last");
    var scoreLast = localStorage.getItem("score-last");
    // if the name and score are not null
    if (nameLast && scoreLast){
        lastScoreDisplayEl.textContent = "Last score: " + scoreLast + " by " + nameLast;
    }
    // get high score and name from localStorage
    var nameHigh = localStorage.getItem("name-high");
    var scoreHigh = localStorage.getItem("score-high");
    if (nameHigh && scoreHigh){
        highScoreDisplayEl.textContent = "High score: " + scoreHigh + " by " + nameHigh;
    }
}

// add click event listener to start button 
startButtonEl.addEventListener("click", startQuiz);

// add click event listener to ul
quizQuestionListEl.addEventListener("click", questionAnswerHandler);

// add submit event listener to ul
quizQuestionListEl.addEventListener("submit", saveScore);

fillScores();