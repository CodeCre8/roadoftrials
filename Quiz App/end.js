const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
//when loading end page, retrieve most recent score from localstorage
const mostRecentScore = localStorage.getItem('mostRecentScore');
//update most recent score
finalScore.innerText = mostRecentScore;
//create an array to store high scores
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 5;

username.addEventListener( 'keyup', () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };
  //only keep the highest 5 scores
  highScores.push(score);
  //put b before a if b is greater a
  highScores.sort( (a,b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem('highScores', JSON.stringify(highScores));

  resetUsername();
};

//reset username input
const resetUsername = () => {
  username.value = " ";
  window.location.assign("/");
}


