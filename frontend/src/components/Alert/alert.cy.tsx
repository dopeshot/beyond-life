import 'material-symbols'
import '../../app/globals.css'
import { Alert, AlertProps } from './Alert'

const data: AlertProps = {
    headline: 'Warning!',
    description: 'This is a warning message',
    color: 'red',
    icon: 'notifications',
    datacy: 'alert'
}

describe('Alert', () => {
    describe('Basic Props', () => {
        beforeEach(() => {
            cy.mount(<Alert {...data} />)
        })

        it('should display headline text', () => {
            cy.datacy(`${data.datacy}-headline`).should('be.visible')
            cy.datacy(`${data.datacy}-headline`).should('contain.text', data.headline)
        })

        it('should display description text', () => {
            cy.datacy(`${data.datacy}-description`).should('be.visible')
            cy.datacy(`${data.datacy}-description`).should('contain.text', data.description)
        })

        it('should display icon', () => {
            cy.datacy(`${data.datacy}-icon`).should('be.visible')
        })

        it('should have correct color', () => {
            cy.datacy(`${data.datacy}`).should('have.class', `border-${data.color}`)
        })
    })
})
