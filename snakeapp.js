//Create variables
const grid = document.querySelector('.game-grid')
const gameBtn = document.querySelector('button')
const score = document.querySelector('.score')
let squares = []
let currentSnake = [0,1,2]

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
  console.log(squares)
}

createGrid()

//Create snake
currentSnake.forEach(index => squares[index].classList.add('snake'))

console.log(currentSnake)