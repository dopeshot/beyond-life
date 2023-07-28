import { SessionData } from '../../types/auth'
import { AuthState, authReducer, login, logout } from './auth'

describe('authSlice', () => {
	const initialSessionData: SessionData = {
		accessToken: 'test',
		decodedAccessToken: {
			id: 1,
			email: '',
			iat: 1,
			exp: 1,
		},
		refreshToken: 'test',
	}

	const initialState: AuthState = {
		isAuthenticated: false,
		isLoading: true,
		sessionData: null,
		registerError: null,
	}

	describe('login', () => {
		it('should set isAuthenticated to true and set sessionData when login action is dispatched', () => {
			const action = login(initialSessionData)
			const newState = authReducer(initialState, action)

			expect(newState.isAuthenticated).to.be.true
			expect(newState.sessionData).to.equal(initialSessionData)
			expect(newState.isLoading).to.be.false
		})
	})

	describe('logout', () => {
		it('should set isAuthenticated to false and clear sessionData when logout action is dispatched', () => {
			const loginAction = login(initialSessionData)
			let newState = authReducer(initialState, loginAction)

			expect(newState.isAuthenticated).to.be.true
			expect(newState.sessionData).to.equal(initialSessionData)
			expect(newState.isLoading).to.be.false

			const logoutAction = logout()
			newState = authReducer(newState, logoutAction)

			expect(newState.isAuthenticated).to.be.false
			expect(newState.sessionData).to.be.null
		})
	})

	// TODO: add extra reducers as well
})
