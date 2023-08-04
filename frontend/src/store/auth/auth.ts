import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { refreshTokenApi } from '../../services/api/auth/refreshToken'
import { LOCAL_STORAGE_KEY, createSession, getSession, setAndSaveSession } from '../../services/auth/session'
import { AuthErrorResponse, SessionData, TokensResponse } from '../../types/auth'

export type AuthState = {
	/** Check if user has session. */
	isAuthenticated: boolean
	/** Check if auth context is initialized. */
	isInitialized: boolean
	/** Session data. */
	sessionData: SessionData | null
	/** Error message register. */
	registerError: string | null
	/** Error message login. */
	loginError: string | null
}

const initialState: AuthState = {
	isAuthenticated: false,
	isInitialized: false,
	sessionData: null,
	registerError: null,
	loginError: null,
}

/**
 * Register a user and return the tokens.
 * @param credentials credentials from user
 * @returns the tokens.
 */
export const registerApi = createAsyncThunk<
	TokensResponse,
	{ email: string; password: string },
	{ rejectValue: AuthErrorResponse }
>('auth/register', async ({ email, password }, { rejectWithValue }) => {
	try {
		const response = await axios.post<TokensResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
			email,
			password,
		})

		const tokens = response.data
		return tokens
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return rejectWithValue(error.response.data)
		} else {
			throw new Error('Register failed.')
		}
	}
})

/**
 * Login a user and return the tokens.
 * @param credentials credentials from user
 * @returns the tokens.
 */
export const loginApi = createAsyncThunk<
	TokensResponse,
	{ email: string; password: string },
	{ rejectValue: AuthErrorResponse }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
	try {
		const response = await axios.post<TokensResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
			email,
			password,
		})

		const tokens = response.data
		return tokens
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return rejectWithValue(error.response.data)
		} else {
			throw new Error('Login failed.')
		}
	}
})

/**
 * Get session data from local storage and update the access token if it has expired.
 * @returns session data or null if no session data is found
 */
export const refreshToken = createAsyncThunk<SessionData, { bypassExpiryCheck: boolean }>(
	'auth/getSessionData',
	async ({ bypassExpiryCheck }, { rejectWithValue }) => {
		const parsedSessionData = getSession()

		// No session data found
		if (!parsedSessionData) return rejectWithValue('No session data found')

		// Return session data if access token is not expired
		if (!bypassExpiryCheck) {
			const sessionExpired = Date.now() > parsedSessionData.decodedAccessToken.exp * 1000
			if (!sessionExpired) return parsedSessionData
		}

		// Update token
		const tokens = await refreshTokenApi(parsedSessionData.refreshToken)

		// Refresh token failed
		if (tokens === null) {
			console.error('Session expired and refresh token failed')
			return rejectWithValue('Session expired and refresh token failed')
		}

		// Update session when refresh token succeeded
		const newSession = createSession(tokens)
		setAndSaveSession(newSession)

		return newSession
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			// Clear local storage
			localStorage.removeItem(LOCAL_STORAGE_KEY)

			// Clear state
			state.isAuthenticated = false
			state.sessionData = null
			state.registerError = null
			state.loginError = null
			state.isInitialized = true
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(refreshToken.pending, (state) => {
				state.isInitialized = false
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.isInitialized = true
				state.loginError = null
				state.registerError = null
				state.isAuthenticated = action.payload !== null
				state.sessionData = action.payload

				if (action.payload) {
					setAndSaveSession(action.payload)
				}
			})
			.addCase(refreshToken.rejected, (state, action) => {
				state.isInitialized = true
				state.isAuthenticated = false
				console.error(action.error.message, action.payload)
			})
			.addCase(loginApi.pending, (state) => {
				state.isInitialized = false
			})
			.addCase(loginApi.fulfilled, (state, action) => {
				state.isInitialized = true
				state.loginError = null
				state.registerError = null
				state.isAuthenticated = true
				state.sessionData = createSession(action.payload)
				setAndSaveSession(state.sessionData)
			})
			.addCase(loginApi.rejected, (state, action) => {
				if (action.payload?.message === 'Unauthorized' && action.payload?.statusCode === 401) {
					state.loginError = 'Hoppla! Die von Ihnen eingegebene E-Mail oder das Passwort ist falsch.'
				} else {
					state.loginError = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
				}
				state.isInitialized = true
				state.isAuthenticated = false
			})
			.addCase(registerApi.pending, (state) => {
				state.isInitialized = false
			})
			.addCase(registerApi.fulfilled, (state, action) => {
				state.isInitialized = true
				state.registerError = null
				state.loginError = null
				state.isAuthenticated = true
				state.sessionData = createSession(action.payload)
				setAndSaveSession(state.sessionData)
			})
			.addCase(registerApi.rejected, (state, action) => {
				if (action.payload?.message === 'Email is already taken.' && action.payload?.statusCode === 409) {
					state.registerError = 'Hoppla! Die von Ihnen eingegebene E-Mail ist bereits mit einem Konto verknüpft.'
				} else {
					state.registerError = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
				}
				state.isInitialized = true
				state.isAuthenticated = false
				console.error(action.error.message, action.payload)
			})
	},
})

export const authReducer = authSlice.reducer
export const { logout } = authSlice.actions
