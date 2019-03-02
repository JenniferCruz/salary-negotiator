<template>
    <div v-bind:id="formId">
        <form @submit.prevent="onSubmit"  v-if="!submitted">

            <div v-if="invalidInput" id="error-messages" class="warning-message">
                <p>{{ errorMessage }}</p>>
            </div>

            <input v-bind:id="name" v-model="amount" v-bind:placeholder="placeholder">
            <input type="submit" value="Submit">

        </form>
    </div>
</template>

<script>
    export default {
        name: "SalaryForm",
        data() {
            return {
                amount: null,
                submitted: false,
            }
        },
        props: {
            name: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                default: "Enter amount"
            }
        },
        methods: {
            onSubmit() {
                if (! this.invalidInput ) {
                    this.submitted = true;
                    // TODO: store value
                }
            }
        },
        computed: {
            formId() {
                return `${this.name.toLowerCase()}-form`
            },
            errorMessage() {
                return "Please, enter a numeric value"
            },
            invalidInput() {
                const n = (new Number(this.amount)).valueOf();
                return Number.isNaN(n) || n < 0;
            }
        }
    }
</script>

<style scoped>
    .warning-message {
        background-color: lightpink;
        color: deeppink;
        border: 1px solid hotpink;
    }
</style>