console.log('ready.');


// Global variables
var quizTimer = 75;
var quizScore = 0;
var quizQuestionEl = document.querySelector("#quizQuestionEl");
var quizAnswersEl = document.querySelector("#quizAnswersEl");
var systemMessage = document.querySelector("#system-message");
const quizHighScores = [];


// Display the Question and Answers
for(var i=0; i < (numOfQuestions + 1); i++) {
    quizQuestionEl.innerHTML = "How are you?";
    
    var quizAnswer1 = document.createElement("li");
    quizAnswer1.textContent = "I'm fine.";
    quizAnswersEl.appendChild(quizAnswer1);

    systemMessage.innerHTML = "Correct";
}



