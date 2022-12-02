var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


// Detect Game Start
$(document).keypress(function(event){
  if(!started) nextSequence();
  started = true;
});

// Game Pattern
function nextSequence(){
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*buttonColors.length);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //animation for a flash
  playSound(randomChosenColor);

  level++;
}

// User Pattern
$(".btn").click(function(){

  var userChosenColor = this.id;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);

  console.log("**************************************");
  console.log(gamePattern);
  console.log(userClickedPattern);
  console.log("**************************************");

  checkAnswer(userClickedPattern);

  if(userClickedPattern.length == gamePattern.length){
    userClickedPattern = [];
  }

});

function checkAnswer(userClickedPattern){

  var game_over = false;

  if(userClickedPattern[userClickedPattern.length-1] != gamePattern[userClickedPattern.length-1]){
    $("h1").text("GAME_OVER!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    game_over = true;
    $("h1").text("Press Any Key to Start");
    startOver();
  }

  if(!game_over && userClickedPattern.length == gamePattern.length) setTimeout(nextSequence, 1000);
}

function startOver(){
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}
