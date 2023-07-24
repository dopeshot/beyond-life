import '@cypress/code-coverage/support'
import { mount } from 'cypress/react18'
import './commands'

Cypress.Commands.add('mount', mount)
