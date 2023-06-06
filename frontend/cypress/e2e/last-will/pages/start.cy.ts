describe('Last Will Start Page', () => {
    beforeEach(() => {
        cy.visit('/last-will/start')
    })
    describe("Basic Flow", () => {
        it('should redirect to last-will/1/testator when all filled with yes', () => {
            cy.datacy("field-germanCitizenship-true").click()
            cy.datacy("field-germanRightOfInheritance-true").click()

            cy.datacy("button-submit").click()

            cy.url().should("include", "last-will/", "/testator")
        })
    })

    describe("Alert", () => {
        it("should not display alert when germanCitizenship and germanRightOfInheritance both true", () => {
            cy.datacy("field-germanCitizenship-true").click()
            cy.datacy("field-germanRightOfInheritance-true").click()

            cy.datacy("alert").should("not.exist")
        })

        it("should display alert when form is dirty and germanCitizenship is false", () => {
            cy.datacy("field-germanCitizenship-false").click()

            cy.datacy("alert").should("be.visible")
        })

        it("should display alert when form is dirty and germanRightOfInheritance is false", () => {
            cy.datacy("field-germanRightOfInheritance-false").click()

            cy.datacy("alert").should("be.visible")
        })
    })
})