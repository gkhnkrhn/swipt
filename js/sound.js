function Sound() {};

Sound.moveElement = "";
Sound.eatElement = "";
Sound.failElement = "";
Sound.muteButton = "";
Sound.on = localStorage.getItem("mute");

Sound.init = function(){

	Sound.moveElement = document.getElementById("move");
	Sound.eatElement = document.getElementById("eat");
	Sound.failElement = document.getElementById("fail");
	Sound.muteButton = document.getElementById("mute-button");

	Sound.eatElement.load();
	Sound.failElement.load();
	Sound.moveElement.load();

	if(Sound.on == null){
		Sound.on = 1;
		Sound.muteButton.src = "img/muteon.png";
	}
	else if(Sound.on == 1){
		Sound.muteButton.src = "img/muteon.png";
	}
	else{
		Sound.muteButton.src = "img/muteoff.png";
	}
};

Sound.play = function($soundName) {
    if(Sound.on == 1){
		setTimeout(function() {
			switch($soundName){
				case "move":
						Sound.moveElement.play();
					break;

				case "eat":
					Sound.eatElement.play();
					break;

				case "fail":
					Sound.failElement.play();
					break;
			}
		}, 20);
	}
};

Sound.onOff = function(){
	if(Sound.on == 1){
		Sound.on = 0;
		Sound.muteButton.src = "img/muteoff.png";
	}
	else{
		Sound.on = 1;
		Sound.muteButton.src = "img/muteon.png";
	}

	localStorage.setItem("mute", Sound.on);
};