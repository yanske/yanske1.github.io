var trigger = document.getElementsByClassName("dropdown-trigger")[0];
var mobileDropdown = document.getElementsByClassName("mobile-dropdown")[0];
var active = false;

trigger.addEventListener("click", function(event){
  mobileDropdown.style.height = active ? 0 : "auto";
  active = !active;
  event.preventDefault();
});
