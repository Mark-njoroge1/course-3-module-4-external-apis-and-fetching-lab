// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

async function fetchWeatherData(state) {
    const url = `https://api.weather.gov/alerts/active?area=${state}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("other issue");
        }

        const data = await response.json();
        displayWeather(data, state);
    } catch (error) {
        displayError("network issue");
    }
}

function displayWeather(data, state) {
    document.getElementById('error-message').classList.add('hidden');
    const alertDisplay = document.getElementById('alerts-display');
    const count = data.features.length;
    
    alertDisplay.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = `Weather Alerts: ${count}`;
    alertDisplay.appendChild(title);

    data.features.forEach(alert => {
        const p = document.createElement('p');
        p.textContent = alert.properties.headline;
        alertDisplay.appendChild(p);
    });
}

function displayError(message) {
    const errorContainer = document.getElementById('error-message'); 
    const alertDisplay = document.getElementById('alerts-display');
    
    alertDisplay.innerHTML = '';
    errorContainer.textContent = message;
    errorContainer.classList.remove('hidden');
}

const searchButton= document.getElementById('fetch-alerts');
const stateInput = document.getElementById('state-input');

searchButton.addEventListener('click', () => {
    const state = stateInput.value.trim().toUpperCase();
    stateInput.value = '';
    
    if (state.length !== 2) {
        displayError("Please enter a valid 2-letter state abbreviation.");
        return;
    }

    fetchWeatherData(state);
    stateInput.value = ''; 
});