import {shallowMount} from "@vue/test-utils";
import SalaryForm from "@/components/SalaryForm";

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

    it("Rejects null values (no user input)", () => {
        const error = enterInputAndFindErrors(null);
        expect(error.exists()).toBeTruthy();
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
