import "./styles.css";
import { showDailyWeather } from "./view";

const API_KEY = "2PFCUBU6CTMPS3MEZ6DGZDDRK";

const weatherBtn = document.querySelector("#weather-btn");


// for reference of json data:
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=2PFCUBU6CTMPS3MEZ6DGZDDRK

/* 
Todo:
- make daily styling a bit better (solid backgrounds for easier reading)
- add weather icons?
*/


weatherBtn.addEventListener("click", getWeatherForLoc);

async function getWeatherForLoc() {
    try {
        // get target location from input
        const location = document.querySelector("#weather-input").value;

        // response is a promise
        const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?key=" + API_KEY);
        // data waits for/obtains json data from the promise
        const data = await response.json();

        // data retrieval test
        const preciseLoc = data.resolvedAddress;
        const description = data.description;
        console.log(data);
        console.log("The weather for " + preciseLoc + " this week is: " + description);

        // next 2 weeks data
        // const next2Weeks = JSON.parse(data.days);
        const next2Weeks = data.days;
        console.log(next2Weeks);
        showDailyWeather(next2Weeks);

        // // current day hourly data
        // const todayHourly = data.days["0"].hours;
        // console.log(todayHourly);
        
    }
    catch(err) {
        console.log("getWeatherForLoc() failed, error: " + err);
    }
}
