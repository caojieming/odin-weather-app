const API_KEY = "2PFCUBU6CTMPS3MEZ6DGZDDRK";
const targetLocation = "london";

const getWeatherBtn = document.querySelector("#get-weather-btn");


// for reference:
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=2PFCUBU6CTMPS3MEZ6DGZDDRK


getWeatherBtn.addEventListener("click", () => getWeatherForLoc(targetLocation));

async function getWeatherForLoc(location) {
    try {
        // response is a promise
        const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?key=" + API_KEY);
        // data waits for/obtains json data from the promise
        const data = await response.json();

        // data retrieval test
        const preciseLoc = data.resolvedAddress;
        const description = data.description;
        // console.log(data);
        console.log("The weather for " + preciseLoc + " this week is: " + description);

        // next 2 weeks data (untested)
        const next2Weeks = JSON.parse(data.days);
        console.log(next2Weeks);

        // current day hourly data (untested, unsure if this works)
        const todayHourly = JSON.parse(data.days.data("0"));
        console.log(todayHourly);
        
    }
    catch(err) {
        console.log("Error: " + err);
    }
}
