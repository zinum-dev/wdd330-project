import { fetchWeatherApi } from 'openmeteo';

function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}

async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

async function injectTemplate(path, selector) {
    const template = await loadTemplate(path);
    const element = document.querySelector(selector);
    renderWithTemplate(template, element);
}

export async function commomHeaderFooter() {
    await injectTemplate("/wdd330-project/common/header.html", "#common-header");
    await injectTemplate("/wdd330-project/common/footer.html", "#common-footer");
    menuButton();
}

function menuButton() {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}

export const WMO_CODES = {
    0: wmoInterpretation('Clear', 'airy/clear@4x.png'),

    1: wmoInterpretation('Mainly Clear', 'airy/mostly-clear@4x.png'),
    2: wmoInterpretation('Partly Cloudy', 'airy/partly-cloudy@4x.png'),
    3: wmoInterpretation('Overcast', 'airy/overcast@4x.png'),

    45: wmoInterpretation('Fog', 'airy/fog@4x.png'),
    48: wmoInterpretation('Icy Fog', 'airy/rime-fog@4x.png'),

    51: wmoInterpretation('Light Drizzle', 'airy/light-drizzle@4x.png'),
    53: wmoInterpretation('Moderate Drizzle', 'airy/moderate-drizzle@4x.png'),
    55: wmoInterpretation('Heavy Drizzle', 'airy/dense-drizzle@4x.png'),

    56: wmoInterpretation('Light Freezing Drizzle', 'airy/light-freezing-drizzle@4x.png'),
    57: wmoInterpretation('Heavy Freezing Drizzle', 'airy/dense-freezing-drizzle@4x.png'),

    61: wmoInterpretation('Slight Rain', 'airy/light-rain@4x.png'),
    63: wmoInterpretation('Moderate Rain', 'airy/moderate-rain@4x.png'),
    65: wmoInterpretation('Heavy Rain', 'airy/heavy-rain@4x.png'),

    66: wmoInterpretation('Light Freezing Rain', 'airy/light-freezing-rain@4x.png'),
    67: wmoInterpretation('Heavy Freezing Rain', 'airy/heavy-freezing-rain@4x.png'),

    71: wmoInterpretation('Slight Snow', 'airy/slight-snowfall@4x.png'),
    73: wmoInterpretation('Moderate Snow', 'airy/moderate-snowfall@4x.png'),
    75: wmoInterpretation('Heavy Snow', 'airy/heavy-snowfall@4x.png'),

    77: wmoInterpretation('Snow Grains', 'airy/snowflake@4x.png'),

    80: wmoInterpretation('Slight Rain Showers', 'airy/light-rain@4x.png'),
    81: wmoInterpretation('Moderate Rain Showers', 'airy/moderate-rain@4x.png'),
    82: wmoInterpretation('Heavy Rain Showers', 'airy/heavy-rain@4x.png'),

    85: wmoInterpretation('Slight Snow Showers', 'airy/slight-snowfall@4x.png'),
    86: wmoInterpretation('Heavy Snow Showers', 'airy/heavy-snowfall@4x.png'),

    95: wmoInterpretation('Thunderstorm', 'airy/thunderstorm@4x.png'),

    96: wmoInterpretation('Thunderstorm with Light Hail', 'airy/thunderstorm-with-hail@4x.png'),
    99: wmoInterpretation('Thunderstorm with Heavy Hail', 'airy/thunderstorm-with-hail@4x.png')
};

function wmoInterpretation(description, icon) {
    return {
        description,
        icon
    };
}

// Returns { description, iconPath } for a given weather code
export function getWeatherDescriptionAndIcon(code) {
    const entry = WMO_CODES[code];
    if (entry) {
        return wmoInterpretation(entry.description, `./images/${entry.icon}`);
    }
    // Default fallback
    return {
        description: "Unknown",
        iconPath: "images/condition_icon/unknown.png"
    };
}


export async function getWeaher(position) {
    const params = {
        "latitude": position.latitude,
        "longitude": position.longitude,
        "current": ["temperature_2m", "weather_code"]
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current();

    const desc_icon = getWeatherDescriptionAndIcon(current.variables(1).value())

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0).value(),
            weatherCode: current.variables(1).value(),
            description: desc_icon.description,
            icon: desc_icon.icon,
            latitude: position.latitude,
            longitude: position.longitude,
        },
    };

    return weatherData
}


// get the product id from the query string
export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get(param);
    return product;
}