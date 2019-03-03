<template>
    <div v-bind:id="formId">
        <form @submit.prevent="onSubmit"  v-if="!submitted">

            <div v-if="invalidInput" id="error-messages" class="warning-message">
                <p>{{ errorMessage }}</p>>
            </div>

            <input v-bind:id="name" v-model="amount" v-bind:placeholder="placeholder">
            <input type="submit" value="Submit">

        </form>

        <div id="submission-message" v-show="submitted">
            <h3>Thank you for your submission!</h3>
            <p>We are waiting for the {{ otherParty }} to submit their form.</p>
        </div>
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
                    this.$store.commit("updateSalary", { entity: this.name, salary: this.amount})
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
            },
            otherParty() {
                return this.name.toLowerCase() === "employee" ? "employer" : "employee";
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