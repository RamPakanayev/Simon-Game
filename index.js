var pattern = [];
var usedPattern = [];
var level = 0;
var gameCheck = false;
started = false;
keyPress();

function keyPress() {
  $(document).keypress(function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
}
function addPattern() {
  var pValue = randNum(1, 4);

  // add pattern to array
  pattern.push(pValue);
}

function playPattern() {
  // takes pattern array
  for (var i = 0; i < pattern.length; i++) {
    var delayTime = i * 600;

    setTimeout(flashSquare, delayTime);
  }
}

function flashSquare() {
  var item = pattern.pop();
  gameCheck = true;

  // pops and removes first item of array
  $("#" + item)
    .animate(
      {
        opacity: 0.2,
      },
      200
    )
    .animate(
      {
        opacity: 1,
      },
      100
    );
  //animation takes 300 ms

  usedPattern.push(item);
  // take the item  removed from pattern and add it to used pattern

  if (pattern.length <= 0) {
    // add the click event once cpu is finished showing the pattern
    createClicks();
  }
} // end flashSquare()

function createClicks() {
  $(".btn").click(function () {
    // check if clicked element is the right square
    var item = usedPattern.shift();

    var squareId = $(this).attr("id");

    $(this).animate({ opacity: 0.2 }, 200).animate({ opacity: 1 }, 100);

    // if yes remove from used pattern and add to pattern
    if (item == squareId) {
      //adds item back to pattern array
      pattern.push(item);

      if (usedPattern.length <= 0) {
        level++;
        $("#level-title").text("Level " + level);

        removeClicks();
        //user is finished clicking through the pattern successfully
        // add new square to pattern
        addPattern();

        // playPattern();
        setTimeout(playPattern, 800);
      }
    } else {
      // else game over
      gameCheck = false;
      $("#level-title").text("Game Over, Press Any Key to Restart").css({
        fontSize: 58,
        marginBottom: 15,
        paddingTop: 15,
      });
      // $("p").html("Click anywhere on circle to Restart");
      // clear out pattern arrays
      pattern = [];
      usedPattern = [];
    }
  }); // end .square click
} // end create click

function removeClicks() {
  //removes all events from element
  $(".btn").unbind();
}

function startGame() {
  removeClicks();
  resetGame();
  addPattern();
  addPattern();
  playPattern();
}

function resetGame() {
  level = 0;

  $("#level-title").html("Level: " + level);
  $("h1").html("Simon").css({
    fontSize: 82,
    marginBottom: 0,
    paddingTop: 0,
  });
  $("p").html("Click anywhere on circle to Start Game");
}

$("#middleCircle").click(function () {
  if (gameCheck === false) {
    startGame();
  }
});

function randNum(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
