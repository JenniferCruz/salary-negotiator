import { createLocalVue, mount } from "@vue/test-utils";
import NegotiationOutcome from "@/components/NegotiationOutcome";
import Vuex from 'vuex'

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