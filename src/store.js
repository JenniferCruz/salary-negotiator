import Vue from "vue";
import Vuex from "vuex";
import { fetchWeather, parseMetricData } from "./apis/openweather.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        employerMaximum: null,
        employeeMinimum: null,
    },
    getters: {
        hasCompleteData(state) {
            return state.employeeMinimum !== null && state.employerMaximum !== null;
        },
        employerMaximum(state) {
            return state.employerMaximum;
        },
        employeeMinimum(state) {
            return state.employeeMinimum;
        }
    },
    mutations: {
        updateSalary(state, data) {
            data.party.toLowerCase() === "employer" ?
                state.employerMaximum = data.salary : state.employeeMinimum = data.salary;
        },
        setTemperature(state, data) {
            state[data.city] = data.celsius;
        }
    },
    actions: {
        fetchTemperatureInCity({ commit }, city) {
            return fetchWeather(city).then(weather => {
                const data = parseMetricData(weather);
                commit('setTemperature', data)
            })
        }
    }
});