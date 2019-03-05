describe("Negotiator App Happy Path", function() {
    it("loads successfully", () => {
        cy.visit("/");
    })

    it("displays two tabs: Employer and Employee", () => {
        cy.visit("/");
        cy.get(".nav-link").should("have.length", 2);
        cy.contains(".nav-link", "Employer");
        cy.contains(".nav-link", "Employee");
    })

    it("displays Employer's form on Employer's tab", () => {
        cy.visit("/");
        cy.get("div#employer-form").should("be.visible");
        cy.get("div#employee-form").should("not.be.visible");
    })

    it("displays Employee's form after clicking on Employee's tab", () => {
        cy.visit("/");
        cy.get("#Employee a").click();
        cy.get("div#employer-form").should("not.be.visible");
        cy.get("div#employee-form").should("be.visible");
    })

    it("Displays Thank you message after Employer submits form", () => {
        const container = "div#employer-form";

        cy.visit("/");
        cy.get("input#Employer").type(12345);
        cy.get(`${container} input[type=submit]`).click();

        cy.get(`${container} #submission-message`).should("be.visible");
        cy.contains(`${container} #submission-message`, "Thank you");
        cy.contains(`${container} #submission-message`, "waiting for the employee");
    })

    it("Displays modal when both forms are submitted", () => {
        submitBothForms();

        // See modal
        cy.get("#negotiation-status").should("be.visible");
        cy.contains("#negotiation-status", "Success");
    })

    it("Allows to re-open modal when both forms are submitted and modal was close", () => {
        submitBothForms();

        cy.get(".close-button-container button").click();

        // modal cannot be seen anymore
        cy.get("#negotiation-status").should("not.be.visible");

        cy.contains("button", "Show outcome");
        cy.get("button").click();
        cy.get("#negotiation-status").should("be.visible");
    })

    it("Shows London Temperature on modal",() => {
        submitBothForms();
        cy.contains("#london-temperature", "Temperature in London");
    })


    /********************************************************************************/

    function submitBothForms() {
        cy.visit("/");

        // Fill and submit employer form
        cy.get("input#Employer").type(12345);
        cy.get("div#employer-form input[type=submit]").click();

        // Fill and submit employee form
        cy.get("#Employee a").click();
        cy.get("input#Employee").type(12345);
        cy.get("div#employee-form input[type=submit]").click();
    }
});