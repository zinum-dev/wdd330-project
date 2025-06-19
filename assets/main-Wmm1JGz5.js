import{c as m,g as i}from"./utils-C5Jidw-F.js";import{g as d}from"./recipe-recommender-B8T7WsHK.js";m();document.addEventListener("DOMContentLoaded",()=>{document.querySelector("form").addEventListener("submit",function(e){e.preventDefault();const o=document.getElementById("location").value;console.log("Searching for:",o);const n=p(o);console.log(n)})});async function p(t){const e=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${t}&language=en&format=json&count=1`);console.log(e);const o=await e.text(),n=JSON.parse(o);if(console.log(n),n.results&&n.results.length>0){const c=n.results[0],a=await i({latitude:c.latitude,longitude:c.longitude});console.log(a),r(a,c.name),s(a)}return o}g();function g(){navigator.geolocation?navigator.geolocation.getCurrentPosition(f):alert("Geolocation is not supported by this browser.")}async function f(t){const e=await i({latitude:t.coords.latitude,longitude:t.coords.longitude});console.log(e),r(e,"Actual Location"),s(e)}function r(t,e){const o=document.getElementById("location_weather"),n=`
            <h2>${e}</h2>
            <div>
            <span id="temp">${Math.floor(t.current.temperature2m)}º</span>
            <img src="${t.current.icon}" alt="weather icon">
                <span>${t.current.description}</span>
                <button id="get-meal-plan" type="button">Show Plan</button>
            </div>
            `,c=`
        <div>
        <span id="temp">${Math.floor(t.current.temperature2m)}º</span>
        <img src="${t.current.icon}" alt="weather icon">
            <span>${t.current.description}</span>
            <button id="get-meal-plan" type="button">Show Plan</button>
        </div>
        `;o.innerHTML=e?n:c;const a=document.getElementById("get-meal-plan");a&&a.addEventListener("click",function(){const l=t.current.latitude,u=t.current.longitude;window.location.href=`pages/meal-plan.html?lat=${l}&lon=${u}&location=${e}`})}async function s(t){const e=await d(t.current.temperature2m),o=document.getElementById("recipes_container");o&&(o.innerHTML=e.map(n=>`
        <a href="pages/recipe.html?recipe_id=${n.id}" class="recipe-card">
            <img src="${n.imageUrl}" alt="Recipe image">
            <span>${n.name}</span>
            <span>${n.description}</span>
        </a>
    `).join(""))}
