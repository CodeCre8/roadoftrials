/*
- Pick out HTML elements
- Create grid: Add squares to the grid ✅
- Create snake: Draw a 3-square snake ✅
- Move snake: Create the snake movement ✅
	> Drop the tail
	> Add a sqaure in the front
- Move the snake  ✅
- Control snake direction using keycodes  ✅
- Check if snake is running into wall  ✅
- Create apple  ✅
  > Use random number to create apple
- When snake eats an apple  ✅
  > Remove apple
  > Add one square to snake
  > Generate a new apple
  > Add 1 to score
  > Speed the game
- Click Start/Reset button  ✅
	> Reset elements
		* Score
		* Snake
		* Apple
		* Speed
*/

const snakeGrid = document.querySelector('.snake-grid')
const snakeScore = document.querySelector('.snake-score')
const snakeBtn = document.querySelector('.snake-button')
const squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

//Create grid: Add 100 squares to the grid
function createGrid() {
  //Create loop to add 100 squares to the grid
  for ( let i = 0; i < 100; i++) {
    //Create a sqaure
    const square = document.createElement('div')
    //Style square
    square.classList.add('snake-square')
    //Add square to the grid
    snakeGrid.appendChild(square)
    //Push square to an array of squares
    squares.push(square)
  }
}

createGrid()

//Create and style snake: Draw a 3-square snake
//Each element in the snake is corresponding to a square in the grid
//The snake is expressed through the sqaures in the grid
function createSnake() {
  //Loop through the each item in tne currentSnake array
  //Find the corresponding square
  //Style the square to create the snake
  currentSnake.forEach(index => squares[index].classList.add('snake'));
}

createSnake()

//Generate apple
function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length)
  } while (squares[appleIndex].classList.contains('snake')) {
    squares[appleIndex].classList.add('apple');
  }
}

generateApple()

//Events happen when the Start/Reset button is clicked
function startGame() {
  //Reset elements
  direction = 1
  intervalTime = 1000
  speed = 0.9
  //Reset score
  score = 0
  snakeScore.textContent = score
  //Remove snake
  currentSnake.forEach(index => squares[index].classList.remove('snake'))
  //Regenerate snake
  currentSnake = [2,1,0]
  currentSnake.forEach(index => squares[index].classList.add('snake'))
  //Reset apple
  squares[appleIndex].classList.remove('apple')
  generateApple()
  //Start game
  clearInterval(timerId)
  timerId = setInterval(move, intervalTime)
}

//Move snake: Create the snake movement
//Drop the tail
//Add a sqaure in the front
function move() {
  //Check if snake is running into wall
  //If true, stop game
  if(
    //Hit top: currentSnake[0] < 0 && direction === -10
    (currentSnake[0] < 0 && direction === -width) ||
    //Hit bottom: currentSnake[0] >= 100 && direction === 10
    (currentSnake[0] >= 100 && direction === width) ||
    //Hit left: currentSnake[0] % 10 === 0 && direction === -1
    (currentSnake[0] % 10 === 0 && direction === -1) ||
    //Hit right: currentSnake[0] % 10 === 9 && direction === 1
    (currentSnake[0] % 10 === 9 && direction === 1) ||
    //Snake goes into itself
    squares[currentSnake[0] + direction].classList.contains('snake')
  ) 
  return clearInterval(timerId)

  let tail = currentSnake.pop()
  squares[tail].classList.remove('snake')
  currentSnake.unshift(currentSnake[0] + direction)
  
  //When snake eats an apple
  if(squares[currentSnake[0]].classList.contains('apple')) {
    //Remove apple
    squares[appleIndex].classList.remove('apple')
    //Add one square to snake
    currentSnake.push(tail)
    //Generate a new apple
    generateApple()
    //Add 1 to score
    score++
    snakeScore.textContent = score
    //Speed up the game
    clearInterval(timerId)
    intervalTime = intervalTime * speed
    timerId = setInterval(move, intervalTime)
  }
  squares[currentSnake[0]].classList.add('snake')
}

//Control snake direction
//up = 38
//down = 40
//left = 37
//right = 39
function control(e) {
  if(e.keyCode === 38) {
    direction = -width
  } else if(e.keyCode === 40) {
    direction = +width
  } else if(e.keyCode === 37) {
    direction = -1
  } else if(e.keyCode === 39) {
    direction = 1
  }
}

//Listen to key events
document.addEventListener('keydown', control)

snakeBtn.addEventListener('click', startGame)