var app = angular.module("myApp", []);
	app.controller("myCtrl", function($scope){
	$scope.colorHover= "#b7b6b3";
	$scope.notHover= "#a2a09c";
});

$(document).ready(function(){
	setInterval('cursorAnimation()', 1000);
});

function cursorAnimation(){
	$('#cursor').animate({
		opacity: 0
	}, 'fast', 'swing').animate({
		opacity: 1
	}, 'fast', 'swing');
}