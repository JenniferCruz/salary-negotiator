<template>
    <outcome-modal name="negotiation-outcome">
        <div class="close-button-container">
            <button @click="$modal.hide('negotiation-outcome')" class="btn btn-link">
                ❌
            </button>
        </div>
        <div class="text-center">
            <h1>{{ negotiationSucceeds ? "Success" : "Failure"}}</h1>
            <!--<p>Minimum expected salary {{ employeeMinimum }}.</p>-->
            <!--<p>Maximum offer {{ employerMaximum }}.</p>-->

            <ul class="list-group list-group-horizontal justify-content-center">
                <li v-for="s in salaries" v-bind:id="s" v-bind:key="s.entity" class="list-group-item">
                    {{ s.text }}
                    <div v-bind:class="negotiationSucceeds ? 'bg-success ': 'bg-warning'"
                         class="rounded-circle mx-auto round-div">
                        {{ s.salary }}
                    </div>
                </li>
            </ul>

        </div>
    </outcome-modal>
</template>

<script>
    import VModal from 'vue-js-modal'
    import Vue from 'vue';

    Vue.use(VModal, { componentName: "outcome-modal" });

    function convertToMoney(value) {
        return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
    };

    export default {
        name: "NegotiationOutcome",
        computed: {
            employeeMinimum() {
                return new Number(this.$store.getters.employeeMinimum);
            },
            employerMaximum() {
                return new Number(this.$store.getters.employerMaximum);
            },
            negotiationSucceeds() {
                return this.employeeMinimum <= this.employerMaximum;
            },
            salaries() {
                return this.employeeMinimum.valueOf() === this.employerMaximum.valueOf() ?
                    [
                        {
                            entity: "both",
                            salary: convertToMoney(this.employerMaximum),
                            text: "Both parties agreed on a salary!"
                        }
                    ] :
                    [
                        {
                            entity: "employee",
                            salary: convertToMoney(this.employeeMinimum),
                            text: "Employee expects at least"
                        },
                        {
                            entity: "employer",
                            salary: convertToMoney(this.employerMaximum),
                            text: "Employer's maximum offer"
                        },
                    ]
            }
        },
    }
</script>

<style scoped>
    .close-button-container {
        text-align: right;
    }

    .round-div {
        height: 150px;
        width: 150px;
        padding-top: 65px;
    }

    .list-group-item {
        border: none;
    }

</style>