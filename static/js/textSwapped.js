var greetings = ["Hoi,", "Hey,", "Hello,", "Heyo,"];
var index = 0;
var totalDelay = 3300;


//fades in and out using jQuery funcs
window.setInterval(function(){
	$("#greet").fadeOut(function(){
		$("#greet").html(greetings[index]).fadeIn();
	});
	if(++index >= 4) 
		index -= 4;
}, totalDelay);


//ensures button press on resume does not hold
$(document).ready(function () {
  $(".ho").click(function(event) {
    // Removes focus of the button.
    $(this).blur();
  });
});
