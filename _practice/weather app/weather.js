// openweather
const api = {
  key: '78a5a8d39a27f87db26f3e09770cf822',
  baseurl: 'https://api.openweathermap.org/data/2.5/'
}
const homeCity = 'Toronto'
const homeCountry = 'Canada'

// select elements
const searchBox = document.querySelector('.search-box')
const city = document.querySelector('.city')
const todayDate = document.querySelector('.date')
const temp = document.querySelector('.temp')
const weatherDec = document.querySelector('.weather')
// const skyconsIcon = document.querySelector('.skycon-icon')
const weatherIcon = document.querySelector('.weather-icon')
const tempHiLo = document.querySelector('.hi-low')

// on load
window.addEventListener('load', () => {

  // load default weather

  // default city
  city.textContent = `${homeCity}, ${homeCountry}`
  
  // get date
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
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date()
  const year = today.getFullYear()
  const month = months[today.getMonth()]
  const date = today.getDate()
  const day = weekdays[today.getDay()]
  todayDate.textContent = `${day}, ${date} ${month} ${year}`  

  getResult(homeCity)


  // listen for search input
  searchBox.addEventListener('keypress', setQuery);

  // enter search query
  function setQuery(e) {
    if(e.keyCode === 13) {
      getResult(searchBox.value)
    }
  }

  // get search result
  function getResult(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json()
      })
      .then(displayResult)
  }

  // display search result
  function displayResult(weather) {
  
    city.textContent = `${weather.name}, ${weather.sys.country}`
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;c</span>`
    weatherDec.textContent = `${weather.weather[0].description}`
    tempHiLo.innerHTML = `${Math.round(weather.main.temp_min)}&deg;c <span class="symbol">/</span> ${Math.round(weather.main.temp_max)}&deg;c`
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="${weather.weather[0].description}">`
  }
})

// add animated skycons - save it for later 
// function setSkycons(icon, iconID) {
//   const skycons = new Skycons({color: 'white'});
//   const currentIcon = icon.replace(/-/g, '_').toUpperCase()
//   skycons.play()
//   return skycons.set(iconID, Skycons[currentIcon])
// }

