

function getWeatherIconBoxShadow(iconCode) {
    switch (iconCode) {
        case '01d':
        case '01n':
            return 'rgba(255, 255, 0, 0.1) 0 0 0 4px'; // Sun
        case '02d':
        case '02n':
            return 'rgba(255, 255, 0, 0.1) 0 0 0 4px'; // Half Sunny
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            // Update the box-shadow
            return '24px -6px 0 2px, 10px 5px 0 5px, 30px 5px 0 2px, 11px -8px 0 -3px, 25px 11px 0 -1px'; // Cloud
        case '09d':
        case '09n':
        case '10d':
        case '10n':
            return '8px 0px, 32px -6px, 20px 0px'; // Rain
        case '13d':
        case '13n':
            return '-15px -15px 0 0, 15px -15px 0 0, -15px 15px 0 0, 15px 15px 0 0'; // Snow
        default:
            return 'rgba(255, 255, 255, 0)'; // Default box-shadow
    }
}

// Function to get background class for weather icon
// Function to get background class for weather icon
function getWeatherIconBackground(iconCode) {
    console.log('Received icon code:', iconCode); // Log the received icon code

    switch (iconCode) {
        case '01d':
        case '01n':
            return 'sun';
        case '02d':
        case '02n':
            return 'half-sunny'; // Half Sunny
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            return 'cloud'; // Cloud
        case '09d':
        case '09n':
        case '10d':
        case '10n':
            return 'rain'; // Rain
        case '13d':
        case '13n':
            return 'snow'; // Snow
        default:
            return ''; // Default class
    }
}


// Function to fetch weather data from OpenWeatherMap API
async function getWeather() {
    const apiKey = 'ca17208bfd297c3ca6ecc276b3bc0628'; // Replace with your valid API key
    const city = "Pitsburg";

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        console.log('Weather API response:', data);

        const weatherIcon = document.getElementById('weather-icon');
        const temperatureElement = document.getElementById('temperature');
        const locationElement = document.getElementById('location');

        if (data.weather && data.weather.length > 0 && data.weather[0].icon) {
            const iconCode = data.weather[0].icon;
            console.log('Received icon code:', iconCode); // Log the received icon code

            // Declare iconClass variable
            const iconClass = getWeatherIconBackground(iconCode);

            // Remove existing classes
            weatherIcon.className = 'weather-icon';

            // Add the new class
            if (iconClass !== '') {
                weatherIcon.classList.add(iconClass);

                // Update the temperature element
                temperatureElement.innerText = `${Math.round(data.main.temp)}°C`;
            }

            locationElement.innerText = data.name;
        } else {
            console.error('Unexpected structure in weather data:', data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Call the function when the page loads
window.onload = function () {
    getWeather();
};
