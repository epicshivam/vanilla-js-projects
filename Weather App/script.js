import { API_KEY } from "./config.js";

const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`;


const fetchWeather = async ()=> {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}



fetchWeather();