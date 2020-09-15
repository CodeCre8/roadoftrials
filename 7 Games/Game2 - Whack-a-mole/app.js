const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result = 0
let hitPosition 
let currentTime = timeLeft.textContent

// Create random square
function randomSquare() {
  square.forEach(className => {
    className.classList.remove('mole')
  })
  let randomPosition = square[Math.floor(Math.random() * square.length)]
  randomPosition.classList.add('mole')

  // Assgin the id of the randomPosition to hitPosition for us to use later
  hitPosition = randomPosition.id
}

square.forEach(id => {
  id.addEventListener('mouseup', () => {
    if(id.id === hitPosition) {
      result = result + 1
      score.textContent = result
    }
  })
})

// Move the mole every so often
function moveMole() {
  let timerId = null
  timerId = setInterval(randomSquare, 500);
}

// Countdown
function countDown() {
  currentTime --
  timeLeft.textContent = currentTime

  if(currentTime === 0) {
    clearInterval(timerId)
    alert('GAME OVER! Your final score is ' + result)
  }
}

let timerId = setInterval(countDown, 1000)

moveMole()