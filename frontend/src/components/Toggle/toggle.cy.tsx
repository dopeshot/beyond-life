import { Form, Formik } from "formik"
import "../../app/globals.css"
import { Toggle } from './Toggle'

const initialValues = {
    title: ""
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const onSubmitSpy = cy.spy()
    
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitSpy}>
            <Form>
                {children}
            </Form>
        </Formik>
    )
}

describe('Toggle', () => {
    const data = {
        name: "toggle",
        labelText: "Möchten Sie ein Berliner Testament erstellen?",
        helperText: "Das Berliner Testament ist ein gemeinschaftliches Testament von Ehegatten oder Lebenspartnern.",
        labelOff: "Nein",
        labelOn: "Ja"
    }

    beforeEach(() => {
        cy.mount(<Wrapper>
            <Toggle name={data.name} labelText={data.labelText} helperText={data.helperText} labelOn={data.labelOn} labelOff={data.labelOff} />
        </Wrapper>)
    })

    it('should set name in label attribute', () => {
        cy.get('label').invoke('attr', 'for').should('contain', data.name)
    })

    it('should set labeltext', () => {
        cy.get('label').should('contain', data.labelText)
    })

    it('should set label star when label required', () => {
        cy.get('label').should('not.contain', '*')
        cy.mount(<Wrapper>
            <Toggle name={data.name} labelText={data.labelText} helperText={data.helperText} labelOn={data.labelOn} labelOff={data.labelOff} labelRequired />
        </Wrapper>)
        cy.get('label').should('contain', '*')
    })

    it('should set helper text', () => {
        cy.get(`[data-cy="${data.name}-helpertext"]`).should('contain', data.helperText)
    })

    it('should change label text when toggle button', () => {
        cy.get(`[data-cy="${data.name}-labeltext"]`).should('contain', data.labelOff)
        cy.get(`[data-cy="${data.name}-clickdiv"]`).click()
        cy.get(`[data-cy="${data.name}-labeltext"]`).should('contain', data.labelOn)
    })

    it('should set label off text on default', () => {
        cy.get(`[data-cy="${data.name}-labeltext"]`).should('contain', data.labelOff)
    })

    it('should translate ball when toggle', () => {
        cy.get(`[data-cy="${data.name}-ball"]`).should('not.have.class', 'translate-x-7')
        cy.get(`[data-cy="${data.name}-clickdiv"]`).click()
        cy.get(`[data-cy="${data.name}-ball"]`).should('have.class', 'translate-x-7')
    })
})