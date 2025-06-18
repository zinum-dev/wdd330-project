import{c as w,a as i,b as M}from"./utils-C5Jidw-F.js";w();const d=i("lat"),u=i("lon"),T=i("location"),v=document.querySelector("#location");v.innerHTML=`${T}`;let _=[];console.log(d,u);H(d,u);async function H(e,t){const n=`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${t}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5`,a=await fetch(n),o=await L(a),c=document.querySelector("#meal-plan");c.innerHTML="",o.daily.time.slice(0,5).forEach((r,s)=>{const h=o.daily.temperature_2m_min[s],g=o.daily.temperature_2m_max[s],y=o.daily.weather_code[s],p=M(y),$=`.${p.icon}`,l=new Date(r),m=`${l.getMonth()+1}/${l.getDate()}`;_.push(m);const f=D(m,$,p.description,h,g);c.innerHTML+=f}),q()}function D(e,t,n,a,o){return`<div class="weather-day">
        <span>${e}</span>
        <img src="${t}" alt="${n}" title="${n}">
        <span>Min ${a}ºC</span>
        <span>Max ${o}ºC</span>
    </div>`}function L(e){if(e.ok)return e.json();throw new Error("Bad Response")}function x(e,t,n,a){return`<div class="recipe-card">
                <img src="${t}" alt="Recipe image">
                <span>${e}</span>
                <span>${n}</span>
                <span>${a}</span>
            </div>`}async function q(){const e=document.querySelector("#recipe-plan");e.innerHTML="",_.forEach((t,n)=>{const r=x(t,"./images/nutrition.png","Recipe","Descrição");e.innerHTML+=r})}
