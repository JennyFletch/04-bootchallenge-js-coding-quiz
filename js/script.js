// Global variables
var quizTimer = 75;
var quizScore = 0;
var quizQuestionEl = document.querySelector("#quizQuestionEl");
var quizAnswersEl = document.querySelector("#quizAnswersEl");
var currentRightAnswer = 0;
var systemMessage = document.querySelector("#system-message");
const quizHighScores = [];


// Get a random order for the answers
function getAnswerOrder() {
    var numArray = [];
    while(numArray.length < 4) {
        var mynum = (Math.floor(Math.random() * 4)) + 1; 
        if(!numArray.includes(mynum)) {
            numArray.push(mynum);
        }
    }
    return(numArray);
}


// Display the Question and Answers
function showQandA(qnum) {
    var currentQuestion = "quizQuestion" + qnum;
    quizQuestionEl.innerHTML = eval(currentQuestion)[0];

    // Get a random order for the answers
    var ansOrder = getAnswerOrder();
    
    //use ansOrder instead of for loop
    for (var i = 0; i < 4; i++) {
        var answerNumber = ansOrder[i];
        if(answerNumber === 1) {
            currentRightAnswer = i + 1;
        }
        var quizAnswer = document.createElement("li");
        var ansOrderNum = ansOrder[i];
        quizAnswer.textContent = eval(currentQuestion)[ansOrderNum];
        quizAnswersEl.appendChild(quizAnswer);
    }
    console.log("The right answer is " + currentRightAnswer);
}


showQandA(2);
systemMessage.innerHTML = "Correct";




