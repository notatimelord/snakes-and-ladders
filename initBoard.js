let currentPlayer = Math.floor(Math.random() * (2 - 1 + 1)) + 1; //player to play first
let September_effect_1 = 1;
let September_effect_2 = 1;
var music = new Audio('music.mp3');
let gameStarted = false;

/*function that makes the audio either stop or start 
when pressing the button*/
function toggleSound() {
    if (!gameStarted) {
        return;
    }
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}


document.getElementById('soundButton').addEventListener('click', toggleSound);

function playSnakeSound() {
    var snakeSound = document.getElementById("snakeSound");
    snakeSound.play();
}

function initBoard(){
    var table = document.getElementById('mainTable');
	var tr = document.createElement('tr');

	for (var i = 9; i >=1; i--) {
	  var tr = document.createElement('tr');
	  for (var j = 9; j >=0; j--) {
	  var td1 = document.createElement('td');
	  var num=i*10-j;
	  td1.innerHTML="<div id='position"+num+"'><img  src='images/"+num+".png'  height=70 width=80></div>";
	  
	  tr.appendChild(td1);
	  
	  }
	  table.appendChild(tr);
	}
}


function InitializeDice() {
    if (!gameStarted) {
        return;
    }
	/*dice-container is the container for the dice*/
	const diceContainer = document.querySelector('.dice-container');    
    /*clearing anything previously stored just to be sure it contains no rubbish*/
    diceContainer.innerHTML = '';
    
    /*number of sides of the dice*/
    const sides = 6;

    /*printing the dice numbers*/
    for (let i = 1; i <= sides; i++) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('dice-number');
        numberDiv.textContent = i;
        diceContainer.appendChild(numberDiv);
    }

}
 
function cleanHistory() {
    if (!gameStarted) {
        return;
    }
    const resultText = document.getElementById("diceResulttext");
    resultText.innerHTML = ''; // Remove all content inside the info-box-text
}

function newGame() {
    document.getElementById("AI").style.display = "block";
    document.getElementById("human").style.display = "block";
    document.getElementById("rolldicebutton").disabled = true; /*disable so user must choose mode*/
    InitializeDice();
    cleanHistory();
    const resultText = document.getElementById("diceResult");
    resultText.value = ''; /* Clear the value inside the input field*/
    setPlayerTurn(currentPlayer);
    music.loop = true; /*so the music loops*/
    music.play();  
    gameStarted=true;
    InitializeEveryone();
}
