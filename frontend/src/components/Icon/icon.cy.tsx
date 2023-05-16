import "material-symbols"
import "../../app/globals.css"
import { Icon } from "./Icon"

describe("Icon", () => {
    describe("Default Render", () => {
        beforeEach(() => {
            cy.mount(<Icon datacy="icon" isFilled>person</Icon>)
        })

        it("should display icon", () => {
            cy.datacy("icon").should("be.visible")
        })
    })

    describe("Filled Prop", () => {
        it('renders a filled icon', () => {
            cy.mount(<Icon datacy="icon" isFilled>person</Icon>)
            cy.datacy("icon").should('have.attr', 'style', 'font-variation-settings: "FILL" 1;')
        })

        it('renders a not filled icon', () => {
            cy.mount(<Icon datacy="icon">person</Icon>)
            cy.datacy("icon").should('not.have.attr', 'style', 'font-variation-settings: "FILL" 1;')
        })
    })
})