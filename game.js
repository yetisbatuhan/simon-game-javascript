var buttonColours = ["red", "blue", "green", "yellow"];
var levelCount = 0;
var gameMove = [];
var userClickedPattern = [];

var level = $(document).on('keypress', function (e) {
    if (e.which == 97 && levelCount === 0) {
        levelCount++;
        gameMove = [];
        $("body").removeClass("game-over");
        
        $("h1").text("level " + levelCount);
        setTimeout(move, 500);
    }
});

function nextSequence() {
    return Math.floor(Math.random() * 4);
}

function move() {
    var randonChosenColour = buttonColours[nextSequence()];
    gameMove.push(randonChosenColour);
    var id = gameMove[gameMove.length - 1];

    $('.' + id).fadeOut(100).fadeIn(100);
    var audioid = "sounds/" + id + ".mp3";
    var audio = new Audio(audioid);
    audio.play();

    console.log(gameMove);
}

userClickedPattern = [];
$(".btn").click(function () {
    if (levelCount !== 0) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        var audioIDClick = "sounds/" + userChosenColour + ".mp3";
        var audio2 = new Audio(audioIDClick);
        audio2.play();

        animatePress(userChosenColour);
        
        for(i=0;i<userClickedPattern.length;i++){
        if(gameMove[i] != userClickedPattern[i] ){
            against();
        }
        
        
        if(gameMove.length == userClickedPattern.length){
            
            against();

    }}
    }
});

function animatePress(currentColour) {
    if(currentColour == "game-over" ){
        $("body").addClass("game-over");
    }
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100);
    
}

function against() {
    for (var i = 0; i < gameMove.length; i++) {
        if (gameMove[i] != userClickedPattern[i]) {
            $("#level-title").text("Game Over, Press A Key to Restart");            levelCount = 0;
            userClickedPattern = [];
            var audioGameOver = "sounds/wrong.mp3";
            var audioGameOver = new Audio(audioGameOver);
            audioGameOver.play();
            animatePress("game-over");
            return;
        }
    }

   
    if (gameMove.length == userClickedPattern.length) {
        $("#level-title").text("level "+(i+1));
        userClickedPattern = [];
        levelGameMove();
    }
}


function levelGameMove() {
    
    return setTimeout(move, 1000);
    

}
