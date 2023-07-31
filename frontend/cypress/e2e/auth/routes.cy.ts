const clientBaseUrl = Cypress.env('CYPRESS_BASE_URL')

describe('Routes protected/guest', () => {
	describe('Protected Route', () => {
		it('should redirect to login when not logged in', () => {
			// Visit profile
			cy.visit('/profile/last-will')

			// Should be at login
			cy.url().should('include', '/account/login')
		})

		it('should show page when logged in', () => {
			// Login and visit profile
			cy.login({
				route: '/profile/last-will',
			})

			// Should be at profile
			cy.url().should('include', '/profile/last-will')
		})
	})

	describe('Guest Route', () => {
		it('should redirect to / when logged in and visit login (guest route)', () => {
			// Login and visit login page
			cy.login({
				route: '/account/login',
			})

			// Redirected to /
			cy.url().should('include', '/profile/last-will')
		})

		it('should show page (login guest route) when not logged in', () => {
			// Guest route
			cy.visit('/account/login')

			// Stays on login
			cy.url().should('include', '/account/login')
		})

		it('should not show profile when guest', () => {
			// Visit profile
			cy.visit('/profile/last-will')

			// Should never see profile
			cy.contains('Profile', { timeout: 0 }).should('not.exist')
			cy.url().should('include', '/profile/last-will')
		})
	})

	describe('Public Route', () => {
		it('should show page when logged in', () => {
			// Login and visit home page
			cy.login({
				route: '/',
			})

			// Should be at home
			cy.url().should('eq', clientBaseUrl + '/')
		})

		it('should show page when guest', () => {
			// Visit home page
			cy.visit('/')

			// Should be at home
			cy.url().should('eq', clientBaseUrl + '/')
		})
	})
})

export {}
