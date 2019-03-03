<template>
    <div v-show="hasCompleteData">
        <h1>{{ negotiationSucceeds ? "Success" : "Failure"}}</h1>
        <p>Minimum expected salary {{ employeeMinimum }}.</p>
        <p>Maximum offer {{ employeerMaximum }}.</p>
    </div>
</template>

<script>
    export default {
        name: "NegotiationOutcome",
        computed: {
            employeeMinimum() {
                return this.$store.state.employeeMinimum;
            },
            employeerMaximum() {
                return this.$store.state.employerMaximum;
            },
            hasCompleteData() {
                return this.$store.getters.hasCompleteData;
            },
            negotiationSucceeds() {
                return this.employeeMinimum <= this.employeerMaximum;
            }
        },
    }
</script>

<style scoped>

</style>