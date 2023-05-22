import 'material-symbols'
import '../../../app/globals.css'
import { Route } from './Route'

const primaryButtonClass = 'bg-yellow'
const secondaryButtonClass = 'bg-dark'
const tertiaryButtonClass = 'text-gray-500'

describe('Route', () => {
	describe('Primary Link', () => {
		it('should display primary link', () => {
			cy.mount(
				<Route datacy="link" kind="primary" href="/">
					Test
				</Route>
			)
			cy.datacy('link').should('have.class', primaryButtonClass)
		})

		describe('Icon', () => {
			it('should display icon', () => {
				cy.mount(
					<Route kind="primary" icon="face" href="/">
						Test
					</Route>
				)
				cy.datacy('icon-start').should('be.visible')
			})
		})

		describe('Loading', () => {
			beforeEach(() => {
				cy.mount(
					<Route datacy="link" kind="primary" href="/" loading icon="face">
						Test
					</Route>
				)
			})

			it('should disable link when loading', () => {
				cy.datacy('link').should('have.class', 'text-opacity-75')
				cy.datacy('link').should('have.class', 'opacity-80')
				cy.datacy('link').should('have.css', 'pointer-events', 'none')
			})

			it('should show loading icon when loading', () => {
				cy.datacy('icon-start-loading').should('contain', 'sync')
			})
		})

		describe('Disabled', () => {
			beforeEach(() => {
				cy.mount(
					<Route datacy="link" kind="primary" href="/" disabled icon="face">
						Test
					</Route>
				)
			})

			it('should have pointer event none', () => {
				cy.datacy('link').should('have.css', 'pointer-events', 'none')
			})

			it('should have disabled classes', () => {
				cy.datacy('link').should('have.class', 'text-opacity-75')
				cy.datacy('link').should('have.class', 'opacity-80')
			})
		})
	})

	describe('Secondary link', () => {
		it('should display secondary link', () => {
			cy.mount(
				<Route datacy="link" kind="secondary" href="/">
					Test
				</Route>
			)
			cy.datacy('link').should('have.class', secondaryButtonClass)
		})

		describe('Icon', () => {
			it('should display icon', () => {
				cy.mount(
					<Route kind="secondary" icon="face" href="/">
						Test
					</Route>
				)
				cy.datacy('icon-start').should('be.visible')
			})
		})

		describe('Loading', () => {
			beforeEach(() => {
				cy.mount(
					<Route datacy="link" kind="secondary" href="/" loading icon="face">
						Test
					</Route>
				)
			})

			it('should disable link when loading', () => {
				cy.datacy('link').should('have.class', 'text-opacity-75')
				cy.datacy('link').should('have.class', 'opacity-80')
				cy.datacy('link').should('have.css', 'pointer-events', 'none')
			})

			it('should show loading icon when loading', () => {
				cy.datacy('icon-start-loading').should('contain', 'sync')
			})
		})

		describe('Disabled', () => {
			beforeEach(() => {
				cy.mount(
					<Route datacy="link" kind="secondary" href="/" disabled icon="face">
						Test
					</Route>
				)
			})

			it('should have pointer event none', () => {
				cy.datacy('link').should('have.css', 'pointer-events', 'none')
			})

			it('should have disabled classes', () => {
				cy.datacy('link').should('have.class', 'text-opacity-75')
				cy.datacy('link').should('have.class', 'opacity-80')
			})
		})
	})

	describe('Tertiary link', () => {
		it('should display tertiary link', () => {
			cy.mount(
				<Route datacy="link" kind="tertiary" href="/">
					Test
				</Route>
			)
			cy.datacy('link').should('have.class', tertiaryButtonClass)
		})

		describe('Icon', () => {
			it('should display icon', () => {
				cy.mount(
					<Route kind="tertiary" icon="face" href="/">
						Test
					</Route>
				)
				cy.datacy('icon-start').should('be.visible')
			})
		})

		describe('Loading', () => {
			beforeEach(() => {
				cy.mount(
					<Route datacy="link" kind="tertiary" href="/" loading icon="face">
						Test
					</Route>
				)
			})

			it('should disable link when loading', () => {
				cy.datacy('link').should('have.class', 'text-opacity-75')
				cy.datacy('link').should('have.class', 'opacity-80')
				cy.datacy('link').invoke('attr', 'href').should('eq', '')
			})

			it('should show loading icon when loading', () => {
				cy.datacy('icon-start-loading').should('contain', 'sync')
			})
		})

		describe('Disabled', () => {
			beforeEach(() => {
				cy.mount(
					<Route datacy="link" kind="tertiary" href="/" disabled icon="face">
						Test
					</Route>
				)
			})

			it('should have empty href', () => {
				cy.datacy('link').invoke('attr', 'href').should('eq', '')
			})

			it('should have disabled classes', () => {
				cy.datacy('link').should('have.class', 'text-opacity-75')
				cy.datacy('link').should('have.class', 'opacity-80')
			})
		})
	})
})

export {}
