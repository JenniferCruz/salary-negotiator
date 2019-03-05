import negotiationResult from "@/model/negotiationResult";

describe("Negotiation Outcome when both Employee and Employer submit", () => {

    it("fails when Employer offers less than Employee expects", () => {
        const result = negotiationResult("40000", "50000");
        expect(result.succeded).toBeFalsy();
    });

    it("succeds when Employer offers more than Employee expects", () => {
        const result = negotiationResult("60000", "50000");
        expect(result.succeded).toBeTruthy();
    });

    it("succeds when Employer offers exactly what Employee expects", () => {
        const result = negotiationResult("50000", "50000");
        expect(result.succeded).toBeTruthy();
    });

    it("returns salaries in euro currency", () => {
        const result = negotiationResult("50000", "50000").salaries[0].salary;
        expect(result.includes("€")).toBeTruthy();
        expect(result.includes("50,000.00")).toBeTruthy();
    })

});