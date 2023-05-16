/// <reference types="cypress" />

/**** Command Helper ****/
Cypress.Commands.add("datacy", (datacy, customSelector = "") => {
    cy.get(`[datacy=${datacy}]${customSelector}`)
})