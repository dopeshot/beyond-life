import '../../../app/globals.css'
import { ProfileSideBarLink } from './ProfileSideBarLink'

describe('ProfileSideBarLink', () => {
	describe('Default Render', () => {
		beforeEach(() => {
			cy.mount(
				<ProfileSideBarLink datacy="profile-sidebar-link" href="/profile">
					Profile
				</ProfileSideBarLink>
			)
		})

		it('should display profile sidebar link', () => {
			cy.datacy('profile-sidebar-link').should('be.visible')
		})
	})

	describe('Href Prop', () => {
		it('renders a link with href', () => {
			cy.mount(
				<ProfileSideBarLink datacy="profile-sidebar-link" href="/profile">
					Profile
				</ProfileSideBarLink>
			)
			cy.datacy('profile-sidebar-link').should('have.attr', 'href', '/profile')
		})

		it('prevents click when link is active', () => {
			cy.mount(
				<ProfileSideBarLink datacy="profile-sidebar-link" href="/profile" isActive>
					Profile
				</ProfileSideBarLink>
			)
			cy.datacy('profile-sidebar-link').should('have.attr', 'href', '')
		})
	})

	describe('OnClick Prop', () => {
		it('renders a button with onClick', () => {
			cy.mount(
				<ProfileSideBarLink datacy="profile-sidebar-link" onClick={() => console.log('Clicked!')}>
					Click me
				</ProfileSideBarLink>
			)
			cy.datacy('profile-sidebar-link').should('be.visible')
		})

		it('disables button when link is active', () => {
			cy.mount(
				<ProfileSideBarLink datacy="profile-sidebar-link" onClick={() => console.log('Clicked!')} isActive>
					Click me
				</ProfileSideBarLink>
			)
			cy.datacy('profile-sidebar-link').should('be.disabled')
		})
	})

	describe('IsActive Prop', () => {
		it('renders an active link', () => {
			cy.mount(
				<ProfileSideBarLink datacy="profile-sidebar-link" href="/profile" isActive>
					Profile
				</ProfileSideBarLink>
			)
			cy.datacy('profile-sidebar-link').should('have.class', 'border-2 border-red text-red rounded-xl p-3')
		})

		it('renders an inactive link', () => {
			cy.mount(
				<ProfileSideBarLink datacy="profile-sidebar-link" href="/profile">
					Profile
				</ProfileSideBarLink>
			)
			cy.datacy('profile-sidebar-link').should('have.class', 'text-gray-500 hover:text-gray-700 pt-4 p-3')
			cy.datacy('profile-sidebar-link').should('not.have.class', 'border-2 border-red text-red rounded-xl p-3')
		})
	})
})
