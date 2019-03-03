import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import NegotiatorApp from "@/NegotiatorApp.vue";
import { store } from "@/store";
import SalaryForm from "@/views/SalaryForm";
import NegotiationOutcome from "@/components/NegotiationOutcome";
import Vuex from 'vuex'

describe("App contains two tabs", () => {
  it("renders tabs for employer and employee", () => {
    const wrapper = shallowMount(NegotiatorApp, {
      propsData: { store }
    });
    const tabs = wrapper.find("#nav-tabs").text().toLowerCase().split(/\s+/);
    const expectedTabs = ["employer", "employee"];
    expect(tabs).toEqual(expect.arrayContaining(expectedTabs));
  });

  it("changes content when new tab is selected", () => {
    const wrapper = shallowMount(NegotiatorApp, {
      propsData: { store }
    });

    // check initial state
    let employerContent = wrapper.findAll("div").at(2);
    expect(employerContent.contains("employer-form-stub")).toBeTruthy();
    expect(employerContent.html().includes("display: none")).toBeFalsy();

    let employeeContent = wrapper.findAll("div").at(1);
    expect(employeeContent.contains("employee-form-stub")).toBeTruthy();
    expect(employeeContent.html().includes("display: none")).toBeTruthy();


    // select other tab
    wrapper.find("#Employee").trigger("click");

    // test change in state
    employerContent = wrapper.findAll("div").at(2);
    expect(employerContent.contains("employer-form-stub")).toBeTruthy();
    expect(employerContent.html().includes("display: none")).toBeTruthy();

    employeeContent = wrapper.findAll("div").at(1);
    expect(employeeContent.contains("employee-form-stub")).toBeTruthy();
    expect(employeeContent.html().includes("display: none")).toBeFalsy();

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

describe("Salary Form Submission", () => {

  let employeeFormWrapper;
  let input;

  beforeEach(() => {
    employeeFormWrapper = shallowMount(SalaryForm, {
      propsData: {
        name: "employee"
      }
    });
    input = employeeFormWrapper.find("input");
    input.element.value = 1;
    input.trigger('input');
    employeeFormWrapper.find("input[type=submit]").trigger("click");
  });

  it("Hides form on submission", () => {
    expect(employeeFormWrapper.find("form").html()).toContain('<!---->');
  });

  it("Reports employer's submission is pending on employee's submission", () => {
    const waitingMessage = employeeFormWrapper.find("#submission-message").text();
    expect(waitingMessage).toContain("waiting");
    expect(waitingMessage).toContain("employer");
  });

  it("Reports employee's submission is pending on employer's submission", () => {
    const formWrapper = shallowMount(SalaryForm, {
      propsData: {
        name: "employer"
      }
    });
    input = formWrapper.find("input");
    input.element.value = 1;
    input.trigger('input');
    formWrapper.find("input[type=submit]").trigger("click");

    const waitingMessage = formWrapper.find("#submission-message").text();
    expect(waitingMessage).toContain("waiting");
    expect(waitingMessage).toContain("employee");

  });
});

describe("Negotiation Outcome when both Employee and Employer submit", () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
  });

  function getOutcomeWrapper(min, max) {
    const getters = {
      hasCompleteData: () => true,
      employeeMinimum: () => min,
      employerMaximum: () => max,
    };
    const store = new Vuex.Store({ getters });
    return mount(NegotiationOutcome, { store, localVue });
  }

  it("Shows failed outcome when Employer offers less than Employee expects", () => {
    const outcomeWrapper  = getOutcomeWrapper(10, 5);
    expect(outcomeWrapper.html().toLowerCase().includes("failure")).toBeTruthy();
  });

  it("Shows successful outcome when Employer offers more than Employee expects", () => {
    const outcomeWrapper  = getOutcomeWrapper(5, 10);
    expect(outcomeWrapper.html().toLowerCase().includes("success")).toBeTruthy();
  });

  it("Shows successful outcome when Employer offers exactly what Employee expects", () => {
    const outcomeWrapper  = getOutcomeWrapper(50, 50);
    expect(outcomeWrapper.html().toLowerCase().includes("success")).toBeTruthy();
  });

});