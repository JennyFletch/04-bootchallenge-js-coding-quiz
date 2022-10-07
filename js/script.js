// Global variables
var quizTimer = 75;
var quizScore = 0;
var welcomeEl = document.querySelector("#welcomeMessageEl");
var quizQuestionEl = document.querySelector("#quizQuestionEl");
var quizAnswersEl = document.querySelector("#quizAnswersEl");
var currentRightAnswer = 0;
var quizQuestionCurrent = 1;
var systemMessage = document.querySelector("#system-message");
var ticker = document.querySelector("#ticker");
var getStartedBtn = document.querySelector("#getStarted");
var userScore = 0;
const quizHighScores = [];
var quizStarted = false;


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
    
    // If old question is up, remove it
    if(quizQuestionEl) {
        systemMessage.innerHTML = "";
        var answerList = quizAnswersEl.querySelectorAll(':scope > li');
        console.log(answerList);
        // Loop through the old list items and remove them
        answerList.forEach(listItem => listItem.remove());
    }

    var currentQuestion = "quizQuestion" + qnum;
    quizQuestionEl.innerHTML = eval(currentQuestion)[0];

    // Get a random order for the answers
    var ansOrder = getAnswerOrder();
    
    // Display answers in random order, keeping track of correct one
    for (var i = 0; i < 4; i++) {
        var answerNumber = ansOrder[i];
        if(answerNumber === 1) {
            currentRightAnswer = i + 1;
        }
        var quizAnswer = document.createElement("li");
        var ansOrderNum = ansOrder[i];
        quizAnswer.textContent = (Number(i) + 1) + ". " + eval(currentQuestion)[ansOrderNum];
        quizAnswer.setAttribute("data-qNumber", (i+1)); 
        quizAnswersEl.appendChild(quizAnswer);
    }
    console.log("The right answer is " + currentRightAnswer);
}


function setTimer(){
    var timerInterval = setInterval(function() {
        quizTimer--;
        ticker.innerHTML = quizTimer;

        if(quizTimer === 0) {
             clearInterval(timerInterval);
        }
    }, 1000);
}


quizAnswersEl.addEventListener("click", function(event) {
    
    //event.stopPropagation();
    var element = event.target;

    if(element.matches("span") && !quizStarted) {

        // Set up and start the quiz

        welcomeEl.setAttribute("style", "display:none"); // Hide the welcome message
        element.closest("li").remove(); // Remove the button list item
        quizQuestionEl.setAttribute("style", "display:block"); // Show the Question element
        showQandA(quizQuestionCurrent); // Display the first question
        setTimer();   // Start the timer
        quizStarted = true;

    } else {
        
        var chosenAnswer = event.target.getAttribute('data-qNumber'); // Check with answer the user picked

        if(Number(chosenAnswer) === Number(currentRightAnswer)){
            systemMessage.innerHTML = "<hr />Correct!";
            userScore++;
        } else {
            systemMessage.innerHTML = "<hr />Wrong!";
            quizTimer -= 10; // Take 10 seconds off the timer
        }
        quizQuestionCurrent++;
        setTimeout(() => { showQandA(quizQuestionCurrent); }, "1000"); // Ask the next question
    }
});













