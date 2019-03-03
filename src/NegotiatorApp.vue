<template>
    <div id="app">
        <ul id="nav-tabs">
            <li v-for="tab in tabs"
                v-bind:id="tab"
                v-bind:key="tab"
                v-bind:class="{selected: tab === currentTab}"
                v-on:click="currentTab = tab">
                {{ tab }}
            </li>
        </ul>

        <div v-show="currentTab === 'Employee'">
            <employee-form :name="currentTab" placeholder="minimum"></employee-form>
        </div>

        <div v-show="currentTab === 'Employer'">
            <employer-form :name="currentTab" placeholder="maximum"></employer-form>
        </div>

        <negotiation-outcome></negotiation-outcome>

    </div>
</template>

<script>
    import SalaryForm from "./views/SalaryForm.vue";
    import NegotiationOutcome from "./components/NegotiationOutcome.vue"

    export default {
        name: "NegotiatorApp",
        data() {
            return {
                tabs: ["Employer", "Employee"],
                currentTab: "Employer"
            }
        },
        components: {
            'employer-form': SalaryForm,
            'employee-form': SalaryForm,
            NegotiationOutcome
        }
    }
</script>

<style scoped></style>