export function fetchWeather(city) {
    return fetch(`https://samples.openweathermap.org/data/2.5/find?q=${city}&units=metric`)
}

export function parseMetricData(data) {
    return {
        city: data.list[0].name,
        temperature: data.list[0].main.temp
    }
}