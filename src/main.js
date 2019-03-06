import Vue from "vue";
import NegotiatorApp from "./NegotiatorApp.vue";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(NegotiatorApp)
}).$mount("#app");
