async function fetchMemberData() {
    try {
        const response = await fetch('members.json'); 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching member data:', error);
        return [];
    }
}

async function displaySpotlights() {
    const membersJson = await fetchMemberData();

    const filteredMembers = membersJson.filter(member => 
        member.membership_level === 'gold' || member.membership_level === 'silver'
    );

    const randomMembers = [];
    while (randomMembers.length < 3 && filteredMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredMembers.length);
        randomMembers.push(filteredMembers.splice(randomIndex, 1)[0]);
    }

    const spotlightContainer = document.getElementById('company-spotlights');
    spotlightContainer.innerHTML = ''; 
    randomMembers.forEach(member => {
        const spotlightHtml = `
            <div class="spotlight">
                <h3>${member.company_name}</h3>
                <img src="${member.logo}" alt="${member.company_name} Logo" width="100" loading="lazy">
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Membership Level:</strong> ${member.membership_level.charAt(0).toUpperCase() + member.membership_level.slice(1)}</p>
            </div>
        `;
        spotlightContainer.innerHTML += spotlightHtml;
    });
}

async function getWeather() {
    const apiKey = 'your_openweathermap_api_key'; 
    const city = 'San Miguel'; 

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        // Check if the response is valid
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        
        const weatherData = await response.json();

        // Ensure weather data is valid before accessing
        if (!weatherData.main || !weatherData.main.temp) {
            throw new Error('Temperature data is missing');
        }

        const weatherInfo = document.getElementById('weather-info');
        const currentTemp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;

        weatherInfo.innerHTML = `
            Current Temperature: ${currentTemp}°C
            <br>Weather: ${weatherDescription}
        `;

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = '<h3>3-Day Forecast:</h3>';

        forecastData.list.slice(0, 3).forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const temp = forecast.main.temp;
            const description = forecast.weather[0].description;
            forecastContainer.innerHTML += `
                <div class="forecast-item">
                    <p>${date.toLocaleDateString()}</p>
                    <p>${temp}°C - ${description}</p>
                </div>
            `;
        });

    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = 'Unable to load weather data.';
    }
}

// MutationObserver example to replace deprecated mutation events
const element = document.getElementById('company-spotlights');
const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('Child nodes have been added or removed.');
        }
    }
});

const config = { childList: true, subtree: true };
observer.observe(element, config);

displaySpotlights();
getWeather();