const key = "9d94f3408422029a3ffeb83ae132bf98";
const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`


const fetchWeather = async ()=> {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}



fetchWeather();