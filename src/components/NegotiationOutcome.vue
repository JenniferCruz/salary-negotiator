<template>
    <div>
        <outcome-modal name="negotiation-outcome" @before-close="beforeClose" @before-open="beforeOpen" height="auto">
            <div class="close-button-container">
                <button @click="$modal.hide('negotiation-outcome')" class="btn btn-link">
                    ❌
                </button>
            </div>

            <div class="text-center">
                <h1>{{ negotiationSucceeds ? "Success" : "Failure"}}</h1>
                <ul class="list-group list-group-horizontal justify-content-center">
                    <li v-for="s in salaries" v-bind:id="s" v-bind:key="s.entity" class="list-group-item">
                        {{ s.text }}
                        <div v-bind:class="negotiationSucceeds ? 'bg-success ': 'bg-warning'"
                             class="rounded-circle mx-auto round-div">
                            {{ s.salary }}
                        </div>
                    </li>
                </ul>
            </div>

        <weather-widget></weather-widget>

        </outcome-modal>

        <div v-show="negotiationCompleted && modalIsClosed">
            <h3>Negotiation is ready!</h3>
            <button @click="$modal.show('negotiation-outcome')" class="btn btn-large btn-outline-success">
                Show outcome
            </button>
        </div>
    </div>
</template>

<script>
    import VModal from 'vue-js-modal'
    import Vue from 'vue';
    import WeatherWidget from './WeatherWidget'

    Vue.use(VModal, { componentName: "outcome-modal" });

    function convertToMoney(value) {
        return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
    };

    export default {
        name: "NegotiationOutcome",
        data() {
            return {
                modalIsClosed: true,
            }
        },
        components: {
            WeatherWidget
        },
        computed: {
            employeeMinimum() {
                return new Number(this.$store.getters.employeeMinimum);
            },
            employerMaximum() {
                return new Number(this.$store.getters.employerMaximum);
            },
            negotiationSucceeds() {
                return this.employeeMinimum <= this.employerMaximum;
            },
            salaries() {
                return this.employeeMinimum.valueOf() === this.employerMaximum.valueOf() ?
                    [
                        {
                            entity: "both",
                            salary: convertToMoney(this.employerMaximum),
                            text: "Both parties agreed on a salary!"
                        }
                    ] :
                    [
                        {
                            entity: "employee",
                            salary: convertToMoney(this.employeeMinimum),
                            text: "Employee expects at least"
                        },
                        {
                            entity: "employer",
                            salary: convertToMoney(this.employerMaximum),
                            text: "Employer's maximum offer"
                        },
                    ]
            },
            negotiationCompleted() {
                return this.$store.getters.hasCompleteData;
            },
        },
        methods: {
            beforeClose() {
                this.modalIsClosed = true;
            },
            beforeOpen() {
                this.modalIsClosed = false;
            },
        },
    }
</script>

<style scoped>
    .close-button-container {
        text-align: right;
    }

    .round-div {
        height: 150px;
        width: 150px;
        padding-top: 65px;
    }

    .list-group-item {
        border: none;
    }

</style>