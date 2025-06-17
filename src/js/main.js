import { commomHeaderFooter, getWeaher } from "./utils.mjs";


commomHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents page reload
        const location = document.getElementById("location").value;
        // Do something with the location, for example:
        console.log("Searching for:", location);

        // You can call a function here to fetch weather, etc.
        const locations = getLocations(location)
        console.log(locations)
    });
});

async function getLocations(location) {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&language=en&format=json&count=1`);
    console.log(res)
    const locations = await res.text();
    const locationsJson = JSON.parse(locations);
    console.log(locationsJson);
    if (locationsJson.results && locationsJson.results.length > 0) {
        const loc = locationsJson.results[0];

        const weatherData = await getWeaher({
            "latitude": loc.latitude,
            "longitude": loc.longitude,
        });
        console.log(weatherData);
        setLocationWeatherData(weatherData, loc.name);
    }
    return locations
}

getLocation()

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(weather);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function weather(position) {
    const weatherData = await getWeaher({
        "latitude": position.coords.latitude,
        "longitude": position.coords.longitude,
    });
    console.log(weatherData);
    setLocationWeatherData(weatherData, "Rio de Janeiro");
}


function setLocationWeatherData(weatherData, location) {
    const location_weather = document.getElementById("location_weather")
    const template_location = `
            <h2>${location}</h2>
            <div>
            <span id="temp">${Math.floor(weatherData.current.temperature2m)}º</span>
            <img src="${weatherData.current.icon}" alt="weather icon">
                <span>${weatherData.current.description}</span>
            </div>`;
    const template = `
        <div>
        <span id="temp">${Math.floor(weatherData.current.temperature2m)}º</span>
        <img src="${weatherData.current.icon}" alt="weather icon">
            <span>${weatherData.current.description}</span>
        </div>`;
    console.log("add new location info")
    location_weather.innerHTML = location ? template_location : template;
}








