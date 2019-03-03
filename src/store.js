import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        employerMaximum: null,
        employeeMinimum: null,
    },
    mutations: {
        updateSalary(state, data) {
            data.entity.toLowerCase() === "employer" ?
                state.employerMaximum = data.salary : state.employeeMinimum = data.salary;
        }
    },
});