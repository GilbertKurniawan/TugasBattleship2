var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	numSet: 1,
	count_set:1,
	
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],

// original hard-coded values for ship locations
/*
	ships: [
		{ locations: ["06", "16", "26"], hits: ["", "", ""] },
		{ locations: ["24", "34", "44"], hits: ["", "", ""] },
		{ locations: ["10", "11", "12"], hits: ["", "", ""] }
	],
*/
	makeSets: function() {
		this.numSet = parseInt(document.getElementById("numSets").value);
		document.getElementById("jumlah_set_pilihan").innerHTML = this.numSet;
		document.getElementById("set_ke").innerHTML = this.count_set;
        document.getElementById("numSetsInputButton").disabled = true;
		document.getElementById("fireButton").disabled = false;
	},

	makeNumship: function() {
		this.numSet = parseInt(document.getElementById("numShips").value);
		document.getElementById("jumlah_kapal_pilihan").innerHTML = this.numSet;
		document.getElementById("NumShipsInputButton").disabled = true;
        document.getElementById("numSetsInputButton").disabled = false;
	},

	fire1: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			// here's an improvement! Check to see if the ship
			// has already been hit, message the user, and return true.
			if (ship.hits[index] === "hit") {
				view.displayMessage("Oops, you already hit that location!");
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit";

				controller.guess1win ++;
				controller.score1 = controller.score1 + 10;
				
				view.displayHit(guess);
				view.displayMessage("HIT!");
				view.displayScoreP1(controller.score1);
				view.displayguess1(controller.guess1win);

				if (controller.score1 > this.numShips*5 ){
					controller.numHof++;
					view.displaywinner("Player 1", controller.score1, controller.numHof);
					document.getElementById("fireButton").disabled = true;
					document.getElementById("fireButton2").disabled = true;
					document.getElementById("tombol_continue").disabled = false;
				}


				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},

	fire2: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			// here's an improvement! Check to see if the ship
			// has already been hit, message the user, and return true.
			if (ship.hits[index] === "hit") {
				view.displayMessage("Oops, you already hit that location!");
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit";

				controller.guess2win ++;
				controller.score2 = controller.score2 + 10;
				
				view.displayHit(guess);
				view.displayMessage("HIT!");
				view.displayScoreP2(controller.score2);
				view.displayguess2(controller.guess2win);
	
				if (controller.score2 >= this.numShips*5 ){
					controller.numHof++;
					view.displaywinner("Player 2", controller.score2, controller.numHof);
					document.getElementById("fireButton").disabled = true;
					document.getElementById("fireButton2").disabled = true;
					document.getElementById("tombol_continue").disabled = false;
				}

				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},

	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
	
}; 


var view = {
	displayclear: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "empty");
	},

	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	},

	displayguess1: function(guess1){
		var g1 = document.getElementById("player_1_win");
		g1.innerHTML = guess1;
	},

	displayguess2: function(guess2){
		var g2 = document.getElementById("player_2_win");
		g2.innerHTML = guess2;
	},

	displayScoreP1: function(score1){
		var score = document.getElementById("score_p1");
		score.innerHTML = score1;
	},

	displayScoreP2: function(score2){
		var score = document.getElementById("score_p2");
		score.innerHTML = score2;
	},

	displaywinner:function(player, score, numHof){
		var guess = document.getElementById("winner");
		guess.innerHTML = player;
		var hof = document.getElementById("hof");
		hof.innerHTML = numHof+". " + player+ ", Score "+ score;

		
	},

	display_none_winner:function(none){
		var guess = document.getElementById("winner");
		guess.innerHTML = none;
	},


}; 

var controller = {
	numHof:24,
	guesses:0,
	guess1win:0,
	guess2win:0,
	score1:0,
	score2:0,

	processGuess1: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire1(location);
			if (hit && model.shipsSunk === model.numShips) {
					view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
		}
	},

	processGuess2: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire2(location);
			if (hit && model.shipsSunk === model.numShips) {
					view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
				
			}
		}
	},


	next_set: function(){
		model.generateShipLocations();
		document.getElementById("tombol_continue").disabled = true;
		document.getElementById("fireButton").disabled = false;
		model.count_set ++;
		this.score1 = 0;
		this.score2 = 0;
		this.guess1win = 0;
		this.guess2win = 0;
		document.getElementById("set_ke").innerHTML = model.count_set;
		view.displayguess1(this.score1)
		view.displayguess2(this.score2)
		view.displayScoreP1(this.score1)
		view.displayScoreP2(this.score2)

		view.display_none_winner("-")

		// Menghapus seluruh gambar dari set 1
		view.displayclear("00");
		view.displayclear("01");
		view.displayclear("02");
		view.displayclear("03");
		view.displayclear("04");
		view.displayclear("05");
		view.displayclear("06");

		view.displayclear("10");
		view.displayclear("11");
		view.displayclear("12");
		view.displayclear("13");
		view.displayclear("14");
		view.displayclear("15");
		view.displayclear("16");

		view.displayclear("20");
		view.displayclear("21");
		view.displayclear("22");
		view.displayclear("23");
		view.displayclear("24");
		view.displayclear("25");
		view.displayclear("26");

		view.displayclear("30");
		view.displayclear("31");
		view.displayclear("32");
		view.displayclear("33");
		view.displayclear("34");
		view.displayclear("35");
		view.displayclear("35");
		view.displayclear("36");

		view.displayclear("40");
		view.displayclear("41");
		view.displayclear("42");
		view.displayclear("43");
		view.displayclear("44");
		view.displayclear("45");
		view.displayclear("45");
		view.displayclear("46");

		view.displayclear("50");
		view.displayclear("51");
		view.displayclear("52");
		view.displayclear("53");
		view.displayclear("54");
		view.displayclear("55");
		view.displayclear("55");
		view.displayclear("56");

		view.displayclear("60");
		view.displayclear("61");
		view.displayclear("62");
		view.displayclear("63");
		view.displayclear("64");
		view.displayclear("65");
		view.displayclear("65");
		view.displayclear("66");
	} 
}


// helper function to parse a guess from the user

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}


// event handlers

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();

	document.getElementById("fireButton").disabled = true;
	document.getElementById("fireButton2").disabled = false;
	controller.processGuess1(guess);
	
	guessInput.value = "";

	
}

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}


function handleFireButton2() {
	var guessInput2 = document.getElementById("guessInput2");
	var guess2 = guessInput2.value.toUpperCase();
	
	document.getElementById("fireButton2").disabled = true;
	document.getElementById("fireButton").disabled = false;
	controller.processGuess2(guess2);

	guessInput2.value = "";

}

function handleKeyPress2(e) {
	var fireButton2 = document.getElementById("fireButton2");

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {
		fireButton2.click();
		return false;
	}
}

// init - called when the page has completed loading

window.onload = init;

function init() {
	// // Fire! button onclick handler
	score1 = 2;
	score2 = 5;

	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	// handle "return" key press
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	// Fire! button onclick handler
	var fireButton2 = document.getElementById("fireButton2");
	fireButton2.onclick = handleFireButton2;

	// handle "return" key press
	var guessInput2 = document.getElementById("guessInput2");
	guessInput2.onkeypress = handleKeyPress2;

	// place the ships on the game board
	model.generateShipLocations();
}


