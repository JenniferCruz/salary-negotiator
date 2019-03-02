<template>
    <div v-bind:id="formId">
        <form></form>
    </div>
</template>

<script>
    export default {
        name: "SalaryForm",
        props: {
            name: {
                type: String,
                required: true
            }
        },
        computed: {
            formId() {
                return `${this.name}-form`
                // return "eureka";
            }
        }
    }
</script>

<style scoped>

</style>