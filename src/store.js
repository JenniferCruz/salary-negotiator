import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        employerMaximum: null,
        employeeMinimum: null,
    },
    getters: {
        hasCompleteData(state) {
            return state.employeeMinimum !== null && state.employeerMaximum !== null;
        }
    },
    mutations: {
        updateSalary(state, data) {
            data.party.toLowerCase() === "employer" ?
                state.employerMaximum = data.salary : state.employeeMinimum = data.salary;
        }
    },
});