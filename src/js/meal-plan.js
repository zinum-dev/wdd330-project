import { commomHeaderFooter, getParam, getWeatherDescriptionAndIcon } from "./utils.mjs";


commomHeaderFooter();

const lat = getParam("lat")
const lon = getParam("lon")
const location = getParam("location")
const location_element = document.querySelector('#location');
location_element.innerHTML = `${location}`;

let days = []

console.log(lat, lon)

get5dayweather(lat, lon)

async function get5dayweather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5`;
    const response = await fetch(url);
    const data = await convertToJson(response);
    const container = document.querySelector('#meal-plan');
    container.innerHTML = ""; // Clear previous content

    data.daily.time.slice(0, 5).forEach((day, i) => {
        const min = data.daily.temperature_2m_min[i];
        const max = data.daily.temperature_2m_max[i];
        const code = data.daily.weather_code[i];
        const desc_icon = getWeatherDescriptionAndIcon(code);
        const path_logo = `.${desc_icon.icon}`;
        // Format day as MM/DD
        const dateObj = new Date(day);
        const formattedDay = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
        days.push(formattedDay)
        const html = weatherTemplate(formattedDay, path_logo, desc_icon.description, min, max);
        container.innerHTML += html;
    });
    get5dayrecipes();
}

function weatherTemplate(day, path_logo, alt, min, max) {
    return `<div class="weather-day">
        <span>${day}</span>
        <img src="${path_logo}" alt="${alt}" title="${alt}">
        <span>Min ${min}ºC</span>
        <span>Max ${max}ºC</span>
    </div>`;
}


function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}



function recipeTemplate(recipe_id, day, path_img, recipe_name, recipe_description) {
    return `<a href="recipe.html?recipe_id=${recipe_id}" class="recipe-card">
                <img src="${path_img}" alt="Recipe image">
                <span>${day}</span>
                <span>${recipe_name}</span>
                <span>${recipe_description}</span>
            </a>`;
}



async function get5dayrecipes() {
    /*const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5`;
    const response = await fetch(url);
    const data = await convertToJson(response);
    */const container = document.querySelector('#recipe-plan');
    container.innerHTML = ""; // Clear previous content
    // Podemos usar o array days já preenchido, assumindo que ele tem os mesmos índices dos dados diários:
    days.forEach((formattedDay, i) => {
        const path_logo = "./images/nutrition.png";
        const recipe_name = "Recipe";
        const recipe_description = "Descrição";
        const html = recipeTemplate(i, formattedDay, path_logo, recipe_name, recipe_description);
        container.innerHTML += html;
    });

}