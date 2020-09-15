document.addEventListener('DOMContentLoaded', () => {

  //Create variables for main grid
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('.score')
  const startBtn = document.querySelector('.start-button')
  const width = 10
  let timerId
  let score = 0
  const colors = ['orange','red','purple','green','blue']

  //Create variables for mini grid
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0
  let nextRandom = 0

  //Create Tetrominoes for main grid
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]
  const zTetromino = [
    [0,width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0,width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
  ]

  const tTetromino = [
    [1,width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]

  const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ]

  const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ]

  const tetriminoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  //Create tetrominos for the mini grid. Only need the first rotation from each
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]
  
  //Set the position for the first tetromino and rotation
  let currentPostion = 4
  let currentRotation = 0

  //Select randomly a tetromino and its first rotion
  let random = Math.floor(Math.random()*tetriminoes.length)
  let current = tetriminoes[random][currentRotation]

  //draw the first tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPostion + index].classList.add('tetromino')
      squares[currentPostion + index].style.backgroundColor = colors[random]
    })
  }

  //Undraw the current tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPostion+index].classList.remove('tetromino')
      squares[currentPostion + index].style.backgroundColor = ''
    })
  }

  //Display the next tetromino
  function displayShape() {
    //Remove any trace of a tetromino from the entire mini grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
      square.style.backgroundColor = ''
      }
    )
    //Display square
    upNextTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
      }
    )
  }

  //Add functionality to the start/pause button
  startBtn.addEventListener('click', () => {
    if(timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      //Move tetromino down every second
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * tetriminoes.length)
      displayShape()
    }
  })

  //Assign functions to keyCodes
  function control(e) {
    //Move left
    if(e.keyCode === 37) moveLeft()
    //Move right
    else if(e.keyCode === 39) moveRight()
    //Rotate
    else if(e.keyCode === 38) rotate()
    //Move down
    else if(e.keyCode === 40) moveDown()
  } 

  //Add keyup event listener
  document.addEventListener('keyup', control)

  function moveDown() {
    undraw()
    currentPostion += width
    draw()
    freeze()
  }

  //Stop the moveDown at the bottom of grid
  function freeze() {
    if(current.some(index => squares[currentPostion + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPostion + index].classList.add('taken'))
      //Start a new tetromino falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * tetriminoes.length)
      current = tetriminoes[random][currentRotation]
      currentPostion = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }

  //Move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPostion + index) % width === 0) 
      //Not at left edge
      if(!isAtLeftEdge) currentPostion -= 1
      //Stop if another tetromino is already there
      if(current.some(index => squares[currentPostion + index].classList.contains('taken'))) {
        currentPostion += 1
      }
      draw()
    }

    //Move the tetromino right, unless is at the edge or there is a blockage
    function moveRight() {
      undraw()
      const isAtRightEdge = current.some(index => (currentPostion + index + 1) % width === 0)
      //Not at right edge
      if(!isAtRightEdge) currentPostion += 1
      //Stop if another tetromino is already there, move the currentPosition by 1 spance so appear to have not moved
      if(current.some(index => squares[currentPostion + index].classList.contains('taken')))
        currentPostion -= 1
      draw()
    }

    //Rotate
    function rotate() {
      undraw()
      currentRotation ++
      //Go back to 0 when the currentRotation is 4
      if(currentRotation === current.length) currentRotation = 0
      current = tetriminoes[random][currentRotation]
      draw()
    }

    //Add score
    function addScore() {
      for(let i = 0; i < 199; i+=width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if(row.every(index => squares[index].classList.contains('taken'))) {
          score += 10
          scoreDisplay.innerHTML = score
          row.forEach(index => {
            squares[index].classList.remove('taken')
            squares[index].classList.remove('tetromino')
            squares[index].style.backgroundColor = ''
          })
          const squaresRemoved = squares.splice(i, width)
          squares = squaresRemoved.concat(squares)
          squares.forEach(cell => grid.appendChild(cell))
        }
      }
    }

    //Game over
    function gameOver() {
      if(current.some(index => squares[currentPostion+index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'End'
        clearInterval(timerId)
      }
    }


})