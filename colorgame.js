//init values
var numSquares = 6; 
var colors = [];
var pickedColor;
//selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("color-display");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
				if(this.textContent === "EASY"){
					numSquares = 3;
				}else if(this.textContent === "MEDIUM"){
					numSquares = 6;
				}else{
					numSquares = 9;
				}
			reset();
		});
	}
}

function setUpSquares(){
	for (var i = 0; i < squares.length; i++){
		//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "CORRECT!";
				changeColors(clickedColor);
				resetButton.textContent = "PLAY AGAIN";
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "TRY AGAIN!";
			}
		});
	}
}

resetButton.addEventListener("click", function(){
	reset();
});

function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new random color
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//reset message display
	messageDisplay.textContent = "";
	//change reset button back to reset
	resetButton.textContent = "NEW COLORS";
	//change colors of squares
	h1.style.backgroundColor = "steelblue";
	for (var i = 0; i < squares.length; i++){
		// if there is an index in colors then set
		// the square to the color index
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
			//else hide that square
		} else {
			squares[i].style.display = "none";
		}
	}
}

function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = [];
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push to arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a red from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a green from 0 - 255
	var g = Math.floor(Math.random() * 256);
	//pick a blue from 0 - 255
	var b = Math.floor(Math.random() * 256);
	//concat to a string and return
	return "rgb(" + r + ", " + g + ", " + b + ")";
}