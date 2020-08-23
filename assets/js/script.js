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

// function to start quiz on button click
var startQuiz = function(event){
    // update question text 
    updateQuizQuestion(0);

}

// function to add question text and question answer options to html
var updateQuizQuestion = function(index){
    // update question text
    quizQuestionTextEl.textContent = questions[index].question;
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
            correctAlertEl.textContent = "wrong";
        }
    }
    
}

// add click event listener to start button 
startButtonEl.addEventListener("click", startQuiz);

// add click event listener to ul
quizQuestionListEl.addEventListener("click", questionAnswerHandler);