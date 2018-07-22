var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
var snakeSize = 10; 
var w = 350;
var h = 350;
var score = 0;
var snake;
var snakeSize = 10;
var food;
var beginsound = new Audio('music/pacman_beginning.wav');
var deathsound = new Audio('music/pacman_death.wav');
var eatsound = new Audio('music/pacman_chomp.wav');


