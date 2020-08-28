//Create variables
const grid = document.querySelector('.game-grid')
const gameBtn = document.querySelector('button')
const score = document.querySelector('.score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let width = 100
let appleIndex = 0

//Create grid
function createGrid() {
  //Create 100 of those elements
  for( let i = 0; i < 100; i++ ) {
    //Create an element
    const square = document.createElement('div')
    //Style the elements
    square.classList.add('game-square');
    //Create 100 squares
    grid.appendChild(square)
    //Create an array of squares
    squares.push(square)
  }
}
createGrid()

//Create snake
currentSnake.forEach(index => squares[index].classList.add('snake'))


//Move snake
function move() {
  //Remove the last element from the currentSnake array
  const tail = currentSnake.pop()
  //Remove the last square style
  squares[tail].classList.remove('snake')
  //Add square in the direction that the snake is moving
  currentSnake.unshift(currentSnake[0] + direction)
  //Add style to see the square 
  squares[currentSnake[0]].classList.add('snake')
}

move()

// Set the snake to move at a specific time interval
setInterval(move, 1000)


//Create apples
function createApple() {
  //Get a random position between 0-100 for apple
  appleIndex = Math.floor(Math.random() * width)
  
  //Create the apple element
  squares[appleIndex].classList.add('apple')  
}
createApple()