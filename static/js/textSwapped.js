var greetings = ["Hoi", "Hey", "Hello", "Heyo"];
var index = 0;
var firstTime = true;
var totalDelay = 3300;

window.setInterval(function(){
	
	if(firstTime == false)
	{
		$("#greet").fadeIn(400).delay(2500).fadeOut(400);
	}
	else if(firstTime == true)
	{
		$("#greet").delay(2900).fadeOut(400);
		firstTime = false;
	}
	
  	var greet = document.getElementById('greet').innerHTML;
  	var next = index+1;
  	next=next%4;
	var res = greet.replace(greetings[index], greetings[next]);

	document.getElementById('greet').innerHTML = res;
	index = next;

}, totalDelay);





