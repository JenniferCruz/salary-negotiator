<template>
    <div>
        <h1>{{ salariesOverlap ? "Success" : "Failure"}}</h1>
        <p>Minimum expected salary {{ employeeMinimum }}.</p>
        <p>Maximum offer {{ employeerMaximum }}.</p>
s    </div>
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
        },
        methods: {
            salariesOverlap() {
                return this.minimum <= this.maximum
            }
        },
    }
</script>

<style scoped>

</style>