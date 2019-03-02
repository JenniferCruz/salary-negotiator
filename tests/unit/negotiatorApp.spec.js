import { shallowMount } from "@vue/test-utils";
import NegotiatorApp from "@/NegotiatorApp.vue";
import router from "@/router";
import SalaryForm from "../../src/views/SalaryForm";

describe("App contains two tabs", () => {
  it("renders tabs for employer and employee", () => {
    const wrapper = shallowMount(NegotiatorApp, {
      propsData: {
        router
      }
    });
    const tabs = wrapper.find("#nav-tabs").text().toLowerCase().split(" ");
    const expectedTabs = ["employer", "employee"];
    expect(tabs).toEqual(expect.arrayContaining(expectedTabs));
  });
});

describe("Salary Form takes only numbers", () => {

  it("Rejects strings", () => {

    const formWrapper = shallowMount(SalaryForm, {
      propsData: {
        name: "employee"
      }
    });

    const input = formWrapper.find("input");
    input.element.value = 'input';
    input.trigger('input');
    formWrapper.find('input[type=submit]').trigger('click');

    const error = formWrapper.find("#error-messages");

    expect(error.exists()).toBeTruthy();

  });



  it("Rejects negative numbers", () => {

    const formWrapper = shallowMount(SalaryForm, {
      propsData: {
        name: "employee"
      }
    });

    const input = formWrapper.find("input");
    input.element.value = -1;
    input.trigger('input');
    formWrapper.find('input[type=submit]').trigger('click');

    const error = formWrapper.find("#error-messages");

    expect(error.exists()).toBeTruthy();

  });


  it("Accepts integer numbers", () => {
    const formWrapper = shallowMount(SalaryForm, {
      propsData: {
        name: "employee"
      }
    });

    const input = formWrapper.find("input");
    input.element.value = 1;
    input.trigger('input');
    formWrapper.find('input[type=submit]').trigger('click');

    const error = formWrapper.find("#error-messages");

    expect(error.exists()).toBeFalsy();
  });

  it("Accepts decimal numbers", () => {
    const formWrapper = shallowMount(SalaryForm, {
      propsData: {
        name: "employee"
      }
    });

    const input = formWrapper.find("input");
    input.element.value = 1.5;
    input.trigger('input');
    formWrapper.find('input[type=submit]').trigger('click');

    const error = formWrapper.find("#error-messages");

    expect(error.exists()).toBeFalsy();
  });

});