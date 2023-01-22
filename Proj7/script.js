//prztykład odpytywania na konwach 5

document.querySelector(".searchButton").addEventListener('click', FindForecast);
document.addEventListener("DOMContentLoaded", function(){
    LaunchWebsite()
});
const opwApiKey = "50d53005c0fd5f556bb4ef15224c4209";
const mainSearchContainerId = "mainSearchForecast";

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      FindForecast();
    }
  });

async function FindForecast(){
    let cityNameInput = document.querySelector('.searchInput').value;
    if (cityNameInput == '') {
        cityNameInput = 'London';
    }
    const mainSearch = document.querySelector(`#${mainSearchContainerId}`)

    const weatherData = await GetWeather(cityNameInput);
    
    UpdateForecast(weatherData, mainSearch); 
    LoadPreviousForecast()
}

function LaunchWebsite(){
    LoadMainForecast()
    LoadPreviousForecast()
}

async function LoadMainForecast(){
    let cityNameInput = document.querySelector('.searchInput').value;
    if (cityNameInput == '') {
        cityNameInput = 'London';
    }
    
    const weatherData = await GetWeather(cityNameInput);

    const egzampleForecast = document.querySelector('#egzampleForecast')
    const newForecast = egzampleForecast.cloneNode(true);
    newForecast.setAttribute('id', mainSearchContainerId );

    const currentSearchContent = document.querySelector(".currentSearchContent");
    currentSearchContent.appendChild(newForecast);

    UpdateForecast(await weatherData, newForecast); 
}

async function LoadPreviousForecast(){
    const cities = GetAllFromLocalStorage();
    console.log(GetAllFromLocalStorage());

    const savedSearchContent = document.querySelector(".savedSearchContend");
    while (savedSearchContent.firstChild) {
        savedSearchContent.removeChild(savedSearchContent.firstChild);
    }

    for (let index = cities.length-2; index >= 0; index--) {
        const element = cities[index];
        console.log(element);

        const weatherData = await GetWeather(element);

        const egzampleForecast = document.querySelector('#egzampleForecast')
        const newForecast = egzampleForecast.cloneNode(true);
        newForecast.setAttribute('id', `previousForecast-${index}` );

        
        savedSearchContent.appendChild(newForecast);

        UpdateForecast(await weatherData, newForecast); 
    }
}

function GetWeather(cityName){
    const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${opwApiKey}&units=metric`;
    const weather = fetch(openWeatherUrl);

    return weather
      .then((respObject) => {
        return respObject.json();
      })
      .then((pogoda) => {
        const weatherData = {
            name: pogoda.name,
            description: pogoda.weather[0].description,
            iconNumber: pogoda.weather[0].icon,
            tempearature: pogoda.main.temp,
            humidity: pogoda.main.humidity,
            windSpeed: pogoda.wind.speed,
            pressure: pogoda.main.pressure,
            time: GetCityTime(pogoda.timezone)
        }
        AddToLocalStorage(pogoda.name);
        return weatherData
      })
      .catch((e) => {
        console.error("Catched exception: ", e);
      })
}

function GetCityTime(offset){
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (1000*offset));
    return nd.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false});
}

function UpdateForecast(weatherData, element){
    element.querySelector(".weatherCityName").textContent = weatherData.name;
    element.querySelector(".weatherHour").textContent = weatherData.time;
    element.querySelector(".weatherspecificationSection .tempAndIconContainer H4").textContent = `${weatherData.tempearature}°C`;
    element.querySelector(".weatherspecificationSection .tempAndIconContainer img").src = `icons/${weatherData.iconNumber}.png`;
    element.querySelector(".humidityContainer p").textContent = `${weatherData.humidity}%`;
    element.querySelector(".pressureContainer p").textContent = `${weatherData.pressure}pha`;
    element.querySelector(".windContainer p").textContent = `${weatherData.windSpeed} km/h`;
}

function GetAllFromLocalStorage(){
    const cityNames = JSON.parse(localStorage.getItem('cityNames'));
        if (cityNames == null) {
            return []
        }
        return cityNames
}

function AddToLocalStorage(cityName){
    const cityNames = GetAllFromLocalStorage()
    if(!cityNames.includes(cityName.toLowerCase() )){
        if (cityNames.length >= 4){
            cityNames.shift();
        }
        cityNames.push(cityName.toLowerCase() )
        localStorage.setItem("cityNames", JSON.stringify(cityNames))
    }
}