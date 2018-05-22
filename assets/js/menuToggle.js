window.onload = function() {
  var trigger = document.getElementById("dropdown-trigger");
  trigger.addEventListener("touchstart", function(event){
    trigger.checked = !trigger.checked;
    event.preventDefault();
  });
}
