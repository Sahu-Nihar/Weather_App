let appId = 'd1442672cbefc140773a6c6783e71bfe';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm){
  //checking if search term is 5 and every element in searchTerm is a number then its a zip code.
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
      searchMethod = 'zip';
    else
      searchMethod = 'q';
}

function searchWeather(searchTerm){
  getSearchMethod(searchTerm);
  //fetch () goes and calls the api which returns a json of all details needed for weather app.
  fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
    return result.json();//we are waiting for server for information and converting it to json.
  }).then(result => {
    init(result);//after converting to json we are calling init with the result from server.
  })

}

function init(resultFromServer){
  switch (resultFromServer.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = 'url("images/clear.jpg")';
      break;

    case 'Clouds':
      document.body.style.backgroundImage = 'url("images/cloudy.jpg")';
      break;

    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = 'url("images/rain.jpg")';
      break;

    case 'Thunderstorm':
      document.body.style.backgroundImage = 'url("images/storm.jpg")';
      break;

    case 'Snow':
      document.body.style.backgroundImage = 'url("images/snow.jpg")';
      break;

    default:
      document.body.style.backgroundImage = 'url("default.jpg")';
      break;
  }

  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let temperatureElement = document.getElementById('temperature');
  let humidityElement = document.getElementById('humidity');
  let windElement = document.getElementById('windSpeed');
  let cityHeader = document.getElementById('cityHeader');
  let weatherIcon = document.getElementById('documentIconImg');

  weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

  let resultDescription = resultFromServer.weather[0].description;

  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
  windElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML = 'Humidity Levels at ' + resultFromServer.main.humidity + ' %';

  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
  let weatherContainer = document.getElementById('weatherContainer');
  let weatherContainerHeight = weatherContainer.clientHeigth;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left =  `calc(50% - ${weatherContainerWidth/2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`;
  weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
  let searchTerm = document.getElementById('searchInput').value;
  if(searchTerm)
    searchWeather(searchTerm);
})
