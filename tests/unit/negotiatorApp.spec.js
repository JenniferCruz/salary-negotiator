import { shallowMount } from "@vue/test-utils";
import NegotiatorApp from "@/NegotiatorApp.vue";
import { store } from "@/store";

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
