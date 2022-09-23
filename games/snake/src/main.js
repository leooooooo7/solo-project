

//STRETCH GOALS
// Choose the snakes color at the start of the game
// Save score and display all scores if the user resets when they die
// The ability to save a name associated with a score
// Food randomizes location when the game resets
// Winning score maybe?
// A pause button/key
// Write in the initial message the keys players can use to control the snake




//VARIABLES

let direction = "up";
let speed = 50;
let frameDelay = 250;
let directionArray = ["up", "up", "up"]; // An array that tells each snake piece where they will move next

let head = document.getElementById("snakeHead");
let initialPlayButton = document.querySelector(".initialPlayButton.playButton")
let newGameButton = document.querySelector(".newGameButton.playButton")
initialPlayButton.addEventListener("click", startPlay)
newGameButton.addEventListener("click", startPlay)

let snakeArray = [ // An array that holds all snake pieces
  head,
  document.getElementsByClassName("snakePiece")[1],
  document.getElementsByClassName("snakePiece")[2]
];
let snakePosObj = { // Keys are indexs to the snakesArray, value is position
  0: [0, 0], //First pos is Top position, second is Left
  1: [],
  2: [],
  3: []
};

let score = snakeArray.length;
let meal = document.getElementById("apple");
let halt = "";

//The initial click that gets rid of the initialMessage
function startPlay() {
  document.getElementById("initialMessage").style.display = "none";
  document.getElementById("game-over").style.display = "none";
  meal.style.display = "block"
  newLocation()
  continuousMove();
}

//Sets the top and the left new values divisible in 750 x 750 grid
function newLocation() {
   meal.style.top = (Math.floor(Math.random() * 14) * 50) + "px";
   meal.style.left = (Math.floor(Math.random() * 14) * 50) + "px";
}

//Function that speeds up the snake
function speedUp(pieces) {
  if (snakeArray.length === pieces) {
    frameDelay -= 30;
  }
}

// function to increase length
function increaseLength(left, top) {
  let piece = document.createElement("div"); // create a new div
  piece.className = 'snakePiece new'; // add properties to div
  piece.style.left = left;
  piece.style.top = top;
  document.getElementById("board").appendChild(piece);

  snakeArray.splice(1, 0, piece); // add piece after head
  snakePosObj[snakeArray.length] = [];

  halt = "halt"; //Halts all pieces for a frame so the new piece can shift into place
}

// Once snake moved into itself or the border, we display the game over message and stop the movement.
function gameOver() {
  document.getElementById("game-over").style.display = "block";
  document.getElementById("gameOverScoreDisplay").innerHTML = "Your Score is: " + score;
  frameDelay = 250;
}
//Function is called to change color of snake when it dies or when game is reset 
function changeColor(color) {
  for (let i = 1; i < snakeArray.length; i++) {
   snakeArray[i].style.backgroundColor = color
  }
}

function resetGame() {
  directionArray = ["up", "up", "up"];
  direction = "up";

  //Moves snake back to its original position
  snakeArray.forEach((v, i) => {
    if (i === 0) {
      v.style.top = "350px";
      v.style.left = "200px";
    } else if (i === 1) {
      v.style.top = "400px";
      v.style.left = "200px";
    } else if (i === 2) {
      v.style.top = "450px";
      v.style.left = "200px";
    } else {
      snakePosObj[i] = [];
      v.remove();
    }
  });
  originalLength = snakeArray.length;
  for (let i = 0; i < originalLength; i++) {
    if (i !== 0 && i !== 1 && i !== 2) {
      snakeArray.pop();
    }
  }
  score = snakeArray.length;
  changeColor("#ad09b9");
}

function continuousMove() {
  //Continuous Movement, most events should be in setInterval as well
  const interval = setInterval(() => {

    //Removes the last direction and adds the new direction to the beginning of the list, also prevents snake from turning back on itself
    if (directionArray.length <= snakeArray.length + 1) {
      if (directionArray[0] === "up" && direction === "down") {
        directionArray.unshift(directionArray[0]);
      } else if (directionArray[0] === "down" && direction === "up") {
        directionArray.unshift(directionArray[0]);
      } else if (directionArray[0] === "left" && direction === "right") {
        directionArray.unshift(directionArray[0]);
      } else if (directionArray[0] === "right" && direction === "left") {
        directionArray.unshift(directionArray[0]);
      } else {
        directionArray.unshift(direction);
      }

    } else {
      directionArray.pop();
      if (directionArray[0] === "up" && direction === "down") {
        directionArray.unshift(directionArray[0]);
      } else if (directionArray[0] === "down" && direction === "up") {
        directionArray.unshift(directionArray[0]);
      } else if (directionArray[0] === "left" && direction === "right") {
        directionArray.unshift(directionArray[0]);
      } else if (directionArray[0] === "right" && direction === "left") {
        directionArray.unshift(directionArray[0]);
      } else {
        directionArray.unshift(direction);
      }
    }

    //Goes through each snake piece
    snakeArray.forEach((v, i) => {
      //Updates position info before moving
      snakePosObj[i][0] = v.style.top;
      snakePosObj[i][1] = v.style.left;
      //Moves each piece in the cooresponding direction using the directionArray
      moveSnake(v, directionArray[i], i);
      //Updates position info after moving
      snakePosObj[i][0] = v.style.top;
      snakePosObj[i][1] = v.style.left;
    });
    halt = ""; //For stopping pieces so the new piece can come in

    //Function for if the snake touches one of the 4 edges 
    if (Number(snakePosObj[0][0].replace("px", "")) < 0 ||    //top wall 
        Number(snakePosObj[0][0].replace("px", "")) >= 700 || //bottom wall 
        Number(snakePosObj[0][1].replace("px", "")) < 0 ||    //left wall 
        Number(snakePosObj[0][1].replace("px", "")) >= 700)   // right wall 
        {
          changeColor("red");
          gameOver();
          clearInterval(interval);
          newLocation();
        }

    //Used for Game Over when the player drives into themselves
    for (let key in snakePosObj) {
      if (key != 0) {
        if (snakePosObj[key][0] === head.style.top) {
          if (snakePosObj[key][1] === head.style.left) {
            changeColor("red")
            gameOver();
            clearInterval(interval);
          }
        }
      }
    }

    //If the snake is touching food increase it's length
    if (meal.style.top === head.style.top && meal.style.left === head.style.left) {
      increaseLength(meal.style.left, meal.style.top);
      score++;

      function checkedLocation() {
        newLocation();
        snakeArray.forEach((v,i) => {
          if(meal.style.top === v.style.top && meal.style.left === v.style.left) {
            checkedLocation();
            return;
          }
        });
      }
      checkedLocation();
      
      speedUp(5);
      speedUp(10);
      speedUp(15);
      speedUp(20);
      speedUp(25);
      clearInterval(interval)
      continuousMove()
    }
  }, frameDelay);
}

//Function that moves each snake piece -- MUST CLICK ON CANVAS TO PLAY
function moveSnake(piece, dir, index) {
  let snakePosTop = Number(snakePosObj[index][0].replace("px", ""));
  let snakePosLeft = Number(snakePosObj[index][1].replace("px", ""));

  if (halt === "halt" && index != 0) {

  } else {
    if (dir === "up") {                  // MOVE UP
      piece.style.top = (snakePosTop - speed) + "px";
    } else if (dir === "down") {         // MOVE DOWN
      piece.style.top = (snakePosTop + speed) + "px";
    } else if (dir === "left") {         // MOVE LEFT
      piece.style.left = (snakePosLeft - speed) + "px";
    } else if (dir === "right") {        // MOVE RIGHT
      piece.style.left = (snakePosLeft + speed) + "px";
    } else if (dir === "stop") {         // STOP -- ONLY FOR TESTING

    }
  }
}

//Key Presses that change direction
document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;

  if ((e.code == 'ArrowUp' || e.code == 'KeyW') && directionArray[0] != "down") {
    direction = "up";     // UP
  } else if ((e.code == 'ArrowDown' || e.code == 'KeyS') && directionArray[0] != "up") {
    direction = "down";   // DOWN
  } else if ((e.code == 'ArrowLeft' || e.code == 'KeyA') && directionArray[0] != "right") {
    direction = "left";   // LEFT
  } else if ((e.code == 'ArrowRight' || e.code == 'KeyD') && directionArray[0] != "left") {
    direction = "right";  // RIGHT
  } else if ((e.code == 'Space')) {
    direction = "stop";  // STOP - FOR TESTING ONLY!
  }
}









