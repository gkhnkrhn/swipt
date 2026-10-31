function Main(){};

var swipe;

var buttons ={
	up: 38,
	down: 40,
	right: 39,
	left: 37,
	w: 87,
	a: 65,
	s: 83,
	d: 68
};

Main.init = function(){	
	Map.cell();
	Map.start();
};

Main.playButton = function(){
	Sound.init();

	document.getElementById("blured").style.display = "none";
	
	handleTouchMove();
	window.onkeydown = Main.keyListener;
	
	
	document.addEventListener('touchstart', handleTouchStart, false);        
	document.addEventListener('touchmove', handleTouchMove, false);
};


//swipe//////////////////////////////////////////////

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            Move.player("left");
        } else {
            Move.player("right");
        }                       
    } else {
        if ( yDiff > 0 ) {
            Move.player("up");
        } else { 
            Move.player("down");
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
/////////////////////////////////////////////////////



Main.keyListener = function(e) {
	//alert(e.keyCode);
	if(e.keyCode == buttons.up || e.keyCode == buttons.w){
		Move.player("up");
	}
	else if(e.keyCode == buttons.down || e.keyCode == buttons.s){
		Move.player("down");
	}
	else if(e.keyCode == buttons.right || e.keyCode == buttons.d){
		Move.player("right");
	}
	else if(e.keyCode == buttons.left || e.keyCode == buttons.a){
		Move.player("left");
	}
};

Main.reset = function(){
	score = 0;
	record = 0;
	
	document.getElementById("score").innerHTML = score;
	
	for(var i= 0 ; i<Map.cellNumber ; i++){
		Map.deleteObject("cell" + i);
	}
	
	Map.start();
	document.getElementById("result-bg").style.display = "none";
	
	window.onkeydown = Main.keyListener;
	document.addEventListener('touchstart', handleTouchStart, false);        
	document.addEventListener('touchmove', handleTouchMove, false);
};

Main.gameOver = function() {
	window.onkeydown = null;
	document.removeEventListener('touchstart', handleTouchStart);      
	document.removeEventListener('touchmove', handleTouchMove);
	
	Sound.play("fail");
	
	Map.deleteObject(Map.objects[0].where);
	
	document.getElementById("fscore").innerHTML = score;
	document.getElementById("fhiscore").innerHTML = (record == 1)? "New record!":"HI: " + hiscore;
	
	setTimeout(function() {
		document.getElementById("result-bg").style.display = "flex";
	}, 100);
};

window.addEventListener('load', Main.init, false);