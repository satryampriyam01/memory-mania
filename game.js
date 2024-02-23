var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=false;


function playSound(name)
{
    var buttonSound= new Audio("./sounds/"+name+".mp3");
    buttonSound.play();

}

function startOver()
{
    level=0;
    gamePattern=[];
    start=false;
    $("h1").text("Restart Press key");


}

function checkAnswer(currentlevel)
{
    if(gamePattern[currentlevel]==userClickedPattern[currentlevel])
    {
        
        console.log("right");
       if(userClickedPattern.length===gamePattern.length)
       {
         setTimeout(function(){
            nextSequence();
         }, 1000);
       }
    }
    else
    {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () { 
            $("body").removeClass("game-over");
        }, 100)

        $("h1").text("Game over Please restart"+ "You score " +level);

        setTimeout(function(){
            startOver();
         }, 3000);
        
    }
}



function nextSequence()
{
    // it refreshes when new level starts 
    userClickedPattern=[];
    level+=1;

    $("h1").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];    
    gamePattern.push(randomChosenColour);

    $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor){

$('#'+currentColor).addClass("pressed").delay(1000);

setTimeout(function () { 
    $('#'+currentColor).removeClass('pressed');
}, 100)

}


$('.btn').click(function(){
   var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    //it will start checking one by one as user progress filling the blocks
    checkAnswer(userClickedPattern.length-1);
    
    
})


$(document).keypress(function(event){

    if(!start){
    $("h1").text("Lets Begin "+level);
    level=0;
    nextSequence();
    start=true;
    }

})