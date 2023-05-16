import "../../../app/globals.css"
import { NavbarLink } from './NavbarLink'

describe("NavbarLink", () => {
    describe("Default Render", () => {
        beforeEach(() => {
            cy.mount(<NavbarLink datacy="navbar-link" to="/home">Home</NavbarLink>)
        })

        it("should display navbar link", () => {
            cy.datacy("navbar-link").should("be.visible")
        })
    })

    describe("Link Prop", () => {
        it('renders a link', () => {
            cy.mount(<NavbarLink datacy="navbar-link" to="/home">Home</NavbarLink>)
            cy.datacy("navbar-link").should('have.attr', 'href', '/home')
        })

        it('prevents click when link is active', () => {
            cy.mount(<NavbarLink datacy="navbar-link" to="/home" isActive={true}>Home</NavbarLink>)
            cy.datacy("navbar-link").click().should('have.attr', 'href', '')
        })
    })

    describe("OnClick Prop", () => {
        it('renders a button with onClick', () => {
            cy.mount(<NavbarLink datacy="navbar-link" onClick={() => console.log("Clicked!")}>Click me</NavbarLink>)
            cy.datacy("navbar-link").should('be.visible')
        })

        it('disables button when link is active', () => {
            cy.mount(<NavbarLink datacy="navbar-link" onClick={() => console.log("Clicked!")} isActive={true}>Click me</NavbarLink>)
            cy.datacy("navbar-link").should('be.disabled')
        })
    })

    describe("IsActive Prop", () => {
        it('renders an active link', () => {
            cy.mount(<NavbarLink datacy="navbar-link" to="/home" isActive={true}>Home</NavbarLink>)
            cy.datacy("navbar-link").should('have.class', 'font-bold').and('have.class', 'text-red-700')
        })

        it('renders an inactive link', () => {
            cy.mount(<NavbarLink datacy="navbar-link" to="/home">Home</NavbarLink>)
            cy.datacy("navbar-link").should('have.class', 'font-semibold').and('have.class', 'text-dark').and('have.class', 'hover:text-dark-300').and('have.class', 'focus:text-dark-400')
            cy.datacy("navbar-link").should('not.have.class', 'font-bold').and('not.have.class', 'text-red-700')
        })
    })
})