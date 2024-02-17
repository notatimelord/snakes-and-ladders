
var initial_position_1 = 0;
var initial_position_2 = 0;

function setPositions() {
	var positions=[];
	var snakePositions   =[13,38,46,73,82,89]
	var snakeNewPositions=[12,18,36,43,62,79]

	var ladderPositions   =[6,31,47,56,78]
	var ladderNewPositions=[27,71,58,67,88]
	
	var snakes_or_ladders_Positions   =[25,29,65,70]
	var snakes_or_ladders_NewPositions=["4 or 45","9 or 49","54 or 84","40 or 90"]


	for (var i = 1; i <=90 ; i++) {
	 positions[i]=new Object();
	 positions[i].from=i;
	 
	  
	 if(snakePositions.indexOf(i)!=-1){
	   positions[i].to=snakeNewPositions[snakePositions.indexOf(i)];
	   positions[i].type="Snake";
	 }
	 else if(ladderPositions.indexOf(i)!=-1){
	   positions[i].to=ladderNewPositions[ladderPositions.indexOf(i)];
	   positions[i].type="Ladders";
	 }
	 else if(snakes_or_ladders_Positions.indexOf(i)!=-1){
	   positions[i].to=snakes_or_ladders_NewPositions[snakes_or_ladders_Positions.indexOf(i)];
	   positions[i].type="Snake or Ladders";
	 }
	 else if(i===11 || i===55 || i===88){
		positions[i].to=i;
		positions[i].type="September";   
	 }
	 else if(i===22 || i===44 || i===77){
		positions[i].to=i;
		positions[i].type="Swords";   
	 }
	 else{
	   positions[i].to=i;
		positions[i].type="Normal";   
	   
	 }
	}
	 return positions; 
	}

var cells=setPositions();
	for (var i = 1; i <=90 ; i++) {
    	console.log("Cell: "+i+" type: "+cells[i].type+" From: "+cells[i].from+" To: "+cells[i].to)
}


function setPlayerTurn(player) {
    currentPlayer = player; // Set the turn to the specified player
}

function getPlayerTurn() {
    return currentPlayer; // Get the current player's turn
}

/*changes the player's turn */
function changePlayerTurn() {
    if (getComputerGameActivated() == 1 && getPlayerTurn()==2) {
        waitforcomputer();
    } else {
        if (currentPlayer === 1) {
            setPlayerTurn(2);
        } else {
            setPlayerTurn(1);
        }
    }
}

/*when new game is pressed, all pawns go back to start*/
function InitializeEveryone(){
	var prevPositionElement = document.getElementById("position" + initial_position_1);
	prevPositionElement.innerHTML = "<img src='images/" + initial_position_1 + ".png' height='70' width='80'>";
	var prevPositionElement = document.getElementById("position" + initial_position_2);
	prevPositionElement.innerHTML = "<img src='images/" + initial_position_2 + ".png' height='70' width='80'>";
	
	initial_position_1 = 0;
	initial_position_2 =0;

}


function rollDice() {
    const sides = 6;
    const diceNumbers = document.querySelectorAll('.dice-number');
    const randomNumber = Math.floor(Math.random() * sides) + 1;
    /* Create a new paragraph element for each roll and append it */

	if (!gameStarted) {
        return;
    }
    const resultText = document.getElementById("diceResulttext");
    document.getElementById("diceResult").value = randomNumber;
    const newParagraph = document.createElement('p');
    newParagraph.textContent = "Player " + getPlayerTurn() + " rolls " + randomNumber;
    resultText.appendChild(newParagraph);

	if(randomNumber==6){
		const newParagraph = document.createElement('p');
		newParagraph.textContent = "Player " + getPlayerTurn() + " plays again";
		resultText.appendChild(newParagraph);
	}

	for (let i = 0; i < diceNumbers.length; i++) {
        const currentNumber = parseInt(diceNumbers[i].textContent);
        if (currentNumber == randomNumber) {
            // Change the background color of the rolled dice to yellow
            diceNumbers[i].style.backgroundColor = 'yellow';
			diceNumbers[i].style.color = 'black'
		}else{
			diceNumbers[i].style.backgroundColor = 'black';
			diceNumbers[i].style.color = 'white'
		}
	}

    play(randomNumber, resultText); // Update the game board

	if(randomNumber==6 && initial_position!=90){
		const newParagraph = document.createElement('p');
		newParagraph.textContent = "Player " + getPlayerTurn() + " plays again";
		resultText.appendChild(newParagraph);
		rollDice();
	}else{
		changePlayerTurn();
	}
}

function play(randomNumber, resultText){
	changePosition(randomNumber, resultText); /*update the gameboard*/
}

/* function that controls the movement of the pawn */
function changePosition(newPosition, resultText) {
	if(getPlayerTurn()==1){
		var prevPositionElement = document.getElementById("position" + initial_position_1);

		if(initial_position_1+newPosition<=90){
			var positionElement = document.getElementById("position" + (initial_position_1 + newPosition));
		}else{ /*checking for the case that we go beyond tile 90*/
			var positionElement = document.getElementById("position" + (90-(initial_position_1+newPosition-90)));
		}


		if (prevPositionElement) {  /* storing previous initial position */
			if(initial_position_1!=initial_position_2){
				prevPositionElement.innerHTML = "<img src='images/" + initial_position_1 + ".png' height='70' width='80'>";
			}else{
				prevPositionElement.innerHTML = "<img src='imagesWhite/" + initial_position_1 + ".png' height='70' width='80'>";
			}
		}

		if(initial_position_1+newPosition<=90){
			initial_position_1 = initial_position_1 + newPosition   /* new position */
		}else{  /*in case the pawns goes further than the final tile*/
			initial_position_1=90-(initial_position_1+newPosition-90);
		}

		if (positionElement) {
			positionElement.innerHTML = "<img src='imagesRed/" + (initial_position_1) + ".png' height='70' width='80'>";
		}

		September_effect_1 = Check_For_September_Effect(initial_position_1,initial_position_2,  resultText);
		initial_position_1 = Check_For_Ladders(initial_position_1);    
		initial_position_1 = Check_For_Snakes(initial_position_1);
		initial_position_1 = Check_For_Snakes_Ladders(initial_position_1, resultText);

	}else {
        var prevPositionElement_2 = document.getElementById("position" + initial_position_2);

		if(initial_position_2+newPosition<=90){
			var positionElement = document.getElementById("position" + (initial_position_2 + newPosition));
		}else{ /*checking for the case that we go beyond tile 90*/
			var positionElement = document.getElementById("position" + (90-(initial_position_2+newPosition-90)));
		}
        

        if (prevPositionElement_2) {
            // Update the previous position for player 2
            if (initial_position_1 !== initial_position_2) {
                prevPositionElement_2.innerHTML = "<img src='images/" + initial_position_2 + ".png' height='70' width='80'>";
            } else {
                prevPositionElement_2.innerHTML = "<img src='imagesRed/" + initial_position_2 + ".png' height='70' width='80'>";
            }
        }

        /* Update the new position for player 2 */
		if(initial_position_2+newPosition<=90){
        	initial_position_2 = initial_position_2 + newPosition;
		}else{  /*in case the pawns goes further than the final tile*/
			initial_position_2=90-(initial_position_2+newPosition-90);
		}
        if (positionElement) {
            positionElement.innerHTML = "<img src='imagesWhite/" + initial_position_2 + ".png' height='70' width='80'>";
        }
		
		 /* check for special tiles */
		September_effect_2 = Check_For_September_Effect(initial_position_1, initial_position_2, resultText);
		initial_position_2 = Check_For_Ladders(initial_position_2);    
		initial_position_2 = Check_For_Snakes(initial_position_2);
		initial_position_2 = Check_For_Snakes_Ladders(initial_position_2, resultText);
		
	}
	/*checks if player won*/
	hasPlayerWon(resultText);
}

/* function that checks the grade so it chooses
if it has to use the snake or the stairs */

function checkGrade(grade, snake_pos, stairs_pos) {
    let positionElement;
    let newPosition;

	if(getPlayerTurn()==1 && September_effect_1 ==1 && grade<5){
		grade = Math.floor(Math.random() * 11);
	}else if(getPlayerTurn()==2 && September_effect_2 ==2 && grade<5){
		grade = Math.floor(Math.random() * 11);
	}

    if (grade < 5) {
        positionElement = document.getElementById("position" + snake_pos);
        if (getPlayerTurn() == 2) {
            positionElement.innerHTML = "<img src='imagesWhite/" + snake_pos + ".png' height='70' width='80'>";
        } else {
            positionElement.innerHTML = "<img src='imagesRed/" + snake_pos + ".png' height='70' width='80'>";
        }
        newPosition = snake_pos;
    } else {
        positionElement = document.getElementById("position" + stairs_pos);
        if (getPlayerTurn() == 1) {
            positionElement.innerHTML = "<img src='imagesRed/" + stairs_pos + ".png' height='70' width='80'>";
        } else {
            positionElement.innerHTML = "<img src='imagesWhite/" + stairs_pos + ".png' height='70' width='80'>";
        }
        newPosition = stairs_pos;
    }

    return newPosition;
}

/* function that determines behavior of snakes */
function Check_For_Snakes(initial_position) {
    let positionElement = document.getElementById("position" + initial_position);
    if (initial_position == 13 || initial_position == 38 || initial_position == 46 || initial_position == 73 || initial_position == 82 || initial_position == 89) {
        positionElement.innerHTML = "<img src='images/" + initial_position + ".png' height='70' width='80'>";
		playSnakeSound(); // Call a function to play the snake sound
	}

    if (initial_position == 13) {
		initial_position = checkGrade(0, 12, 12);
    } else if (initial_position == 38) {
        initial_position=checkGrade(0, 18, 18 );
    } else if (initial_position == 46) {
        initial_position=checkGrade(0, 36, 36 );
    } else if (initial_position == 73) {
        initial_position=checkGrade(0, 43, 43 );
    } else if (initial_position == 82) {
		initial_position=checkGrade(0, 62, 62 );
    } else if (initial_position == 89) {
        initial_position=checkGrade(0, 79, 79 );
    }
    return initial_position;
}


/*function for generating a number between 0-10 and printing it*/
function exam_simulator(resultText, initial_position, positionElement){
	grade = Math.floor(Math.random() * 11);
	const newParagraph = document.createElement('p');
	newParagraph.textContent = "You just got "+ grade + " in your exam";
	resultText.appendChild(newParagraph);
    positionElement = document.getElementById("position"+initial_position);
    positionElement.innerHTML = "<img src='images/" + initial_position + ".png' height='70' width='80'>";
	return grade;
}

/* functions for tiles with ladders + snakes */
function Check_For_Snakes_Ladders(initial_position, resultText){
	let positionElement = document.getElementById("position" + initial_position);
	if(initial_position == 25 || initial_position == 29 || initial_position == 65 || 
        initial_position == 70  ){
    		grade = exam_simulator(resultText, initial_position, positionElement);
			if(getPlayerTurn()==1 && September_effect_1 == 1 && grade <5){
				const newParagraph = document.createElement('p');
				newParagraph.textContent = "September effect activated";
				resultText.appendChild(newParagraph);
    			grade = exam_simulator(resultText, initial_position, positionElement);
			}else if(getPlayerTurn() == 2 && September_effect_2 == 1 && grade <5){
				const newParagraph = document.createElement('p');
				newParagraph.textContent = "September effect activated";
				resultText.appendChild(newParagraph);
    			grade = exam_simulator(resultText, initial_position, positionElement);
			}
		if(initial_position == 25){
			initial_position=checkGrade(grade, 4, 45);
		}else if(initial_position==29){
			initial_position=checkGrade(grade, 9, 49);
		}else if(initial_position == 65){
			initial_position=checkGrade(grade, 54, 84);
		}else if(initial_position==70){
			initial_position=checkGrade(grade, 40, 90);
		}
		
	}
	return initial_position;
}



/* function that determines behavior of stairs */
function Check_For_Ladders(initial_position){
    if(initial_position == 6 || initial_position == 31 || initial_position == 47 || 
        initial_position == 56 || initial_position == 78 ){
            positionElement = document.getElementById("position"+initial_position);
            positionElement.innerHTML = "<img src='images/" + initial_position + ".png' height='70' width='80'>";
        }
    if(initial_position==6){
        initial_position=checkGrade(0, 27, 27 );
    }else if(initial_position==31){
        initial_position=checkGrade(0, 71, 71 );
    }else if(initial_position ==47){
        initial_position=checkGrade(0, 58, 58 );
    }else if(initial_position ==56){
        initial_position=checkGrade(0, 67, 67 );
    }else if(initial_position==78){
		initial_position=checkGrade(0, 88, 88 );
    }
    return initial_position;
}



/*function that checks if the player has finished */
function hasPlayerWon(resultText){
	if(initial_position_1==90 || initial_position_2==90){
		const newParagraph = document.createElement('p');
		newParagraph.textContent = "Player " + getPlayerTurn() + " won";
		resultText.appendChild(newParagraph);
		gameStarted = false;
	} 
}

/*checking for september effect and shows message */
function Check_For_September_Effect(initial_position_1, initial_position_2, resultText){
	if(getPlayerTurn()==1){
		if(initial_position_1 == 11 || initial_position_1 == 55 || initial_position_1 == 88 ){
			const newParagraph = document.createElement('p');
			newParagraph.textContent = "Player " + getPlayerTurn() + " now has September effect";
			resultText.appendChild(newParagraph);
			September_effect_1 = 1;
			return September_effect_1
		}else{
			return 0;
		}
	 }else{
		if(initial_position_2 == 11 || initial_position_2 == 55 || initial_position_2 == 88 ){
			const newParagraph = document.createElement('p');
			newParagraph.textContent = "Player " + getPlayerTurn() + " now has September effect";
			resultText.appendChild(newParagraph);
			September_effect_2 = 1;
			return September_effect_2
		}else{
			return 0;
		}
	}
}