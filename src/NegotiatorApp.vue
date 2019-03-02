<template>
    <div id="app">
        <div id="nav-tabs">
            <!--TODO: add additional 'employer' path to employer tab -->
            <router-link to="/">Employer</router-link> |
            <router-link to="/employee">Employee</router-link>
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

</style>