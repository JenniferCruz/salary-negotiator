<template>
    <div>
        <h1>{{ salariesOverlap ? "Success" : "Failure"}}</h1>
        <p>Minimum expeced salary {{ employeeMinimum }}</p>
        <p>Maximum offer {{ employeerMaximum }}</p>
s    </div>
</template>

<script>
    export default {
        name: "NegotiationOutcome",
        data() {
            return {
                employeeMinimum: null,
                employeerMaximum: null,
            }
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