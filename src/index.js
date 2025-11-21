const API_KEY = "2PFCUBU6CTMPS3MEZ6DGZDDRK";
const targetLocation = "london";

const getWeatherBtn = document.querySelector("#get-weather-btn");

getWeatherBtn.addEventListener("click", () => getWeatherForLoc(targetLocation));

async function getWeatherForLoc(location) {
    try {
        // response is a promise
        const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?key=" + API_KEY);
        // data waits for/obtains json data from the promise
        const data = await response.json();

        // do something with data
        const preciseLoc = data.resolvedAddress;
        const description = data.description;
        console.log(data);
        console.log("The weather for " + preciseLoc + " this week is: " + description);
    }
    catch(err) {
        console.log("Error: " + err);
    }
}
