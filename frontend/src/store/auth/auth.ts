import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { refreshTokenApi } from '../../services/api/auth/refreshToken'
import {
	LOCAL_STORAGE_KEY,
	createSession,
	getSession,
	saveSession,
	setAxiosAuthHeader,
} from '../../services/auth/session'
import { AuthErrorResponse, SessionData, TokensResponse } from '../../types/auth'

export type AuthState = {
	/** Check if user has session. */
	isAuthenticated: boolean
	/** Check if auth context is loading. */
	isLoading: boolean
	/** Session data. */
	sessionData: SessionData | null
	/** Error message. */
	registerError: string | null
}

const initialState: AuthState = {
	isAuthenticated: false,
	isLoading: true, // TODO: add another state here to fix the flickering (e.g.: isInitialized)
	sessionData: null,
	registerError: null,
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

		setAxiosAuthHeader(tokens.access_token)

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

		setAxiosAuthHeader(tokens.access_token)

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
export const refreshToken = createAsyncThunk('auth/getSessionData', async () => {
	const parsedSessionData = getSession()

	// No session data found
	if (!parsedSessionData) return null

	// Return session data if access token is not expired
	if (Date.now() < parsedSessionData.decodedAccessToken.exp * 1000) return parsedSessionData

	// Update token if expired
	const tokens = await refreshTokenApi(parsedSessionData.refreshToken)

	// Refresh token failed
	if (tokens === null) {
		console.error('Session expired and refresh token failed')
		return null
	}

	// Update axios auth header
	setAxiosAuthHeader(tokens.access_token)

	// Update session when refresh token succeeded
	const newSession = createSession(tokens)
	saveSession(newSession)

	return newSession
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<SessionData>) => {
			state.isLoading = false
			state.isAuthenticated = true
			state.sessionData = action.payload

			saveSession(action.payload)
		},
		logout: (state) => {
			// Clear local storage
			localStorage.removeItem(LOCAL_STORAGE_KEY)

			// Clear state
			state.isAuthenticated = false
			state.isLoading = false
			state.sessionData = null
			state.registerError = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(refreshToken.pending, (state) => {
				state.isLoading = true
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.isLoading = false
				state.registerError = null
				state.isAuthenticated = action.payload !== null
				state.sessionData = action.payload
			})
			.addCase(refreshToken.rejected, (state) => {
				state.isLoading = false
				state.isAuthenticated = false
			})
			.addCase(loginApi.pending, (state) => {
				state.isLoading = true
			})
			.addCase(loginApi.fulfilled, (state, action) => {
				state.isLoading = false
				state.registerError = null
				state.isAuthenticated = true
				state.sessionData = createSession(action.payload)
				saveSession(state.sessionData)
			})
			.addCase(loginApi.rejected, (state) => {
				state.isLoading = false
				state.isAuthenticated = false
				// TODO: Add error message to frontend
			})
			.addCase(registerApi.pending, (state) => {
				state.isLoading = true
			})
			.addCase(registerApi.fulfilled, (state, action) => {
				state.isLoading = false
				state.registerError = null
				state.isAuthenticated = true
				state.sessionData = createSession(action.payload)
				saveSession(state.sessionData)
			})
			.addCase(registerApi.rejected, (state, action) => {
				if (action.payload?.message === 'Email is already taken.' && action.payload?.statusCode === 409) {
					state.registerError = 'Hoppla! Die von Ihnen eingegebene E-Mail ist bereits mit einem Konto verknüpft.'
				}
				state.isLoading = false
				state.isAuthenticated = false
			})
	},
})

export const authReducer = authSlice.reducer
export const { logout, login } = authSlice.actions
