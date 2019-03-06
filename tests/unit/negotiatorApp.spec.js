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
    checkState(2, "employer", true);
    checkState(1, "employee", false);

    // select other tab
    wrapper.find("#Employee a").trigger("click");

    // check changes in state
    checkState(2, "employer", false);
    checkState(1, "employee", true);
  });

  function checkState(index, entity, visible) {
    let tabContent = wrapper.findAll("div").at(index);
    expect(tabContent.contains(`${entity}-form-stub`)).toBeTruthy();
    expect(tabContent.html().includes("display: none")).toBe(!visible);
  }
});
