const form = document.querySelector('form');
const city = document.getElementById('city');
const icon = document.getElementById('weatherIcon');
const wea = document.getElementById('weatherStatus');
const cityName = document.getElementById('cityName');
const info = document.getElementById('info');
const temp = document.getElementById('temp');
const minMax = document.getElementById('minMax');

let weather;
//to set default data
getData("Jaipur");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let cc = city.value;
    getData(cc);
});

async function getData(cc){
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cc}&appid=f0b10a3b562e9815bc5ae2593ba76b87`;
        let response = await fetch(url);
        let data = await response.json();
        let arrData = [data];
        updateValues(arrData);

    } catch (error) {
        console.log('error');
    }
}

function updateValues(arr){
    cityName.innerHTML = `${arr[0].name}, ${arr[0].sys.country}`;

    let timezone = arr[0].timezone/3600;
    let myDate = getMyDate(timezone);
    info.innerHTML = `${day(myDate.getDay())} | ${month(myDate.getMonth())} ${myDate.getDate()} | ${hours(myDate.getHours())}:${minutes(myDate.getMinutes())} ${period(myDate)}`

    temp.innerHTML = `${(arr[0].main.temp - 273.15).toFixed(2)} <sup>o</sup>C`
    minMax.innerHTML = `Feels Like: ${(arr[0].main.feels_like - 273.15).toFixed(2)} <sup>o</sup>C | Humidity: ${(arr[0].main.humidity)}%`

    weather = arr[0].weather[0].main;
    changeIcon(weather);
    wea.innerHTML = weather.toUpperCase();
    city.value = "";
}

function changeIcon(w){
    wea.style.margin = '-12px 0 14px 0';
    if(w=="Clouds"){
        icon.src = "weather_icons/cloudy.png";
        wea.style.margin = '-12px 0 8px 0';
    }
    else if(w=="Sunny"){
        icon.src = "weather_icons/sun.png";
    }
    else if(w=="Rain"){
        icon.src = "weather_icons/raining.png";
    }
    else if(w=="Haze"){
        icon.src = "weather_icons/haze.png";
    }
    else if(w=="Snow"){
        icon.src = "weather_icons/snow.png";
    }
    else if(w=="Mist"){
        icon.src = "weather_icons/mist.png";
    }
    else if(w=="Smoke"){
        icon.src = "weather_icons/smoke.png";
    }
    else if(w=="Drizzle"){
        icon.src = "weather_icons/drizzle.png";
    }
    else if(w=="Fog"){
        icon.src = "weather_icons/fog.png";
    }
    else if(w=="Clear"){
        let myDate = new Date();
        if((myDate.getHours() >= 0 && myDate.getHours()<=6) || (myDate.getHours()>=20)){
            icon.src = "weather_icons/clear_night.png";
        }
        else{
            icon.src = "weather_icons/clear_sun.png";
        }
    }
    else{
        icon.src = "weather_icons/partially_cloudy.png";
    }
}

function day(num){
    if(num == 0){
        return "SUN";
    }
    else if(num == 1){
        return "MON";
    }
    else if(num == 2){
        return "TUE";
    }
    else if(num == 3){
        return "WED";
    }
    else if(num == 4){
        return "THU";
    }
    else if(num == 5){
        return "FRI";
    }
    else if(num == 6){
        return "SAT";
    }
    
}

function month(num){
    if(num == 0){
        return "JAN";
    }
    else if(num == 1){
        return "FEB";
    }
    else if(num == 2){
        return "MAR";
    }
    else if(num == 3){
        return "APR";
    }
    else if(num == 4){
        return "MAY";
    }
    else if(num == 5){
        return "JUN";
    }
    else if(num == 6){
        return "JUL";
    }
    else if(num == 7){
        return "AUG";
    }
    else if(num == 8){
        return "SEP";
    }
    else if(num == 9){
        return "OCT";
    }
    else if(num == 10){
        return "NOV";
    }
    else if(num == 11){
        return "DEC";
    }
}

function getMyDate(offset){
    const d = new Date();

    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    const nd = new Date(utc + (3600000*offset));

    return nd;
}

function hours(num){
    if(num > 12){
        num -= 12;
    }
    if(num<=9){
        return `0${num}`;
    }
    return num;
}

function minutes(num){
    if(num<=9){
        return `0${num}`;
    }
    return num;
}

function period(date){
    let p = "AM";
    let myDate = date;
    if(myDate.getHours() >= 12){
        p = "PM";
    }
    return p;
}

// http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=f0b10a3b562e9815bc5ae2593ba76b87
