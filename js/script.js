// Global variables
var quizTimer = 75;
var quizScore = 0;
var quizQuestionEl = document.querySelector("#quizQuestionEl");
var quizAnswersEl = document.querySelector("#quizAnswersEl");
var systemMessage = document.querySelector("#system-message");
const quizHighScores = [];


// Display the Question and Answers
function showQandA(qnum) {
    var currentQuestion = "quizQuestion" + qnum;
    quizQuestionEl.innerHTML = eval(currentQuestion)[0];
    
    for(var i=1; i < 5; i++) {
        var quizAnswer = document.createElement("li");
        quizAnswer.textContent = eval(currentQuestion)[i];
        quizAnswersEl.appendChild(quizAnswer);
    }
}

showQandA(2);
systemMessage.innerHTML = "Correct";




