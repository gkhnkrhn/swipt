function Map(){};

Map.objects = [];
Map.cellNumber = 54;

Map.cell = function(){
	var _board = document.getElementById("board");
	
	for(var i= 0 ; i<Map.cellNumber ; i++){
		var _cell = document.createElement("div");
		_cell.setAttribute("class", "cell");
		_cell.setAttribute("id", "cell" + i);
		
		_board.appendChild(_cell);
	}
};

Map.start = function(){
	hiscore = localStorage.getItem("shighscore");
	
	var _playButton = document.getElementById("play-button");
	var _htplay = document.getElementById("htplay");
	if(hiscore==undefined){
		_playButton.style.display = "none";
		_htplay.style.display = "block";
	}
	else{
		_playButton.style.display = "block";
		_htplay.style.display = "none";
	}
	
	document.getElementById("hiscore").innerHTML = (hiscore == null)? 0: hiscore;
	Map.add("karakter");
	Map.add("engel",5);
	Map.add("dusman",3);
};

Map.add = function($type, $adet){
	if ($adet == undefined){$adet = 1}
	
	var i= 0;
	while(i < $adet){
		
		var _itemObject = Map.createObject($type);
		
		var _cell = document.getElementById(_itemObject.where);
		////AAAAAAAA/////////////////////////////////////////////////////////
		var _playerCellIdNumber = parseInt(document.getElementById(Map.objects[0]?.where)?.id?.slice(4));
		var cellIdNumber = _cell.id.slice(4);
		
		if (Map.doluMu(_cell.id) || cellIdNumber == _playerCellIdNumber -1 || cellIdNumber == _playerCellIdNumber+1 || cellIdNumber == _playerCellIdNumber-9 || cellIdNumber == _playerCellIdNumber+9 || cellIdNumber == _playerCellIdNumber-10 || cellIdNumber == _playerCellIdNumber-8 || cellIdNumber == _playerCellIdNumber+8 || cellIdNumber == _playerCellIdNumber+10){
			continue;
		}
		
		var _object = document.createElement("img");
		_object.setAttribute("src", _itemObject.img);
		
		_cell.appendChild(_object);
		Map.objects.push(_itemObject);
		
		i++;
	}
};

Map.doluMu = function($hucre){
	for(var j= 0 ; j< Map.objects.length ; j++){
			if ( Map.objects[j].where == $hucre){
				return true;
			}
		}
	return false;
};

Map.engelVarMi = function ($cell){
	if(Map.whereObject($cell.id) != undefined && Map.whereObject($cell.id).type === "engel"){
		return 1; 
	}
	return 0;
};

Map.karakterVarMi = function ($cell){
	if(Map.whereObject($cell.id) != undefined && Map.whereObject($cell.id).type === "karakter"){
		return 1; 
	}
	return 0;
};

Map.dusmanVarMi = function ($cell){
	if(Map.whereObject($cell.id) != undefined && Map.whereObject($cell.id).type === "dusman"){
		return 1; 
	}
	return 0;
};

Map.createObject = function($type){
	var _itemObject = {};
	
	_itemObject.type = $type;
	_itemObject.where = "cell" + Math.round(53*Math.random());
	
	switch ($type){
		
		case "karakter":
			_itemObject.img = "img/karakter.png";
		break;
		
		case "dusman":
			_itemObject.img = (Math.random()<0.5) ? "img/dusman1.png" : "img/dusman2.png";
			
		break;
		
		case "engel":
			_itemObject.img = (Math.random()<0.5) ? "img/engel1.png" : "img/engel2.png";
		break;
	};
	
	return _itemObject;
};

Map.whereObject = function ($cellID){
	if(Map.doluMu($cellID)){
		for(var j= 0 ; j< Map.objects.length ; j++){
			if ( Map.objects[j].where == $cellID){
				return Map.objects[j];
			
				break;
			}
		}
	}
};

Map.deleteObject = function ($cellID){
	for(var j= 0 ; j< Map.objects.length ; j++){
		if (Map.objects[j].where == $cellID){
			var _cell = document.getElementById(Map.objects[j].where);
			
			Map.objects.splice(j,1);
			_cell.removeChild(_cell.firstChild);
			
			break;
		}
	}
};













