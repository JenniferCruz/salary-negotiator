export default function fetchLondonTemperature() {
    // TODO: Key should go in secret store
    const key = "51e0de7d6d5faa504d3709c0a6bbced2";
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${key}&units=metric`)
        .then(response => response.json())
        .then(data => parseMetricData(data))
}

function parseMetricData(data) {
    return {
        city: data.name,
        temperatureCelsius: data.main.temp
    }
}