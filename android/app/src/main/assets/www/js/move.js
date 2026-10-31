function Move(){};

var score = 0;
var hiscore = localStorage.getItem("shighscore");
var mscore = 1;
var counter = 0;
var record = 0;
var delayTime = 120;
var enemyCounter = 7;

Move.player = function($direction){
	var _playerCell = document.getElementById(Map.objects[0].where); 
	var _idNumber  = parseInt(_playerCell.id.slice(4));
	var nomove = new Boolean(1);
	
	if($direction == "up" && _idNumber > 8){
		var _nextCell = Move.elementNumber(_idNumber - 9);
	
		if(Map.dusmanVarMi(_nextCell)){
			Map.deleteObject(_nextCell.id);
			Sound.play("eat");
			nomove = 0;
			score = score + (100*mscore);
			mscore++;
		}
		else{
			mscore=1;
		}
		
		Move.change(_playerCell, _nextCell);
		
		if (!Map.engelVarMi(_nextCell)){
			if(nomove){
				Move.enemy();
				Sound.play("move");
			}
			counter++;
		}
	}
	
	else if($direction == "down" && _idNumber < 45){
		var _nextCell = Move.elementNumber(_idNumber + 9);
		
		if(Map.dusmanVarMi(_nextCell)){
			Map.deleteObject(_nextCell.id);
			Sound.play("eat");
			nomove = 0;
			score = score + (100*mscore);
			mscore++;
		}
		else{
			mscore=1;
		}
		
		Move.change(_playerCell, _nextCell);
		
		if (!Map.engelVarMi(_nextCell)){
			if(nomove){
				Move.enemy();
				Sound.play("move");
			}
			counter++;
		}
	}
	
	else if($direction == "right" && _idNumber%9 - 8 != 0){
		var _nextCell = Move.elementNumber(_idNumber + 1);
		
		if(Map.dusmanVarMi(_nextCell)){
			Map.deleteObject(_nextCell.id);
			Sound.play("eat");
			nomove = 0;
			score = score + (100*mscore);
			mscore++;
		}
		else{
			mscore=1;
		}
		
		Move.change(_playerCell, _nextCell);
		
		if (!Map.engelVarMi(_nextCell)){
			if(nomove){
				Move.enemy();
				Sound.play("move");
			}
			counter++;
		}
	}
	
	else if($direction == "left" && _idNumber%9 != 0){
		var _nextCell = Move.elementNumber(_idNumber - 1);
		
		if(Map.dusmanVarMi(_nextCell)){
			Map.deleteObject(_nextCell.id);
			Sound.play("eat");
			nomove = 0;
			score = score + (100*mscore);
			mscore++;
		}
		else{
			mscore=1;
		}
		
		Move.change(_playerCell, _nextCell);
		
		if (!Map.engelVarMi(_nextCell)){
			if(nomove){
				Move.enemy();
				Sound.play("move");
			}
			counter++;
		}
	}
	if(counter == enemyCounter){
		counter = 0;
		
		if(nomove)
			setTimeout(function() {
				Map.add("dusman");
				enemyCounter = parseInt(Math.random()*4)+4;
			}, delayTime);
	}
	//score
	document.getElementById("score").innerHTML = score;
	
	if(score > hiscore || hiscore == null){
		document.getElementById("hiscore").innerHTML = score;
		localStorage.setItem("shighscore", score);
		record = 1;
	}
	
	nomove = 1;
};

Move.enemy = function(){
	var moves = []; //[0, 0, 1,-1,9,-9];
	
	setTimeout(function() {
		for(var i= 0 ; i< Map.objects.length ; i++){
			if ( Map.objects[i].type == "dusman"){
				var _enemyCell = document.getElementById(Map.objects[i].where); 
				var _idNumber  = parseInt(_enemyCell.id.slice(4));
				
				//sol üst köşedeyse
				if(_enemyCell.id === "cell0"){
					if(Map.karakterVarMi(Move.elementNumber(_idNumber + 1))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber + 1));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber + 9))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber + 9));
						Main.gameOver();  //GAME OVER
					}
					else{
						moves = [0, 0, 1, 9];
						var _nextCell = Move.elementNumber(_idNumber + moves[parseInt(moves.length*Math.random())]);
						
						if(!Map.dusmanVarMi(_nextCell))
							Move.change(_enemyCell, _nextCell);
					}
				}
				
				//sağ üst köşedeyse
				else if(_enemyCell.id === "cell8"){
					if(Map.karakterVarMi(Move.elementNumber(_idNumber - 1))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber - 1));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber + 9))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber + 9));
						Main.gameOver();  //GAME OVER
					}
					else{
						moves = [0, 0, -1, 9];
						var _nextCell = Move.elementNumber(_idNumber + moves[parseInt(moves.length*Math.random())]);
						
						if(!Map.dusmanVarMi(_nextCell))
							Move.change(_enemyCell, _nextCell);
					}
				}
				
				//sol alt köşedeyse
				else if(_enemyCell.id === "cell45"){
					if(Map.karakterVarMi(Move.elementNumber(_idNumber + 1))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber + 1));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber - 9))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber - 9));
						Main.gameOver();  //GAME OVER
					}
					else{
						moves = [0, 0, 1, -9];
						var _nextCell = Move.elementNumber(_idNumber + moves[parseInt(moves.length*Math.random())]);
						
						if(!Map.dusmanVarMi(_nextCell))
							Move.change(_enemyCell, _nextCell);
					}
				}
				
				//sağ alt köşedeyse
				else if(_enemyCell.id === "cell53"){
					if(Map.karakterVarMi(Move.elementNumber(_idNumber - 1))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber - 1));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber - 9))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber - 9));
						Main.gameOver();  //GAME OVER
					}
					else{
						moves = [0, 0, -1, -9];
						var _nextCell = Move.elementNumber(_idNumber + moves[parseInt(moves.length*Math.random())]);
						
						if(!Map.dusmanVarMi(_nextCell))
							Move.change(_enemyCell, _nextCell);
					}
				}
				
				//üst kenardaysa 
				else if(_idNumber > 0 && _idNumber < 8){
					if(Map.karakterVarMi(Move.elementNumber(_idNumber + 1))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber + 1));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber - 1))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber - 1));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber + 9))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber + 9));
						Main.gameOver();  //GAME OVER
					}
					else{
						moves = [0, 0, 1, -1, 9];
						var _nextCell = Move.elementNumber(_idNumber + moves[parseInt(moves.length*Math.random())]);
						
						if(!Map.dusmanVarMi(_nextCell))
							Move.change(_enemyCell, _nextCell);
					}
				}
				
				//alt kenardaysa 
				else if(_idNumber > 45 && _idNumber < 53){
					if(Map.karakterVarMi(Move.elementNumber(_idNumber + 1))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber + 1));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber - 1))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber - 1));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber - 9))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber - 9));
						Main.gameOver();  //GAME OVER
					}
					else{
						moves = [0, 0, 1, -1, -9];
						var _nextCell = Move.elementNumber(_idNumber + moves[parseInt(moves.length*Math.random())]);
						
						if(!Map.dusmanVarMi(_nextCell))
							Move.change(_enemyCell, _nextCell);
					}
				}
				
				//sol kenardaysa 
				else if(_idNumber%9 == 0 && _enemyCell.id != "cell0" && _enemyCell.id != "cell45"){
					if(Map.karakterVarMi(Move.elementNumber(_idNumber + 1))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber + 1));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber + 9))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber + 9));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber - 9))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber - 9));
						Main.gameOver();  //GAME OVER
					}
					else{
						moves = [0, 0, 1, -9, 9];
						var _nextCell = Move.elementNumber(_idNumber + moves[parseInt(moves.length*Math.random())]);
						
						if(!Map.dusmanVarMi(_nextCell))
							Move.change(_enemyCell, _nextCell);
					}
				}
				
				//sağ kenardaysa 
				else if(_idNumber%9 - 8 == 0 && _enemyCell.id != "cell8" && _enemyCell.id != "cell53"){
					if(Map.karakterVarMi(Move.elementNumber(_idNumber - 1))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber - 1));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber + 9))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber + 9));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber - 9))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber - 9));
						Main.gameOver();  //GAME OVER
					}
					else{
						moves = [0, 0, -1, -9, 9];
						var _nextCell = Move.elementNumber(_idNumber + moves[parseInt(moves.length*Math.random())]);
						
						if(!Map.dusmanVarMi(_nextCell))
							Move.change(_enemyCell, _nextCell);
					}
				}
				
				else{
					if(Map.karakterVarMi(Move.elementNumber(_idNumber + 1))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber + 1));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber - 1))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber - 1));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber + 9))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber + 9));
						Main.gameOver();  //GAME OVER
					}
					else if(Map.karakterVarMi(Move.elementNumber(_idNumber - 9))){
						Move.change(_enemyCell, Move.elementNumber(_idNumber - 9));
						Main.gameOver();  //GAME OVER
					}
					else{
						moves = [0, 0, 1, -1, -9, 9];
						var _nextCell = Move.elementNumber(_idNumber + moves[parseInt(moves.length*Math.random())]);
						
						if(!Map.dusmanVarMi(_nextCell))
							Move.change(_enemyCell, _nextCell);;
					}
				}
			}
		}
	}, delayTime);
};

Move.change = function($nereden, $nereye){
	if(!Map.engelVarMi($nereye)){
		$nereye.appendChild($nereden.childNodes[0]);
		Map.whereObject($nereden.id).where = $nereye.id;
	}
};

Move.elementNumber = function($number){
	return document.getElementById("cell" + $number);
};
