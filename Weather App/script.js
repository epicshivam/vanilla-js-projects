import { API_KEY } from "./config.js";

// const url = ``;

const inputEl = document.querySelector("input");
const weatherDiv = document.querySelector('weatherResult');


inputEl.addEventListener("input", (e)=> {
    console.log(`Entered city is : ${e.target.value}`);
    fetchWeather(e.target.value);
})

const fetchWeather = async (city)=> {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.toUpperCase()}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    updateResult(data);
}


const updateResult = (data) => {
    weatherDiv.innerHTML = `
    
    <p>${data.name}</p>
    <p>${data.main.temp}</p>
    `;
}