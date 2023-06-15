import { Form, Formik } from 'formik'
import 'material-symbols'
import '../../app/globals.css'
import { Toggle } from './Toggle'

const initialValues = {
    title: '',
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const onSubmitSpy = cy.spy()

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitSpy}>
            <Form>{children}</Form>
        </Formik>
    )
}

describe('Toggle', () => {
    const data = {
        name: 'toggle',
        labelText: 'Möchten Sie ein Berliner Testament erstellen?',
        helperText: 'Das Berliner Testament ist ein gemeinschaftliches Testament von Ehegatten oder Lebenspartnern.',
        labelOff: 'Nein',
        labelOn: 'Ja',
    }

    beforeEach(() => {
        cy.mount(
            <Wrapper>
                <Toggle
                    name={data.name}
                    labelText={data.labelText}
                    helperText={data.helperText}
                    labelOn={data.labelOn}
                    labelOff={data.labelOff}
                />
            </Wrapper>
        )
    })

    it('should set name in label attribute', () => {
        cy.datacy(`${data.name}-label`).invoke('attr', 'for').should('contain', data.name)
    })

    it('should set labeltext', () => {
        cy.datacy(`${data.name}-label`).should('contain', data.labelText)
    })

    it('should set label star when label required', () => {
        cy.datacy(`${data.name}-label-required`).should('not.exist')
        cy.mount(
            <Wrapper>
                <Toggle
                    name={data.name}
                    labelText={data.labelText}
                    helperText={data.helperText}
                    labelOn={data.labelOn}
                    labelOff={data.labelOff}
                    inputRequired={true}
                />
            </Wrapper>
        )
        cy.get('label').should('contain', '*')
    })

    it('should set helper text', () => {
        cy.datacy(`${data.name}-helpertext`).should('contain', data.helperText)
    })

    it('should change label text when toggle button', () => {
        cy.datacy(`${data.name}-labeltext`).should('contain', data.labelOff)
        cy.datacy(`${data.name}-clickdiv`).click()
        cy.datacy(`${data.name}-labeltext`).should('contain', data.labelOn)
    })

    it('should set label off text on default', () => {
        cy.datacy(`${data.name}-labeltext`).should('contain', data.labelOff)
    })

    it('should translate ball when toggle', () => {
        cy.datacy(`${data.name}-ball`).should('not.have.class', 'translate-x-7')
        cy.datacy(`${data.name}-clickdiv`).click()
        cy.datacy(`${data.name}-ball`).should('have.class', 'translate-x-7')
    })
})
