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

  let formWrapper;
  let input;

  function enterInputAndFindErrors(value) {
    input.element.value = value;
    input.trigger('input');
    return formWrapper.find("#error-messages");
  }

  beforeEach(() => {
    formWrapper = shallowMount(SalaryForm, {
      propsData: {
        name: "employee"
      }
    });
    input = formWrapper.find("input");
  });


  it("Rejects strings", () => {
    const error = enterInputAndFindErrors('input');
    expect(error.exists()).toBeTruthy();
  });

  it("Rejects negative numbers", () => {
    const error = enterInputAndFindErrors(-1);
    expect(error.exists()).toBeTruthy();
  });

  it("Accepts integer numbers", () => {
    const error = enterInputAndFindErrors(1);
    expect(error.exists()).toBeFalsy();
  });

  it("Accepts decimal numbers", () => {
    const error = enterInputAndFindErrors(1.5);
    expect(error.exists()).toBeFalsy();
  });
});