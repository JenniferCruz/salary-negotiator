import { shallowMount } from "@vue/test-utils";
import NegotiatorApp from "@/NegotiatorApp.vue";
import router from "@/router";

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