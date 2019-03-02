import Vue from "vue";
import NegotiatorApp from "./NegotiatorApp.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(NegotiatorApp)
}).$mount("#app");
