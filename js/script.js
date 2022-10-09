// Global variables and page elements

var scoreLink = document.querySelector("#scoreLink");
var welcomeEl = document.querySelector("#welcomeMessageEl");
var quizQuestionEl = document.querySelector("#quizQuestionEl");
var quizAnswersEl = document.querySelector("#quizAnswersEl");
var systemMessage = document.querySelector("#system-message");
var ticker = document.querySelector("#ticker");
var getStartedBtn = document.querySelector("#getStarted");
var finalScore = document.querySelector("#finalScore");
var showScoreEl = document.querySelector("#showScoreEl");
var highScoresEl = document.querySelector("#highScoresEl");
var userInitials = document.querySelector("#userInitials");
var scoreList = document.querySelector("#scoreList");

var currentRightAnswer = 0;
var quizQuestionCurrent = 1;
var quizTimer = 75;
var quizScore = 0;
var userScore = 0;
var quizStarted = false;
var gameOver = false;

//localStorage.clear(); // uncomment for testing only


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

function showHighScores () {

}

function displayGameOver() {
    quizQuestionEl.setAttribute("style", "display:none");
    welcomeMessageEl.innerHTML = "All done!";
    welcomeMessageEl.setAttribute("style", "display:block");
    showScoreEl.setAttribute("style", "display:block");
    showScoreEl.children[0].innerHTML = "Your final score is " + userScore;
}

// Display the Question and Answers
function showQandA(qnum) {
    
    // If old question is up, remove it
    if(quizQuestionEl) {
        systemMessage.innerHTML = "";
        var answerList = quizAnswersEl.querySelectorAll(':scope > li');
        // Loop through the old list items and remove them
        answerList.forEach(listItem => listItem.remove());
    }

    var currentQuestion = "quizQuestion" + qnum;

    if (Number(qnum) > numOfQuestions) {

        // There are no more questions. End the game.
        gameOver = true;
        displayGameOver();

    } else {

        // There's another question. Show it to the user.

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
        // console.log("The right answer is " + currentRightAnswer); // uncomment in test-mode only
    }
}


function setTimer(){
    var timerInterval = setInterval(function() {
        quizTimer--;
        ticker.innerHTML = quizTimer;

        if(quizTimer === 0) {
             clearInterval(timerInterval);
        }
    }, 1000);

    gameOver = true; // Timer has run out, game is over.
}


quizAnswersEl.addEventListener("click", function(event) {
    
    event.stopPropagation();
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
        
        // Check the user's answer and show the next question after a timeout

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


function addToHighScores(userInits, score) {

    var highScoresOld = []; // From localStorage
    var highScoresNew = {}; // Sorted list to add to localStorage
    var addNewUserToList = false; // Check if user made the high scores list
    var lowestOldScore = 100; // Score to replace if new user makes the list
    var oldUserToBump = 100; // Track which scorer gets dropped from the list

    var jsonScores = JSON.parse(localStorage.getItem('jsonScores'));

    if((jsonScores)) {

        // Check for the list of 5 high scores in localStorage and save them to an array  
        if(jsonScores.listRank1) { highScoresOld[0] = jsonScores.listRank1; }
        if(jsonScores.listRank2) { highScoresOld[1] = jsonScores.listRank2; }
        if(jsonScores.listRank3) { highScoresOld[2] = jsonScores.listRank3; }
        if(jsonScores.listRank4) { highScoresOld[3] = jsonScores.listRank4; }
        if(jsonScores.listRank5) { highScoresOld[4] = jsonScores.listRank5; }
       

        // Loop through the array and compare scores
        for (var i=0; i < highScoresOld.length; i++) {
            
            var scoreCheck = highScoresOld[i];
            var oldScore = scoreCheck.charAt(scoreCheck.length - 1);
            
            if (oldScore <= score) { 
                addNewUserToList = true; // New score outranks this past score
                if (highScoresOld.length > 4 && oldScore <= lowestOldScore) {
                    lowestOldScore = oldScore;
                    oldUserToBump = i;
                }
            } else if (highScoresOld.length < 5) {
                addNewUserToList = true; // User made list by default
            }
        }

        if(addNewUserToList) {
            var newEntry = userInits + " - " + score;
            highScoresNew['listRank1'] = newEntry;

            // Load listRanks 2-5, omitting oldUserToBump if necessary
            if(!(oldUserToBump > 5)) { highScoresOld.splice(oldUserToBump, 1); }

            if(highScoresOld[0]) { highScoresNew['listRank2'] = highScoresOld[0]; }
            if(highScoresOld[1]) { highScoresNew['listRank3'] = highScoresOld[1]; }
            if(highScoresOld[2]) { highScoresNew['listRank4'] = highScoresOld[2]; }
            if(highScoresOld[3]) { highScoresNew['listRank5'] = highScoresOld[3]; }

        } else {
            // Load listRanks 1-5
            if(highScoresOld[0]) { highScoresNew['listRank1'] = highScoresOld[0]; }
            if(highScoresOld[1]) { highScoresNew['listRank2'] = highScoresOld[1]; }
            if(highScoresOld[2]) { highScoresNew['listRank3'] = highScoresOld[2]; }
            if(highScoresOld[3]) { highScoresNew['listRank4'] = highScoresOld[3]; }
            if(highScoresOld[4]) { highScoresNew['listRank5'] = highScoresOld[4]; }
        }

        // Display Highscores List (new score added to previous list)
        welcomeMessageEl.innerHTML = "Highscores";
        showScoreEl.setAttribute("style", "display:none");
        highScoresEl.setAttribute("style", "display:block");

        var newHighScore = document.createElement("li");
        newHighScore.textContent = userInits + " - " + score;
        scoreList.appendChild(newHighScore);

        for (var i=0; i < highScoresOld.length; i++) {
            var storedHighScore = document.createElement("li");
            storedHighScore.textContent = highScoresOld[i];
            scoreList.appendChild(storedHighScore);
        }

        // Build the new JSON string and save new list to localStorage
        localStorage.setItem('jsonScores', JSON.stringify(highScoresNew));

    } else {
        // Create the jsonScores object and set current user to listRank1
        console.log("On the first-run path.");
        var newEntry = userInits + " - " + score;
        var newList = { "listRank1": newEntry }
        localStorage.setItem('jsonScores', JSON.stringify(newList));

        // Display Highscores List (single user)
        welcomeMessageEl.innerHTML = "Highscores";
        showScoreEl.setAttribute("style", "display:none");
        highScoresEl.setAttribute("style", "display:block");

        var newHighScore = document.createElement("li");
        newHighScore.textContent = userInits + " - " + score;
        scoreList.appendChild(newHighScore);
    }
}


// Allow user to track high score
showScoreEl.addEventListener("click", function(event) {
    // if user entered initials, add them to high score list
    event.stopPropagation();
    var element = event.target;
    if(element.matches('input[type="button"]')) {
        if(userInitials.value){
            var userInits = userInitials.value;
            var score = userScore;
            addToHighScores(userInits, score); 
        } 
    }
    
});


// Show list of previous high scores
highScoresEl.addEventListener("click", function(event) {

    event.stopPropagation();
    //which button was it?
    var element = event.target;

    //if go back
    if(element.value === "Go Back") {
        console.log('go back');
    }

    //if clear highscores
    if(element.value === "Clear Highscores") {
        console.log('clear highscores');
    }

});







