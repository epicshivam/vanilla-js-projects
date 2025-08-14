import { API_KEY } from "./config.js";

const inputEl = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = inputEl.value.trim().toUpperCase();
    if (city) fetchWeather(city);
});


inputEl.addEventListener("keypress", (e)=> {
    if(e.key==="Enter"){
        e.preventDefault();
        console.log(`Entered city is : ${e.target.value}`);
        fetchWeather(e.target.value);
    }
})

const fetchWeather = async (city)=> {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.toUpperCase()}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    console.log(data);
    updateResult(data);
}


const updateResult = (data) => {
     if (data.cod === '404') {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    } else {
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";

        if(data.weather[0].main == "Clouds") {
            document.querySelector(".weather-icon").src = "images/clouds.png";
        } else if(data.weather[0].main == "Clear") {
            document.querySelector(".weather-icon").src = "images/clear.png";
        } else if(data.weather[0].main == "Drizzle") {
            document.querySelector(".weather-icon").src = "images/drizzle.png";
        } else if(data.weather[0].main == "Mist") {
            document.querySelector(".weather-icon").src = "images/mist.png";
        } else if(data.weather[0].main == "Rain") {
            document.querySelector(".weather-icon").src = "images/rain.png";
        } else {
            document.querySelector(".weather-icon").src = "images/snow.png";
        } 

        document.querySelector(".weather").style.display = "block";
    }

}