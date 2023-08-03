import { SessionData } from '../../types/auth'
import { AuthState, authReducer, login, loginApi, logout, refreshToken, registerApi } from './auth'

describe('authSlice', () => {
	const initialSessionData: SessionData = {
		accessToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzdjNzUxMjk5MWJlYzg2ZjExY2RjNSIsImVtYWlsIjoidGVzdEB0ZXN0LnRlc3QiLCJoYXNWZXJpZmllZEVtYWlsIjpmYWxzZSwicGF5bWVudFBsYW4iOiJmcmVlIiwiaWF0IjoxNjkxMDA2MzA3LCJleHAiOjE2OTEwMDk5MDd9.fT9hswg-XKcYwibvc3YlO83T5djZkSJexDtGaVIBU4Y',
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzdjNzUxMjk5MWJlYzg2ZjExY2RjNSIsImVtYWlsIjoidGVzdEB0ZXN0LnRlc3QiLCJpYXQiOjE2OTEwMDYzMDcsImV4cCI6MTY5MTg3MDMwN30.I0e0XVh89PplkfaSW1R90PGJFbAMUaBD0fxxsK6_Lmk',
		decodedAccessToken: {
			id: '64c7c7512991bec86f11cdc5',
			email: 'test@test.test',
			hasVerifiedEmail: false,
			paymentPlan: 'free',
			iat: 1691006307,
			exp: 1691009907,
		},
	}

	const initialState: AuthState = {
		isAuthenticated: false,
		isInitialized: false,
		sessionData: null,
		loginError: null,
		registerError: null,
	}

	const tokens = {
		access_token: initialSessionData.accessToken,
		refresh_token: initialSessionData.refreshToken,
	}

	describe('login', () => {
		it('should set isAuthenticated to true and set sessionData when login action is dispatched', () => {
			const action = login(initialSessionData)
			const newState = authReducer(initialState, action)

			expect(newState.isAuthenticated).to.be.true
			expect(newState.sessionData).to.deep.equal(initialSessionData)
			expect(newState.isInitialized).to.be.true
		})
	})

	describe('logout', () => {
		it('should set isAuthenticated to false and clear sessionData when logout action is dispatched', () => {
			const loginAction = login(initialSessionData)
			let newState = authReducer(initialState, loginAction)

			expect(newState.isAuthenticated).to.be.true
			expect(newState.sessionData).to.deep.equal(initialSessionData)
			expect(newState.isInitialized).to.be.true

			const logoutAction = logout()
			newState = authReducer(newState, logoutAction)

			expect(newState.isAuthenticated).to.be.false
			expect(newState.sessionData).to.be.null
		})
	})

	describe('extraReducers', () => {
		it('sets isInitialized false when registerApi is pending', () => {
			const action = { type: registerApi.pending.type }
			const state = authReducer(initialState, action)
			expect(state).to.deep.equal({ ...initialState, isInitialized: false })
		})

		it('sets sessionData and isAuthenticated when registerApi is fulfilled', () => {
			const action = {
				type: registerApi.fulfilled.type,
				payload: tokens,
			}
			const state = authReducer(initialState, action)
			expect(state).to.deep.equal({
				...initialState,
				isInitialized: true,
				isAuthenticated: true,
				sessionData: initialSessionData,
			})
		})

		it('sets isAuthenticated false when registerApi is rejected', () => {
			const action = {
				type: registerApi.rejected.type,
				payload: {
					message: 'Email is already taken.',
					statusCode: 409,
				},
			}
			const state = authReducer(initialState, action)
			expect(state).to.deep.equal({
				...initialState,
				isInitialized: true,
				isAuthenticated: false,
				registerError: 'Hoppla! Die von Ihnen eingegebene E-Mail ist bereits mit einem Konto verknüpft.',
			})
		})

		it('sets isInitialized false when loginApi is pending', () => {
			const action = { type: loginApi.pending.type }
			const state = authReducer(initialState, action)
			expect(state).to.deep.equal({ ...initialState, isInitialized: false })
		})

		it('sets sessionData and isAuthenticated when loginApi is fulfilled', () => {
			const action = {
				type: loginApi.fulfilled.type,
				payload: tokens,
			}
			const state = authReducer(initialState, action)
			expect(state).to.deep.equal({
				...initialState,
				isInitialized: true,
				isAuthenticated: true,
				sessionData: initialSessionData,
			})
		})

		it('sets isAuthenticated false when loginApi is rejected', () => {
			const action = {
				type: loginApi.rejected.type,
				payload: {
					message: 'Unauthorized',
					statusCode: 401,
				},
			}
			const state = authReducer(initialState, action)
			expect(state).to.deep.equal({
				...initialState,
				isInitialized: true,
				isAuthenticated: false,
				loginError: 'Hoppla! Die von Ihnen eingegebene E-Mail oder das Passwort ist falsch.',
			})
		})

		it('sets isInitialized false when refreshToken is pending', () => {
			const action = { type: refreshToken.pending.type }
			const state = authReducer(initialState, action)
			expect(state).to.deep.equal({ ...initialState, isInitialized: false })
		})

		it('sets sessionData and isAuthenticated when refreshToken is fulfilled', () => {
			const action = {
				type: refreshToken.fulfilled.type,
				payload: initialSessionData,
			}
			const state = authReducer(initialState, action)
			expect(state).to.deep.equal({
				...initialState,
				isInitialized: true,
				isAuthenticated: true,
				sessionData: initialSessionData,
			})
		})

		it('sets isAuthenticated false when refreshToken is rejected', () => {
			const action = { type: refreshToken.rejected.type }
			const state = authReducer(initialState, action)
			expect(state).to.deep.equal({
				...initialState,
				isInitialized: true,
				isAuthenticated: false,
			})
		})
	})
})
