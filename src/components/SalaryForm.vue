<template>
    <div v-bind:id="formId" class="mt-5">
        <form @submit.prevent="onSubmit"  v-if="!submitted">

            <div v-if="invalidInput && this.amount !== null" id="error-messages" class="alert-warning">
                <p>{{ errorMessage }}</p>
            </div>

            <input v-bind:id="name" v-model="amount" v-bind:placeholder="placeholder">
            <input type="submit" value="Submit">

        </form>

        <div id="submission-message" v-show="submitted && !hasCompleteData">
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
                    this.$store.commit("updateSalary", { party: this.name, salary: this.amount});
                }
                if (this.hasCompleteData)
                    this.$modal.show('outcome-modal');
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
                const n = (Number.parseFloat(this.amount)).valueOf();
                return Number.isNaN(n) || n < 0;
            },
            otherParty() {
                return this.name.toLowerCase() === "employee" ? "employer" : "employee";
            },
            hasCompleteData() {
                return this.$store.getters.hasCompleteData;
            }
        }
    }
</script>

<style scoped>
</style>