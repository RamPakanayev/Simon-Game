var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

keyPress();

//once a button have been clicked,
// we saving it's id and push it to array.
// log's the id, play's sound, ,animate's the press and checking the answer.
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//checking the answer
// and if its right log's success and calling the next sequence.
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

//At the next seq,
// we  lvl++, resetting the userClickedPattern, showing the level text,
//randomizing number 0-3, associate with a color and push it.
//then making the random color to fadeIn&out and play sound.
function nextSequence() {
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //showGamePattern();
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}
// function showGamePattern() {
//   for (i = 0; i < gamePattern.length; i++) {
//     setTimeout(() => {
//       $("#" + gamePattern[i])
//         .fadeIn(100)
//         .fadeOut(100)
//         .fadeIn(100);
//       playSound(randomChosenColor);
//     }, 1000);
//   }
// }

//any keypress to start the game
function keyPress() {
  $(document).keypress(function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
}

function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
  keyPress();
}
//play sound.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  return audio.play();
}
//animatePress
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
