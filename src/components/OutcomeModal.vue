<template>
    <div>
        <outcome-modal name="negotiation-outcome" @before-close="beforeClose" @before-open="beforeOpen" height="auto">
            <div class="close-button-container">
                <button @click="$modal.hide('negotiation-outcome')" class="btn btn-link">
                    ❌
                </button>
            </div>

            <div v-if="outcome" class="text-center">
                <h1>{{ outcome.succeded ? "Success" : "Failure"}}</h1>
                <ul class="list-group list-group-horizontal justify-content-center">
                    <li v-for="s in outcome.salaries" v-bind:id="s" v-bind:key="s.entity" class="list-group-item">
                        {{ s.text }}
                        <div v-bind:class="outcome.succeded ? 'bg-success ': 'bg-warning'"
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
    import negotiationOutcome from '../model/negotiationOutcome.js'

    Vue.use(VModal, { componentName: "outcome-modal" });

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
            negotiationCompleted() {
                return this.$store.getters.hasCompleteData;
            },
            outcome() {
                return this.negotiationCompleted ?
                    negotiationOutcome(this.$store.getters.employerMaximum, this.$store.getters.employeeMinimum) : null;
            }
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