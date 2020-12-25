var gamePattern = [];
var userInput = [];
var expectedUserInputPosition = 0;
var buttonColours = new Array("red", "blue", "green", "yellow");

// Start the game
$("html").on("keypress", function() {
  startGame();
});

// Click on each one of the colours
$(".red").on("click", function(event) {
  onUserClick("red");
});

// Click on each one of the colours
$(".blue").on("click", function(event) {
  onUserClick("blue");
});

// Click on each one of the colours
$(".yellow").on("click", function(event) {
  onUserClick("yellow");
});

// Click on each one of the colours
$(".green").on("click", function(event) {
  onUserClick("green");
});

function onUserClick(color) {
  showChosenColour(color);
  userInput.push(color);
  console.log("The user has input " + userInput);
  // Is the user allowed to continue?
  if (!userInputRightValue(color)) {
    showGameOver();
    setTimeout(function() {
      $("#level-title").removeClass("game-over");
      $("#level-title").text("Press A Key to Start");
    }, 5000);
  } else {
    expectedUserInputPosition += 1;
    console.log("The user has entered the right pattern. Increasing the expected position " + expectedUserInputPosition);
    console.log("The game pattern is " + gamePattern.length);
    // Check if user has finished the game
    if (userInput.length === gamePattern.length) {
      console.log("The user has entered all the patterns. Continue with the next pattern");
      expectedUserInputPosition = 0;
      setTimeout(function() {
        continueGame();
      }, 1000);
    }
  }
};

// Reset all the values and start the game
function startGame() {
  gamePattern = [];
  expectedUserInputPosition = 0;
  userInputPattern = [];
  continueGame();
}

function shouldCheckResult() {
  return userInput.length === gamePattern.length
}

// continue the game from where it stopped
function continueGame() {
  var randomNumber = nextSequence();
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  continueSequence(0);
}

// Got the next random sequence
function nextSequence() {
  return Math.floor(Math.random() * 4);
}

// Show the user a sequence of chosen colours (Starting from position 0)
function continueSequence(currentPosition = 0) {
  console.log(gamePattern[currentPosition]);
  showChosenColour(gamePattern[currentPosition]);
  var nextPosition = currentPosition + 1;
  // if there are still sequence that needs to be show, show them
  if (nextPosition < gamePattern.length) {
    setTimeout(function () {
        continueSequence(nextPosition);
      }, 1000);
  } else {
    // else wait for the user input
    userInput = [];
  }
}

// Show a choosen colour to the user and play the audio of that colour
function showChosenColour(chosenColour) {
  console.log("Showing the colour " + chosenColour);
  $("#"+chosenColour).addClass("pressed");
  setTimeout(function() {
    $("#"+chosenColour).removeClass("pressed");
  }, 100)

  var audio = new Audio('sounds/' + chosenColour + '.mp3');
  audio.play();
}

function showGameOver() {
  $("#level-title").addClass("game-over");
  $("#level-title").text("Game Over");
}

// Check if the user has clicked the right button
function userInputRightValue(userInputColor) {
  console.log("Expected user input position " + expectedUserInputPosition);
  console.log("User input: " + userInputColor);
  console.log("Game pattern: " + gamePattern);

  // Safe guard
  if (expectedUserInputPosition >= gamePattern.length) {
    console.log("Error: The expected user input position is higher or equal than the game pattern length")
    return false;
  }

  if (userInputColor != gamePattern[expectedUserInputPosition]) {
      console.log("The elements are not the same " + userInputColor + " != " + gamePattern[expectedUserInputPosition]);
      return false;
    }

    console.log("The user has entered the right pattern")
    return true;
  }
