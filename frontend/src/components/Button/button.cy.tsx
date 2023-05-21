import 'material-symbols'
import '../../app/globals.css'
import { AnchorLink, Button } from './Button'

const primaryButtonClass = 'bg-yellow'
const secondaryButtonClass = 'bg-dark'
const tertiaryButtonClass = 'text-gray-500'

describe('Button', () => {
	describe('Primary Button', () => {
		it('should display primary button', () => {
			cy.mount(
				<Button datacy="button" kind="primary" onClick={() => ''}>
					Test
				</Button>
			)
			cy.datacy('button').should('have.class', primaryButtonClass)
		})

		describe('Icon', () => {
			it('should display icon start', () => {
				cy.mount(
					<Button kind="primary" icon="face" onClick={() => ''}>
						Test
					</Button>
				)
				cy.datacy('icon-start').should('be.visible')
			})

			it('should display icon end', () => {
				cy.mount(
					<Button kind="primary" icon="face" iconSlot="end" onClick={() => ''}>
						Test
					</Button>
				)
				cy.datacy('icon-end').should('be.visible')
			})
		})

		describe('Loading', () => {
			beforeEach(() => {
				cy.mount(
					<Button datacy="button" kind="primary" loading icon="face" onClick={() => ''}>
						Test
					</Button>
				)
			})

			it('should disable button when loading', () => {
				cy.datacy('button').should('have.class', 'text-opacity-75')
				cy.datacy('button').should('have.class', 'opacity-80')
				cy.datacy('button').should('be.disabled')
				cy.datacy('button').should('have.attr', 'disabled')
			})

			it('should show loading icon when loading', () => {
				cy.datacy('icon-start-loading').should('contain', 'sync')
			})
		})

		describe('Disabled', () => {
			beforeEach(() => {
				cy.mount(
					<Button datacy="button" kind="primary" disabled icon="face" onClick={() => ''}>
						Test
					</Button>
				)
			})

			it('should have disabled attribute', () => {
				cy.datacy('button').should('have.attr', 'disabled')
			})

			it('should have disabled classes', () => {
				cy.datacy('button').should('have.class', 'text-opacity-75')
				cy.datacy('button').should('have.class', 'opacity-80')
			})
		})
	})

	describe('Primary Link', () => {
		it('should display primary link', () => {
			cy.mount(
				<AnchorLink datacy="link" kind="primary" href="/">
					Test
				</AnchorLink>
			)
			cy.datacy('link').should('have.class', primaryButtonClass)
		})

		describe('Icon', () => {
			it('should display icon', () => {
				cy.mount(
					<AnchorLink kind="primary" icon="face" href="/">
						Test
					</AnchorLink>
				)
				cy.datacy('icon-start').should('be.visible')
			})
		})

		describe('Loading', () => {
			beforeEach(() => {
				cy.mount(
					<AnchorLink datacy="link" kind="primary" href="/" loading icon="face">
						Test
					</AnchorLink>
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
					<AnchorLink datacy="link" kind="primary" href="/" disabled icon="face">
						Test
					</AnchorLink>
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

	describe('Secondary button', () => {
		it('should display secondary button', () => {
			cy.mount(
				<Button datacy="button" kind="secondary" onClick={() => ''}>
					Test
				</Button>
			)
			cy.datacy('button').should('have.class', secondaryButtonClass)
		})

		describe('Icon', () => {
			it('should display icon', () => {
				cy.mount(
					<Button kind="secondary" icon="face" onClick={() => ''}>
						Test
					</Button>
				)
				cy.datacy('icon-start').should('be.visible')
			})
		})

		describe('Loading', () => {
			beforeEach(() => {
				cy.mount(
					<Button datacy="button" kind="secondary" loading icon="face" onClick={() => ''}>
						Test
					</Button>
				)
			})

			it('should disable button when loading', () => {
				cy.datacy('button').should('have.class', 'text-opacity-75')
				cy.datacy('button').should('have.class', 'opacity-80')
				cy.datacy('button').should('be.disabled')
				cy.datacy('button').should('have.attr', 'disabled')
			})

			it('should show loading icon when loading', () => {
				cy.datacy('icon-start-loading').should('contain', 'sync')
			})
		})

		describe('Disabled', () => {
			beforeEach(() => {
				cy.mount(
					<Button datacy="button" kind="secondary" disabled icon="face" onClick={() => ''}>
						Test
					</Button>
				)
			})

			it('should have disabled attribute', () => {
				cy.datacy('button').should('have.attr', 'disabled')
			})

			it('should have disabled classes', () => {
				cy.datacy('button').should('have.class', 'text-opacity-75')
				cy.datacy('button').should('have.class', 'opacity-80')
			})
		})
	})

	describe('Secondary link', () => {
		it('should display secondary link', () => {
			cy.mount(
				<AnchorLink datacy="link" kind="secondary" href="/">
					Test
				</AnchorLink>
			)
			cy.datacy('link').should('have.class', secondaryButtonClass)
		})

		describe('Icon', () => {
			it('should display icon', () => {
				cy.mount(
					<AnchorLink kind="secondary" icon="face" href="/">
						Test
					</AnchorLink>
				)
				cy.datacy('icon-start').should('be.visible')
			})
		})

		describe('Loading', () => {
			beforeEach(() => {
				cy.mount(
					<AnchorLink datacy="link" kind="secondary" href="/" loading icon="face">
						Test
					</AnchorLink>
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
					<AnchorLink datacy="link" kind="secondary" href="/" disabled icon="face">
						Test
					</AnchorLink>
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

	describe('Tertiary button', () => {
		it('should display tertiary button', () => {
			cy.mount(
				<Button datacy="button" kind="tertiary" onClick={() => ''}>
					Test
				</Button>
			)
			cy.datacy('button').should('have.class', tertiaryButtonClass)
		})

		describe('Icon', () => {
			it('should display icon', () => {
				cy.mount(
					<Button kind="tertiary" icon="face" onClick={() => ''}>
						Test
					</Button>
				)
				cy.datacy('icon-start').should('be.visible')
			})
		})

		describe('Loading', () => {
			beforeEach(() => {
				cy.mount(
					<Button datacy="button" kind="tertiary" loading icon="face" onClick={() => ''}>
						Test
					</Button>
				)
			})

			it('should disable button when loading', () => {
				cy.datacy('button').should('have.class', 'text-opacity-75')
				cy.datacy('button').should('have.class', 'opacity-80')
				cy.datacy('button').should('be.disabled')
				cy.datacy('button').should('have.attr', 'disabled')
			})

			it('should show loading icon when loading', () => {
				cy.datacy('icon-start-loading').should('contain', 'sync')
			})
		})

		describe('Disabled', () => {
			beforeEach(() => {
				cy.mount(
					<Button datacy="button" kind="tertiary" disabled icon="face" onClick={() => ''}>
						Test
					</Button>
				)
			})

			it('should have disabled attribute', () => {
				cy.datacy('button').should('have.attr', 'disabled')
			})

			it('should have disabled classes', () => {
				cy.datacy('button').should('have.class', 'text-opacity-75')
				cy.datacy('button').should('have.class', 'opacity-80')
			})
		})
	})

	describe('Tertiary link', () => {
		it('should display tertiary link', () => {
			cy.mount(
				<AnchorLink datacy="link" kind="tertiary" href="/">
					Test
				</AnchorLink>
			)
			cy.datacy('link').should('have.class', tertiaryButtonClass)
		})

		describe('Icon', () => {
			it('should display icon', () => {
				cy.mount(
					<AnchorLink kind="tertiary" icon="face" href="/">
						Test
					</AnchorLink>
				)
				cy.datacy('icon-start').should('be.visible')
			})
		})

		describe('Loading', () => {
			beforeEach(() => {
				cy.mount(
					<AnchorLink datacy="link" kind="tertiary" href="/" loading icon="face">
						Test
					</AnchorLink>
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
					<AnchorLink datacy="link" kind="tertiary" href="/" disabled icon="face">
						Test
					</AnchorLink>
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
