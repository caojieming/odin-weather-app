export function showDailyWeather(data) {
    const dailyWeatherDiv = document.querySelector("#daily-weather");
    
    // clear current contents
    dailyWeatherDiv.textContent = '';

    // loop through all days and add them
    // day is just the key, not key + value
    for(let day in data) {
        const dayDiv = document.createElement("div");
        dayDiv.setAttribute("id", `day${day}`);
        dayDiv.classList.add("day");
        dailyWeatherDiv.appendChild(dayDiv);

        const dateTime = document.createElement("p");
        dateTime.textContent = "Date: " + data[day].datetime;
        dayDiv.appendChild(dateTime);

        const tempMax = document.createElement("p");
        tempMax.textContent = "High(°F): " + data[day].tempmax;
        dayDiv.appendChild(tempMax);

        const tempMin = document.createElement("p");
        tempMin.textContent = "Low(°F): " + data[day].tempmin;
        dayDiv.appendChild(tempMin);

        const precipProb = document.createElement("p");
        precipProb.textContent = "Precipitation chance: " + data[day].precipprob + "%";
        dayDiv.appendChild(precipProb);
    }
}
