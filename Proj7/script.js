//prztykład odpytywania na konwach 5

document.querySelector(".searchButton").addEventListener('click', FindForecast);
document.addEventListener("DOMContentLoaded", function(){
    LaunchWebsite()
});

const apiKey = '77b2473f1f828502796df1ad31f99392';
const mainSearchContainerId = "mainSearchForecast";

async function FindForecast(){
    let cityNameInput = document.querySelector('.searchInput').value;
    if (cityNameInput == '') {
        cityNameInput = 'London';
    }
    const mainSearch = document.querySelector(`#${mainSearchContainerId}`)

    const weatherData = await GetWeather(cityNameInput);

    UpdateForecast(weatherData, mainSearch); 
}

function LaunchWebsite(){
    //load main forecast
    LoadMainForecast()
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

    UpdateForecast(weatherData, newForecast); 
}

 async function GetWeather(cityName){
    const coordinates = await GetCityCoordinatesCall(cityName);
    console.log(coordinates);
    const weatherData = await GetWeatherCall(coordinates);
    weatherData.city = coordinates.name;
    console.log(weatherData);
    return weatherData;
}

async function GetCityCoordinatesCall(cityInput){
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${apiKey}`)
    const data = await response.json();
    console.log(data)
    return {name: data[0].name, lat: data[0].lat, lon: data[0].lon}
}

async function GetWeatherCall(coordinates){
    // const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,daily&appid=${apiKey}`)
    // const data = await response.json();

    const response = await fetch(`${coordinates.name}.json`)
    const data = await response.json();
    console.log(data)

    const weatherData = {
        name: coordinates.name,
        description: data.current.weather[0].description,
        iconNumber: data.current.weather[0].icon,
        tempearature: data.current.temp,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        pressure: data.current.pressure,
        time: new Date().toLocaleString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: data.timezone })
    }

    return weatherData;
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