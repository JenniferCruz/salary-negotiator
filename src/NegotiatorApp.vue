<template>
    <div id="app">
        <div id="nav-tabs">
            <!--TODO: add additional 'employer' path to employer tab -->
            <router-link to="/" id="employer-tab">Employer</router-link> |
            <router-link to="/employee" id="employee-tab">Employee</router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: "NegotiatorApp"
    }
</script>

<style scoped>

    .router-link-exact-active {
        background-color: black;
        color: white;
    }

</style>