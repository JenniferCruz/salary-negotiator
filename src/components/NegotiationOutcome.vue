<template>
    <div v-if="outcome" class="text-center">
        <h1 id="negotiation-status">{{ outcome.succeded ? "Success" : "Failure"}}</h1>
        <ul class="list-group list-group-horizontal justify-content-center">
            <li v-for="s in outcome.salaries" v-bind:id="s" v-bind:key="s.entity" class="list-group-item">
                {{ s.text }}
                <div v-bind:class="outcome.succeded ? 'bg-success ': 'bg-warning'"
                     class="rounded-circle mx-auto round-div">
                    {{ s.salary }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import negotiationResult from '../model/negotiationResult.js'

    export default {
        name: "NegotiationOutcome",
        props: {
            negotiationCompleted: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            outcome() {
                return this.negotiationCompleted ?
                    negotiationResult(this.$store.getters.employerMaximum, this.$store.getters.employeeMinimum) : null;
            }
        },
    }
</script>

<style scoped>
    .round-div {
        height: 150px;
        width: 150px;
        padding-top: 65px;
    }

    .list-group-item {
        border: none;
    }
</style>