import "./styles.css";
import { showDailyWeather, showHourlyWeather } from "./view";

const API_KEY = "2PFCUBU6CTMPS3MEZ6DGZDDRK";

const weatherBtn = document.querySelector("#weather-btn");


// for reference of json data:
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=2PFCUBU6CTMPS3MEZ6DGZDDRK

/* 
Possible todos:
- once the sandworm malware issue has passed, import date-fns to convert the ugly dates/times into something nicer
- clicking specific days brings up the hourly info of that day
*/


weatherBtn.addEventListener("click", getWeatherForLoc);

async function getWeatherForLoc() {
    // unhide message and daily/hourly title sections
    const msg = document.querySelector("#msg");
    msg.style.display = "block";
    const dailyTitle = document.querySelector("#daily-title");
    dailyTitle.style.display = "block";
    const hourlyTitle = document.querySelector("#hourly-title");
    hourlyTitle.style.display = "block";

    // get target location from input
    const location = document.querySelector("#weather-input").value;

    if(location === "") {
        msg.textContent = "Please input a location.";
        return;
    }

    // error code storage
    let errCode = 0;

    try {
        // response is a promise
        const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?key=" + API_KEY);
        errCode = response.status;
        // data waits for/obtains json data from the promise
        const data = await response.json();
        // console.log(data);

        // general data retrieval details
        const preciseLoc = data.resolvedAddress;
        const description = data.description;
        msg.textContent = "The weather for " + preciseLoc + " this week is: " + description;

        // next 2 weeks data
        // const next2Weeks = JSON.parse(data.days);
        const next2Weeks = data.days;
        showDailyWeather(next2Weeks);

        // current day hourly data
        const todayHourly = data.days["0"].hours;
        showHourlyWeather(todayHourly);
    }
    catch(err) {
        console.log("getWeatherForLoc() failed, error: " + err);
        console.log("Error code: " + errCode);

        msg.textContent = errCodeToMsg(errCode);

        const dailyWeatherDiv = document.querySelector("#daily-weather");
        dailyWeatherDiv.textContent = '';
    }
}

// helper function
function errCodeToMsg(code) {
    let msg = "";
    switch(code) {
        case 200:
            msg = "Success??? How did you get here!?";
            break;
        case 400:
            msg = "Invalid location, please make sure you typed in your location correctly.";
            break;
        case 401:
            msg = "Your API key is invalid. Either you mis-typed it or it's disabled.";
            break;
        case 429:
            msg = "You've run out of get requests for your API key!";
            break;
        case 500:
            msg = "There was a server-end issue, please try again later.";
            break;
        default:
            msg = "Unknown error, please check the console.";
    }

    return msg;
}
