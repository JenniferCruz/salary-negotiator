<template>
    <div class="text-center mt-3 pt-3 mb-0 border-top alert alert-success">
        <div v-if="temperature" id="london-temperature">
            <p>Temperature in London:</p>
            <h3>{{ temperature }} °C</h3>
            <sub class="text-muted">from the Open Weather Map</sub>
        </div>
        <div v-else-if="error">
            <h3>We're sorry!</h3>
            <span class="sad-emoji">😞</span>
            <p>We could not load London's weather</p>
        </div>
        <div v-else>
            <p>Loading Current Temperature in London</p>
            <div class="spinner-border"></div>
        </div>
    </div>
</template>

<script>
    import fetchLondonTemperature from "../apis/openweather.js";

    export default {
        name: "WeatherWidget",
        data() {
            return {
                temperature: null,
                error: null
            }
        },
        mounted() {
            fetchLondonTemperature()
                .then(weather => this.temperature = weather.temperatureCelsius)
                .catch(() => this.error = true)
                // TODO: Want to handle error this way or give more information?
        },
    }
</script>

<style scoped>
    .sad-emoji {
        font-size: 3em;
    }
</style>
