export async function showDailyWeather(data) {
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

        const iconImg = document.createElement("img");
        const iconName = data[day].icon;
        iconImg.classList.add("day-icon");
        const iconModule = await import(`./assets/weather-icons/${iconName}.svg`);
        const iconUrl = iconModule.default;
        iconImg.src = iconUrl;
        dayDiv.appendChild(iconImg);
    }
}

export async function showHourlyWeather(data) {
    const hourlyWeatherDiv = document.querySelector("#hourly-weather");
    
    // clear current contents
    hourlyWeatherDiv.textContent = '';

    // loop through all hours and add them
    // hour is just the key, not key + value
    for(let hour in data) {
        const hourDiv = document.createElement("div");
        hourDiv.setAttribute("id", `hour${hour}`);
        hourDiv.classList.add("hour");
        hourlyWeatherDiv.appendChild(hourDiv);

        const dateTime = document.createElement("p");
        dateTime.textContent = "Time: " + data[hour].datetime;
        hourDiv.appendChild(dateTime);

        const temp = document.createElement("p");
        temp.textContent = "Temperature(°F): " + data[hour].temp;
        hourDiv.appendChild(temp);

        const precipProb = document.createElement("p");
        precipProb.textContent = "Precipitation chance: " + data[hour].precipprob + "%";
        hourDiv.appendChild(precipProb);

        const iconImg = document.createElement("img");
        const iconName = data[hour].icon;
        iconImg.classList.add("day-icon");
        const iconModule = await import(`./assets/weather-icons/${iconName}.svg`);
        const iconUrl = iconModule.default;
        iconImg.src = iconUrl;
        hourDiv.appendChild(iconImg);
    }
}
