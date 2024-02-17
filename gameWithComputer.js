var computergameactivated = 0;


function startGame(computerActivated) {
    setComputerGameActivated(computerActivated);
    hideButtons();
}

/*hide buttons after choosing mode*/
function hideButtons() {
    document.getElementById("AI").style.display = "none";
    document.getElementById("human").style.display = "none";
    document.getElementById("rolldicebutton").disabled = false; /*enable roll dice*/
}

function setComputerGameActivated(value) {
    setPlayerTurn(2);
    computergameactivated = value;
}

function getComputerGameActivated() {
    return computergameactivated;
}

/* computer's turn */
function waitforcomputer(){
    document.getElementById("rolldicebutton").disabled = true;
		setTimeout(function () {
            setPlayerTurn(1); /* computer plays as Player 1 */
            document.getElementById("rolldicebutton").disabled = false; /*enables roll dice button*/
            performComputerMove(); /*function that controls the computer move*/
			
        }, 1000);
}

function performComputerMove() {
	    rollDice();
}

