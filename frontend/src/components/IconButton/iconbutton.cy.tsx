import "material-symbols"
import "../../app/globals.css"
import { IconButton } from './IconButton'

describe("IconButton", () => {
    describe("Default Render", () => {
        beforeEach(() => {
            cy.mount(<IconButton datacy="icon-button" icon="home" to="/home" />)
        })

        it("should display icon button", () => {
            cy.datacy("icon-button").should("be.visible")
        })
    })

    describe("Link Prop", () => {
        it('renders a button as link', () => {
            cy.mount(<IconButton datacy="icon-button" icon="home" to="/home" />)
            cy.datacy("icon-button").should('have.attr', 'href', '/home')
        })

        it('prevents click when button is disabled', () => {
            cy.mount(<IconButton datacy="icon-button" icon="home" to="/home" disabled />)
            cy.datacy("icon-button").click().should('have.attr', 'href', '')
        })
    })

    describe("OnClick Prop", () => {
        it('renders a button with onClick', () => {
            cy.mount(<IconButton datacy="icon-button" icon="home" onClick={() => console.log("Clicked!")} />)
            cy.datacy("icon-button").should('be.visible')
        })

        it('disables button when disabled prop is true', () => {
            cy.mount(<IconButton datacy="icon-button" icon="home" onClick={() => console.log("Clicked!")} disabled />)
            cy.datacy("icon-button").should('be.disabled')
        })
    })

    describe("Disabled Prop", () => {
        it('renders an disabled button with dimmed opacity', () => {
            cy.mount(<IconButton datacy="icon-button" icon="home" to="/home" disabled dimOpacityWhenDisabled />)
            cy.datacy("icon-button-inner-icon").should('have.class', 'text-opacity-50')
        })

        it('renders an disabled button without dimmed opacity', () => {
            cy.mount(<IconButton datacy="icon-button" icon="home" to="/home" disabled dimOpacityWhenDisabled={false} />)
            cy.datacy("icon-button-inner-icon").should('not.have.class', 'text-opacity-50')
        })
    })

    describe("Color Prop", () => {
        it('renders a button with specified color', () => {
            cy.mount(<IconButton datacy="icon-button" icon="home" to="/home" color="blue" />)
            cy.datacy("icon-button-inner-icon").should('have.class', 'text-blue-600')
        })
    })
})