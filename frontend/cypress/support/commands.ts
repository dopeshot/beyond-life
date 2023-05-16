/// <reference types="cypress" />

/**** Command Helper ****/
Cypress.Commands.add("dataCy", (dataCy, customSelector = "") => {
    cy.get(`[datacy=${dataCy}]${customSelector}`)
})