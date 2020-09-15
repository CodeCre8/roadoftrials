//reference the questions, choices, question counter, score
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

//variables needed for the game
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//question field including a question, choices for answers, and the index for the correct answer
let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then( res => {
  return res.json();
})
.then(loadedQuestions => {
  questions = loadedQuestions.results.map( loadedQuestions => {
    const formattedQuestion = {
      question: loadedQuestions.question
    };
    const answerChoices = [...loadedQuestions.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
    answerChoices.splice(formattedQuestion.answer -1 , 0, loadedQuestions.correct_answer);
    
    answerChoices.forEach((choice, index) => {
      formattedQuestion["choice" + (index+1)] = choice;
      console.log(formattedQuestion);
    });

    return formattedQuestion;
  })
  startGame();
})
.catch( err => {
  alert(err);
});

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

//start game
startGame = () => {
  questionCounter = 0;
  score = 0;
  //using the ... a copy of the questions is made to availableQuestions
  //changes to one won't affect the other in this way
  availableQuestions = [...questions];

  getNewQuestion();

  game.classList.remove("hidden");
  loader.classList.add("hidden");
};
//get new question
getNewQuestion = () => {
  if(availableQuestions === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    //end of game
    return window.location.assign('/end.html');
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //update progress bar
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length); 
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  //get choices for the question
  choices.forEach( choice => {
    //get access to the custom attribute
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  //take out the current question from the available questions
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//listen to click event for each choice
choices.forEach( choice => {
  choice.addEventListener('click', e => {

    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if(classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout( () => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
  }, 1000);
  })
})

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}