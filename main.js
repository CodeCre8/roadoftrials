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
* * * * * load
*/
window.addEventListener('load', () => {

  /* get weather */
  getWeather()

  /* display quote */
  // displayQuote()

  /* get today date */
  // getTodayDate()

  /* display Timer */
  daysRemaining()

  /* modal functions */
  // openApp()
})

/* get today's date */
// function getTodayDate() {
//   // calculate today's info
//   // const today = new Date()
//   // const year = todayDate.getFullYear()
//   // const month = mns[todayDate.getMonth()]
//   // const date = todayDate.getDate()
//   // const day = wkds[todayDate.getDay()]
//   // const hr = todayDate.getHours()
//   // const min = todayDate.getMinutes()
//   // const time = todayDate.getTime()
  
//   return year
//   return month 
//   return date 
//   return day
//   return hr
//   return min
//   return time
// }

/* 
* * * * * Daily Weather 
*/
// openweather
const city = 'Toronto'
const apiWeather = {
  key: '78a5a8d39a27f87db26f3e09770cf822',
  baseurl: 'https://api.openweathermap.org/data/2.5/'
}
const weatherIcon = 'https://openweathermap.org/img/wn/'
const tempDisplay = document.querySelector('.temp-display')
const conditionIcon = document.querySelector('.condition-icon')
const hiloDisplay = document.querySelector('.hilo')
const conditionDisplay = document.querySelector('.condition')
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
  tempDisplay.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;c</span>`
  hiloDisplay.innerHTML = `Hi: ${Math.round(weather.main.temp_max)} / Lo: ${Math.round(weather.main.temp_min)}`
  conditionIcon.innerHTML = `<img src="${weatherIcon}${weather.weather[0].icon}@2x.png" alt="${weather.weather[0].description}">`
  conditionDisplay.innerHTML = `${weather.weather[0].description}`
}

/* 
* * * * * Countdown timer
*/
const countdownContainer = document.querySelector('.countdown-container')
const todayDateDisplay = document.querySelector('.today')
const timerDisplay = document.querySelectorAll('.timer-format .timer-display')
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
  
  let countdown = setInterval(daysRemaining, 1000)

  if(timeRemained < 0) {
    clearInterval(countdown)
    countdownContainer.innerHTML = `<h2>Happy 2021. Begin anew.</2>`
  }
}

/* 
* * * * * Display random quote 
*/
const bkgdGradient = 'linear-gradient(to bottom, rgba(145, 246, 252, 0.52), rgba(117, 19, 93, 0.73))'
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
authorDisplay.classList.add('add-dash')
const contributor = document.querySelector('.contributor')
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
  if(wordNum <= 9) {
    quoteDisplay.style.fontSize = 'clamp(2.8rem, 3.4vw, 4rem)'
  }
  quoteDisplay.textContent = quotes[randomNum].word
  authorDisplay.textContent = quotes[randomNum].name

  fetchUnsplash()
}
/* fetch random unsplash */
function fetchUnsplash(randomPhotoIndex){
  fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomPhotoIndex}`) 
    .then((response)=> {    
      quoteBkgd.style.backgroundImage = `${bkgdGradient}url("${response.url}")`
      contributor.innerHTML = `Photo by <a href="${photoLink}">${photoCreator}</a> on <a href="https://unsplash.com/" targat="_blank">unsplash</a>`
    })
}

/* 
* * * * * Note App
*/
const noteApp = document.getElementById('note box-8')
const noteClose = document.querySelector('#note-close')
const noteModal = document.querySelector('#note-modal')
const noteContainer = document.querySelector('.modal-container')
/* listen to all clickable events */
noteApp.addEventListener('click', () => {
  noteModal.classList.remove('hide')
  noteAppDom()
})
noteClose.addEventListener('click', () => {
  noteModal.classList.add('hide')
  noteContainer.innerHTML = "";
})
/* build app DOM */
function noteAppDom() {

  // These are the common elements shared by other app DOM
  const modalContent = document.createElement('div')
  modalContent.classList.add('modal-content', 'note-modal')
  const projectTitle = document.createElement('h4')
  projectTitle.textContent = 'A Note Keeping Project'
  projectTitle.classList.add('this-project')
  const projectInfo = document.createElement('p')
  projectInfo.textContent = 'This is a modified version of the "Diary Project" on Scrimba. The basic functions are in place. Next stage is to make it better by adding delete and filter functions.'
  projectInfo.classList.add('about-this-project')
  const appArea = document.createElement('div')
  appArea.classList.add('app-area')
  const appHeader = document.createElement('div')
  appHeader.classList.add('app-header', 'note-header')
  const appTitle = document.createElement('h3')
  appTitle.textContent = 'Knowledge Vault'
  appTitle.classList.add('this-app-title', 'note-title')
  const appMain = document.createElement('div')
  appMain.classList.add('app-Main')
  

  // These are elements distinct for Note App 
  // form
  const appForm = `<form id="entry-form">
  <textarea name="note-input" id="note-input" cols="30" rows="3" placeholder="Write away..." ></textarea>
  <button id="note-submit" class="btn" type="sumbit">Submit</button>
</form>`
  // expand all btn
  const expandAllBtn = `<div class="expand-btn opacity-0"><h5>Expand All</h5></div>`
  // entreies area
  const entriesDiv = `<div class="entries-area"><div class="entries-list"></div></div>`

  appHeader.innerHTML = `${appForm}${expandAllBtn}`
  appHeader.prepend(appTitle)
  appMain.innerHTML = `${entriesDiv}`
  
  appArea.append(appHeader, appMain)
  modalContent.append(projectTitle, projectInfo, appArea)
  noteContainer.prepend(modalContent)
  
  noteAppFun()
}

function noteAppFun() {
  /* select note HTML element */
  const noteInput = document.querySelector('#note-input')
  const noteSubmit = document.querySelector('#note-submit')
  const expandBtn = document.querySelector('.expand-btn')
  const entriesDisplay = document.querySelector('.entries-list')
  let entries = []
  let entryNum = 0

  /* listen for click on expand all btn */
  // const expandBtn = document.querySelector('.expand-btn')
  expandBtn.addEventListener('click', () => {

    let btnState = expandBtn.innerHTML
    if(btnState === '<h5>Expand All</h5>') {
      console.log(expandBtn.innerHTML)
      openAll()
    }
    if(btnState === '<h5>Close All</h5>') {
      console.log(expandBtn.innerHTML)
      closeAll()
    }
  })
  /* listen to note submit btn click */
  noteSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    if(noteInput.value === '') {
      noteInput.value = 'You can\'t enter an empty thought. Type away 😊'
    } else {
      entryNum++
      createNote()
      noteInput.value = ""
    }
  })
  /* create new note entry */
  function createNote() {

    //get current date and time
    const todayDate = new Date()
    const year = todayDate.getFullYear()
    const month = mns[todayDate.getMonth()]
    const date = todayDate.getDate()
    const day = wkds[todayDate.getDay()]
    const hr = todayDate.getHours()
    const min = todayDate.getMinutes()
    let timestamp = todayDate.getTime()

  //create new entry
    let entry = {
      order: entryNum,
      date: `${day}, ${month} ${date} ${year}`,
      hour: hr,
      min: min,
      timestamp: `${timestamp}`,
      words: `${noteInput.value}`
    }

    // add new entry to entries array
    entries.push(entry)

    // create DOM for entry
    const newNoteHeader = document.createElement('div')
    const noteIndex = document.createElement('div')
    const noteDate = document.createElement('div')
    const noteOpenBtn = document.createElement('div')
    const newNote = document.createElement('div')
    const noteEntry = document.createElement('p')
    
    // add expand all btn if there is any entry 
    if(entries.length !== 0) {
      expandBtn.classList.remove('opacity-0')
    }

  // Check if min is single digit
    let x = entry.min.toString()
  // Add 0 in front of days with one digit
    if(x.length < 2) {
      entry.min = `0${entry.min}`
    }

    newNoteHeader.classList.add('entry-header')
    noteIndex.textContent = entry.order
    noteDate.classList.add('note-date')
    noteDate.textContent =`${entry.date} ${entry.hour}:${entry.min}`
    noteOpenBtn.classList.add('note-open-close')
    noteOpenBtn.innerHTML = '<i class="fa fa-angle-double-down"></i>'
    newNote.classList.add(`note-${entryNum}`)
    newNote.classList.add('entry')
    newNote.classList.add('collapse-height')
    noteEntry.textContent = entry.words

    newNoteHeader.append(noteIndex, noteDate, noteOpenBtn)
    newNote.append(newNoteHeader, noteEntry)
    entriesDisplay.prepend(newNote)

    /* Add event listening to the single entry button */
    noteOpenBtn.addEventListener('click', (e) => {
      const listItem = e.target.parentNode.parentNode.parentNode
      listItem.classList.toggle('collapse-height')
    })
  }
  function openAll() {
    expandBtn.innerHTML = '<h5>Close All</h5>'
    let allEntries = document.querySelectorAll('.entry')
    allEntries.forEach(list => {
      list.classList.remove('collapse-height')
    })
  }
  function closeAll() {
    expandBtn.innerHTML = '<h5>Expand All</h5>'
    let allEntries = document.querySelectorAll('.entry')
    allEntries.forEach(list => {
      list.classList.add('collapse-height')
    })
  }
}



/*
* * * * * Modal
*/
// const modal = document.querySelector('.modal')
// const openModal = document.querySelectorAll('.app-container')
// const closeModal = document.querySelector('.close-modal')
/* listen for modal events */
// function openApp() {
//   openModal.forEach(app => {
//     app.addEventListener('click', () => {
//       modal.classList.remove('hide')
//     })
//   })
  
//   closeModal.addEventListener('click', () => {
//     modal.classList.add('hide')
//   })
// }

