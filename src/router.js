import Vue from "vue";
import Router from "vue-router";
import SalaryForm from "./views/SalaryForm.vue";
// import Store   from "./views/Store.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "employer",
      component: SalaryForm,
      props: { name: "employer" }
    },
    {
      path: "/employee",
      name: "employee",
      component: SalaryForm,
      props: { name: "employee" }
    }
  ]
});
