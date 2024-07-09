const app=document.querySelector(".weather_app");
const temp=document.querySelector('.temp');
const dateOutput=document.querySelector(".date");
const timeOutput=document.querySelector(".time");
const conditionOutput=document.querySelector(".condition");
const nameOutput=document.querySelector(".name");
const icon=document.querySelector(".icon");
const cloudOutput=document.querySelector(".cloud");
const humidityOutput=document.querySelector(".humidity");
const windOutput=document.querySelector(".wind");
const form=document.getElementById("locationInput");
const search=document.querySelector(".search");
const btn=document.querySelector(".submit");
const cities=document.querySelectorAll(".city");

let cityInput="London";

cities.forEach((city) =>{
    city.addEventListener('click', (e) =>{
        cityInput=e.target.innerHTML;

        fetchWeatherData(cityInput);

        app.style.opacity="1";
    })
})

form.addEventListener('submit', (e)=>{
    if(search.value.length==0){
        alert("Please enter a city name");
    }
    else{
        cityInput=search.value;

        fetchWeatherData(cityInput);

        search.value="";

        app.style.opacity="0";
    }

    e.preventDefault();
})

function dayOfTheWeek(year,month,day){
    const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekday[new Date(`${year}/${month}/${day}`).getDay()];
}

function fetchWeatherData(cityInput){
    fetch(`https://api.weatherapi.com/v1/current.json?key=fc07bcdce45c4b8a8d3211322240607&q=${cityInput}`)

    .then(response => response.json())
    .then(data=>{
        console.log(data);

        temp.innerHTML = data.current.temp_c+ "&#176;";
        conditionOutput.innerHTML=data.current.condition.text;

        const date= data.location.localtime;
        const y=parseInt(date.substr(0,4));
        const m=parseInt(date.substr(5,7));
        const d=parseInt(date.substr(8,10));
        const time=date.substr(11);

        dateOutput.innerHTML=`${dayOfTheWeek(y,m,d)} ${d}, ${m} ${y}`;
        timeOutput.innerHTML=time;

        nameOutput.innerHTML=data.location.name;

        const iconId=data.current.condition.icon;
        icon.src=iconId;

        cloudOutput.innerHTML= data.current.cloud + "%";
        humidityOutput.innerHTML=data.current.humidity+ "%";
        windOutput.innerHTML=data.current.wind_kph+ "km/h";

        let timeOfDay="day";
        const code=data.current.condition.code;

        if(!data.current.is_day){
            timeOfDay="night";
        }

        if(code==1000){
            app.style.backgroundImage=`url(images/${timeOfDay}/clear.jpg)`;

            btn.style.background="#e5ba92";
            if(timeOfDay=="night"){
                btn.style.background="#181e27";
            }

            app.style.opacity="1";
        }

        else if(code==1003 || code==1006 || code==1009 || code==1030 || code==1069 || code==1087 || code==1135 || code==1273 || code==1276 || code==1279 || code==1282){
            app.style.backgroundImage=`url(images/${timeOfDay}/cloudy.jpg)`;
            btn.style.background="#fa6d1b";
            if(timeOfDay=="night"){
                btn.style.background="#181e27";
            }

            app.style.opacity="1";
        }

        else if(code==1063 || code==1069 || code==1072 || code==1150 || code==1153 || code==1180 || code==1183 || code==1186 || code==1189 || code==1192 || code==1195 || code==1204 || code==1207 || code==1240 || code==1243 || code==1246 || code==1249 || code==1252){
            app.style.backgroundImage=`url(images/${timeOfDay}/rainy.jpg)`;

            btn.style.background="#647d75";

            if(timeOfDay=="night"){
                btn.style.background="#325c80";
            }         
            
            app.style.opacity="1";
        }

        else{
            app.style.backgroundImage=`url(images/${timeOfDay}/snowy.jpg)`;

            btn.style.background="#4d72aa";
            if(timeOfDay=="night"){
                btn.style.background="#1b1b1b";
            }

            app.style.opacity="1";
        }        
    })

    .catch(() =>{
        alert("City not found, please try again");
        app.style.opacity="1";
    })
}

fetchWeatherData(cityInput);

app.style.opacity="1";
