import { API_KEY } from "./config.js";

const inputEl = document.querySelector("input");
const weatherDiv = document.querySelector('.weatherResult');
const searchIcon = document.querySelector("#searchIcon");

searchIcon.addEventListener("click", (e) => {
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
     if (data.cod !== 200) {
        weatherDiv.innerHTML = `<p>${data.message}</p>`;
        return;
    }
    weatherDiv.innerHTML = `
    
    <p>${data.name}</p>
    <p>${data.main.temp}</p>
    <p>${data.weather[0].description}</p>
    `;
}