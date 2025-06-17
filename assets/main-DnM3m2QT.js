import{c as u,g as l}from"./utils-CSkXL4Hd.js";u();document.addEventListener("DOMContentLoaded",()=>{document.querySelector("form").addEventListener("submit",function(o){o.preventDefault();const e=document.getElementById("location").value;console.log("Searching for:",e);const n=d(e);console.log(n)})});async function d(t){const o=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${t}&language=en&format=json&count=1`);console.log(o);const e=await o.text(),n=JSON.parse(e);if(console.log(n),n.results&&n.results.length>0){const c=n.results[0],a=await l({latitude:c.latitude,longitude:c.longitude});console.log(a),i(a,c.name)}return e}m();function m(){navigator.geolocation?navigator.geolocation.getCurrentPosition(g):alert("Geolocation is not supported by this browser.")}async function g(t){const o=await l({latitude:t.coords.latitude,longitude:t.coords.longitude});console.log(o),i(o)}function i(t,o){const e=document.getElementById("location_weather"),n=`
            <h2>${o}</h2>
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
        `;e.innerHTML=o?n:c;const a=document.getElementById("get-meal-plan");a&&a.addEventListener("click",function(){const s=t.current.latitude,r=t.current.longitude;window.location.href=`pages/meal-plan.html?lat=${s}&lon=${r}`})}
