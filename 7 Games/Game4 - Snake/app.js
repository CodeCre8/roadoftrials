document.addEventListener('DOMContentLoaded', () => {

  const sqaures = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const scoreBtn = document.querySelector('.start')

  const width = 10
  let currentIndex = 0 //so first div in our grid
  let appleIndex = 0 //so first div in our grid
  let currentSnake = [2,1,0] //so the div in our grid 2 being the head), 0 being the tail, and all 1s being the body
  let direction = 1 //the div is always one div down the array
  let score = 0
  let speed = 0.9
  let intervalTime = 0
  let interval = 0

  //start or restart game
  function startGame() {
    //reset all
    currentSnake.forEach(index => sqaures[index].classList.remove('snake'))
    sqaures[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    //generate random apple
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }

  //snake movements
  function moveOutcomes() {
    
  }

  //assign functions to keycodes
  function control(e) {
    sqaures[currentIndex].classList.remove('snake') //remove all class of snake
    if(e.keyCode === 39) {
      direction =+ 1 // press the right arrow and the snake will go right 
    } else if(e.keyCode === 38) {
      direction = -width // press up arrow and the snake will go back 10 width 
    } else if(e.keyCode === 37) {
      direction =-1 // press left and the snake go left
    } else if(e.keyCode === 40) {
      direction =+ width // press down and the snake will go forward 10 widths
    }
  } 

  document.addEventListener('keyup', control)

})