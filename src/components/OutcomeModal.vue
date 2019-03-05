<template>
    <div>
        <outcome-modal name="outcome-modal" @before-close="beforeClose" @before-open="beforeOpen" height="auto">
            <div class="close-button-container">
                <button @click="$modal.hide('outcome-modal')" class="btn btn-link">
                    ❌
                </button>
            </div>

            <negotiation-outcome :outcome="outcome"></negotiation-outcome>

            <weather-widget></weather-widget>

        </outcome-modal>

        <div v-show="negotiationCompleted && modalIsClosed">
            <h3>Negotiation is ready!</h3>
            <button @click="$modal.show('outcome-modal')" class="btn btn-large btn-outline-success">
                Show outcome
            </button>
        </div>
    </div>
</template>

<script>
    import VModal from 'vue-js-modal'
    import Vue from 'vue';
    import WeatherWidget from './WeatherWidget'
    import negotiationResult from '../model/negotiationResult.js'
    import NegotiationOutcome from './NegotiationOutcome'

    Vue.use(VModal, { componentName: "outcome-modal" });

    export default {
        name: "OutcomeModel",
        data() {
            return {
                modalIsClosed: true,
            }
        },
        components: {
            WeatherWidget,
            NegotiationOutcome
        },
        computed: {
            negotiationCompleted() {
                return this.$store.getters.hasCompleteData;
            },
            outcome() {
                return this.negotiationCompleted ?
                    negotiationResult(this.$store.getters.employerMaximum, this.$store.getters.employeeMinimum) : null;
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
</style>