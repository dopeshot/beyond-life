import * as NextRouter from 'next/router'
import "../styles/globals.css"
import LinkComponent from './Link'

describe('<LinkComponent />', () => {
  it('renders', () => {
    const push = cy.stub()
    const pathname = '/test'
    cy.stub(NextRouter, 'useRouter').returns({ pathname, push })

    cy.mount(<LinkComponent href="/" locale="de">Test</LinkComponent>)
  })
})