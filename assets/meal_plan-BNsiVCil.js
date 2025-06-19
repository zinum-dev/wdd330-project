import{c as w,a as s,b as M}from"./utils-C5Jidw-F.js";import{a as T}from"./recipe-recommender-BdI_6W69.js";w();const u=s("lat"),h=s("lon"),H=s("location"),x=document.querySelector("#location");x.innerHTML=`${H}`;let y=[];console.log(u,h);D(u,h);async function D(e,t){const a=`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${t}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5`,o=await fetch(a),n=await v(o),r=document.querySelector("#meal-plan");r.innerHTML="",n.daily.time.slice(0,5).forEach(($,c)=>{const i=n.daily.temperature_2m_min[c],m=n.daily.temperature_2m_max[c],f=n.daily.weather_code[c],l=M(f),g=`.${l.icon}`,p=new Date($),d=`${p.getMonth()+1}/${p.getDate()}`;y.push({day:d,min:i,max:m});const _=L(d,g,l.description,i,m);r.innerHTML+=_}),q()}function L(e,t,a,o,n){return`<div class="weather-day">
        <span>${e}</span>
        <img src="${t}" alt="${a}" title="${a}">
        <span>Min ${o}ºC</span>
        <span>Max ${n}ºC</span>
    </div>`}function v(e){if(e.ok)return e.json();throw new Error("Bad Response")}function R(e,t){return`<a href="recipe.html?recipe_id=${e.id}" class="recipe-card">
                <img src="${e.imageUrl}" alt="Recipe image">
                <span>${t}</span>
                <span>${e.name}</span>
                <span>${e.description}</span>
            </a>`}async function q(){const e=document.querySelector("#recipe-plan");e.innerHTML="",y.forEach(async(t,a)=>{const o=await T(t.min,t.max),n=R(o,t.day);e.innerHTML+=n})}
