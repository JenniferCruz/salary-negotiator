<template>
    <div id="app" class="text-center mt-5">
        <ul id="nav-tabs" class="nav nav-tabs justify-content-center">
            <li v-for="tab in tabs" v-bind:id="tab" v-bind:key="tab" class="nav-item">
                <a href="#"
                   class="nav-link"
                   v-bind:class="{active: tab === currentTab}"
                   v-on:click="currentTab = tab">

                    {{ tab }}

                </a>
            </li>
        </ul>

        <div v-show="currentTab === 'Employee'">
            <employee-form :name="'Employee'" placeholder="enter minimum salary"></employee-form>
        </div>

        <div v-show="currentTab === 'Employer'">
            <employer-form :name="'Employer'" placeholder="enter maximum salary"></employer-form>
        </div>

        <outcome-modal></outcome-modal>

    </div>
</template>

<script>
    import SalaryForm from "./components/SalaryForm.vue";
    import OutcomeModal from "./components/OutcomeModal.vue"

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
            OutcomeModal
        }
    }
</script>

<style scoped>
    a {
        color: black;
    }


</style>