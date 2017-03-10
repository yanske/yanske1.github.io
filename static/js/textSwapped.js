var greetings = ["Hoi,", "Hey,", "Hello,", "Heyo,"];
var index = 0;
var totalDelay = 3300;

window.setInterval(function(){
	$("#greet").fadeOut(function(){
		$("#greet").html(greetings[index]).fadeIn();
	});
	if(++index >= 4) index -= 4;
}, totalDelay);

