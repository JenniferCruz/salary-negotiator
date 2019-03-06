import { shallowMount } from "@vue/test-utils";
import NegotiatorApp from "@/NegotiatorApp.vue";
import { store } from "@/store";

describe("App contains two tabs", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NegotiatorApp, {
      propsData: { store }
    });
  });

  it("renders tabs for employer and employee", () => {
    const tabs = wrapper.find("#nav-tabs").text().toLowerCase().split(/\s+/);
    const expectedTabs = ["employer", "employee"];
    expect(tabs).toEqual(expect.arrayContaining(expectedTabs));
  });

  it("changes content when new tab is selected", () => {
    // check initial state
    assertFormIsVisible("employer", 2);
    assertFormIsHidden("employee", 1);

    // select other tab
    wrapper.find("#Employee a").trigger("click");

    // check changes in state
    assertFormIsHidden("employer", 2);
    assertFormIsVisible("employee", 1);
  });


  function assertFormIsVisible(entity, index) {
    let tabContent = wrapper.findAll("div").at(index);
    expect(tabContent.contains(`${entity}-form-stub`)).toBeTruthy();
    expect(tabContent.html().includes("display: none")).toBeFalsy();
  }

  function assertFormIsHidden(entity, index) {
    let tabContent = wrapper.findAll("div").at(index);
    expect(tabContent.contains(`${entity}-form-stub`)).toBeTruthy();
    expect(tabContent.html().includes("display: none")).toBeTruthy();
  }
});
