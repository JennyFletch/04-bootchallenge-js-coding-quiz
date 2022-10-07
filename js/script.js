// Global variables
var quizTimer = 75;
var quizScore = 0;
var welcomeEl = document.querySelector("#welcomeMessageEl");
var quizQuestionEl = document.querySelector("#quizQuestionEl");
var quizAnswersEl = document.querySelector("#quizAnswersEl");
var currentRightAnswer = 0;
var systemMessage = document.querySelector("#system-message");
var ticker = document.querySelector("#ticker");
var getStartedBtn = document.querySelector("#getStarted");
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
        element.closest("li").setAttribute("style", "display:none"); // Hide the button
        quizQuestionEl.setAttribute("style", "display:block"); // Show the Question element
        showQandA(2); // Display the first question
        setTimer();   // Start the timer
        quizStarted = true;
    } else {
        
        // var chosenAnswer = document.querySelector('#quizQuestionEl :nth-child(' + Number(currentRightAnswer) + ')');
        // var chosenAnswer = document.querySelector('#quizAnswersEl div:nth-child(2)');
        //console.log("system thinks it's " + chosenAnswer);
        //var chosenAnswer = toString(element).charAt(5);
        //var chosenAnswer = index(eval(element));
        var chosenAnswer = event.target.getAttribute('data-qNumber');
       // event.target.getAttribute('data-bar')
        console.log(chosenAnswer);

        if(Number(chosenAnswer) === Number(currentRightAnswer)){
            systemMessage.innerHTML = "<hr />Correct!";
        } else {
            systemMessage.innerHTML = "<hr />Wrong!";
        }
    }
});













