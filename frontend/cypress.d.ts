import { mount } from 'cypress/react'

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Mount a React component in a Cypress test
             */
            mount: typeof mount
            /**
             * Helper for easier selecting tags with datacy.
             * @param dataCy the dataCy attribute name of the tag we want to select
             * @param customSelector add custom child selector, is used like css selectors
             */
            dataCy(dataCy: string, customSelector?: string): Chainable<void>
        }
    }
}