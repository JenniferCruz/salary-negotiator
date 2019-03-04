<template>
    <outcome-modal name="negotiation-outcome">
        <div class="close-button-container">
            <button @click="$modal.hide('negotiation-outcome')" class="btn btn-link">
                ❌
            </button>
        </div>
        <div class="text-center">
            <h1>{{ negotiationSucceeds ? "Success" : "Failure"}}</h1>
            <p>Minimum expected salary {{ employeeMinimum }}.</p>
            <p>Maximum offer {{ employeerMaximum }}.</p>
        </div>
    </outcome-modal>
</template>

<script>
    import VModal from 'vue-js-modal'
    import Vue from 'vue';

    Vue.use(VModal, { componentName: "outcome-modal" })

    export default {
        name: "NegotiationOutcome",
        computed: {
            employeeMinimum() {
                // return this.$store.state.employeeMinimum;
                return this.$store.getters.employeeMinimum;
            },
            employeerMaximum() {
                return this.$store.getters.employerMaximum;
            },
            negotiationSucceeds() {
                return this.employeeMinimum <= this.employeerMaximum;
            }
        },
    }
</script>

<style scoped>
    .close-button-container {
        text-align: right;
    }

</style>