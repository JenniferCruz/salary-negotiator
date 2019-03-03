import Vue from "vue";
import NegotiatorApp from "./NegotiatorApp.vue";
import { store } from "./store";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(NegotiatorApp),
}).$mount("#app");