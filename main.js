/* use for date */
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const mns = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const wkds = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thur",
  "Fri",
  "Sat",
];

/* use for quotes */
const quotes = [
  { word: "Fear: False Evidence Appearing Real.",
    name: "Unknown"},
  { word: "Forget Everything And Run or Face Everything And Rise.",
    name: "Unknown"},
  { word: "The enemy is fear. We think it is hate; but, it is fear.",
    name: "Mahatma Gandhi"},
  { word: "No man is a failure who is enjoying life.",
    name: "William Feather"},
  { word: "Things change. And friends leave. Life doesn't stop for anybody.",
    name: "Stephen Chbosky"},
  { word: "Everyone thinks of changing the world, but no one thinks of changing himself.",
    name: "Leo Tolstoy"},
  { word: "Those who cannot change their minds cannot change anything.",
    name: "George Bernard Shaw"},
  { word: "The measure of intelligence is the ability to change.",
    name: "Albert Einstein"},
  { word: "Play to your strengths. If you aren’t great at something, do more of what you’re great at.",
    name: "Jason Lemkin"},
  { word: "Things don’t have to change the world to be important.",
    name: "Steve Jobs"},
  { word: "Keep your face to the sunshine and you cannot see a shadow.",
    name: "Helen Keller"},
  { word: "There is nothing permanent except change.",
    name: "Heraclitus"},
  { word: "No one can't ride you unless your back is bent.",
    name: "Martin Luther King, Jr."},
  { word: "To improve is to change; to be perfect is to change often.",
    name: "Winston Churchill"},
  { word: "Fear is a reaction. Courage is a decision.",
    name: "Winston Churchill"}
]

/*
** * * * Modal
*/
const modal = document.querySelector('.modal')
const openModal = document.querySelectorAll('.app-container')
const closeModal = document.querySelector('.close-modal')

/* 
* * * * *Daily Weather 
*/
// openweather
const city = 'Toronto'
const apiWeather = {
  key: '78a5a8d39a27f87db26f3e09770cf822',
  baseurl: 'https://api.openweathermap.org/data/2.5/'
}
const weatherIcon = 'https://openweathermap.org/img/wn/'
// const dailyDisplay = document.querySelector('#daily')
const tempDisplay = document.querySelector('.temp-display')
// const conditionIcon = document.querySelector('.condition-icon')
const condition = document.querySelector('.condition')
// const currentDate = document.querySelector('.date')

/* 
* * * * * Display random quote 
*/
const bkgdGradient = 'linear-gradient(to bottom, rgba(145, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),'
const numItemsToGenerate = 1; 
const numImagesAvailable = 27;
const imageWidth = 480; 
const imageHeight = 480; 
const collectionID = 1627358;
const photoCreator = 'Joseph Kang'
const photoLink = 'https://unsplash.com/@pinop/collections';
let randomPhotoIndex = Math.floor(Math.random() * numImagesAvailable)
const quoteBkgd = document.querySelector('.quote')
const quoteDisplay = document.querySelector('.words')
const authorDisplay = document.querySelector('.author')
const contributor = document.querySelector('.contributor')

/* 
* * * * * Countdown timer
*/
const countdownContainer = document.querySelector('.countdown-container')
const todayDateDisplay = document.querySelector('.today')
const timerDisplay = document.querySelectorAll('.timer-format .timer-display')

window.addEventListener('load', () => {

  /* get weather */
  getWeather()

  /* display quote */
  // displayQuote()

  /* display remaining days */
  // displayToday()

  /* display Timer */
  daysRemaining()
  let countdown = setInterval(daysRemaining, 1000)

  /* modal functions */
  // openApp()
})

/* retrieve weather data from openweather */
function getWeather() {
  // get weather
  fetch(`${apiWeather.baseurl}weather?q=${city}&units=metric&appid=${apiWeather.key}`)
    .then(weather => {
      return weather.json()
    }).then(displayWeather)
}

/* display daily weather */
function displayWeather(weather) {
  tempDisplay.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;c</span><span class="hilo">Hi: ${Math.round(weather.main.temp_max)} / Lo: ${Math.round(weather.main.temp_min)}`
  condition.innerHTML = `<span class="condition-icon"><img src="${weatherIcon}${weather.weather[0].icon}@2x.png" alt="${weather.weather[0].description}"></span>${weather.weather[0].description}`
}

/* get today's date */
// function displayToday() {
//   // calculate today's info
//  const todayDate = new Date()
//   const year = todayDate.getFullYear()
//   const month = mns[todayDate.getMonth()]
//   const date = todayDate.getDate()
//   const day = wkds[todayDate.getDay()]
//   // display date
//   todayDateDisplay.textContent = `${day}, ${month} ${date} ${year}`
// }

/* calculate days remaining in 2020 */
function daysRemaining() {
  // days remained in 2020 in unit of ms
  const checkToday = new Date()
  const futureDate = new Date(2021,0,0,0,0,0)
  let timeRemained = futureDate - checkToday

  // 1 sec = 1000ms
  // 1 min = 60sec
  // 1 hr = 60min
  // 1 day = 24hr

  // calculate units in ms
  const oneDay = 24 * 60 * 60 * 1000
  const oneHr = 60 * 60 * 1000
  const oneMin = 60 * 1000 
  const oneSec = 1 * 1000
  
  // calculate remaining time in days, hours, minutes, secs
  let daysUntil = Math.floor(timeRemained / oneDay)
  let hrsUntil = Math.floor((timeRemained % oneDay) / oneHr)
  let minsUntil = Math.floor((timeRemained % oneHr) / oneMin)
  let secsUntil = Math.floor((timeRemained % oneMin) / oneSec)
  
  let timeRemain = [daysUntil, hrsUntil, minsUntil, secsUntil]
 
  function format(item) {
    if(item < 10) {
      return `0${item}`
    }
    return item
  }

  timerDisplay.forEach((until, index) => {
    until.innerHTML = format(timeRemain[index])
  })
  
  if(timeRemained < 0) {
    clearInterval(countdown)
    countdownContainer.innerHTML = `<h2>Happy 2021. Begin anew.</2>`
  }
}

/* display random quote */
function displayQuote() {
  let quotesList = quotes.length
  let randomNum = Math.floor(Math.random() * quotesList)
  let selectedQuote = quotes[randomNum].word
  let wordNum
  function WordCount(selectedQuote) { 
    wordNum = selectedQuote.split(" ").length
    return wordNum
  }
  WordCount(selectedQuote)
  console.log(wordNum)
  if(wordNum <= 9) {
    quoteDisplay.style.fontSize = 'clamp(2.8rem, 3.4vw, 4rem)'
  }
  quoteDisplay.textContent = quotes[randomNum].word
  authorDisplay.textContent = quotes[randomNum].name
}

/* fetch random unsplash */
// function fetchUnsplash(randomPhotoIndex){
//   fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomPhotoIndex}`) 
//     .then((response)=> {    
//       quoteBkgd.style.backgroundImage = `${bkgdGradient}url("${response.url}")`
//       contributor.innerHTML = `<a href="${photoLink}">${photoCreator}</a>`
//     })
// }

// fetchUnsplash()

/* listen for modal events */
openModal.forEach(app => {
  app.addEventListener('click', () => {
    modal.classList.remove('hide')
  })
})

closeModal.addEventListener('click', () => {
  modal.classList.add('hide')
})
// function openApp() {

//   openModal.forEach(app => {
//     app.addEventListener('click', () => {
//       modal.classList.add('hide')
//     })
//   })
  
//   closeModal.addEventListener('click', () => {
//     modal.classList.remove('hide')
//   })
// }
