import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {
	LOCAL_STORAGE_KEY,
	createSession,
	refreshToken,
	saveSession,
	setAxiosAuthHeader,
} from '../../services/auth/session'
import { SessionData, Tokens } from '../../types/auth'

export type AuthState = {
	/** Check if user has session. */
	isAuthenticated: boolean
	/** Check if auth context is loading. */
	isLoading: boolean
	/** Session data. */
	sessionData: SessionData | null
}

const initialState: AuthState = {
	isAuthenticated: false,
	isLoading: true,
	sessionData: null,
}

/**
 * Register a user and return the tokens.
 * @param credentials credentials from user
 * @returns the tokens.
 */
export const registerApi = createAsyncThunk(
	'auth/register',
	async ({ email, password }: { email: string; password: string }) => {
		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, { email, password })
			const tokens: Tokens = await response.data

			setAxiosAuthHeader(tokens.access_token)

			return tokens
		} catch (error) {
			throw new Error('Register failed.')
		}
	}
)

/**
 * Login a user and return the tokens.
 * @param credentials credentials from user
 * @returns the tokens.
 */
export const loginApi = createAsyncThunk(
	'auth/login',
	async ({ email, password }: { email: string; password: string }) => {
		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			})
			const tokens: Tokens = await response.data

			setAxiosAuthHeader(tokens.access_token)

			return tokens
		} catch (error) {
			throw new Error('Login failed.')
		}
	}
)

/**
 * Get session data from local storage and update the access token if it has expired.
 * @returns session data or null if no session data is found
 */
export const getSessionData = createAsyncThunk('auth/getSessionData', async () => {
	// Get session from local storage
	const sessionData = localStorage.getItem(LOCAL_STORAGE_KEY)

	if (sessionData) {
		const parsedSessionData: SessionData = JSON.parse(sessionData)

		// Update token if expired
		if (Date.now() > parsedSessionData.decodedAccessToken.exp * 1000) {
			const tokens = await refreshToken(parsedSessionData.refreshToken)

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
		}

		// Token is still valid
		return parsedSessionData
	}

	// No session data found
	return null
})

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
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSessionData.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getSessionData.fulfilled, (state, action) => {
				state.isLoading = false
				state.isAuthenticated = action.payload !== null
				state.sessionData = action.payload
			})
			.addCase(getSessionData.rejected, (state) => {
				state.isLoading = false
				state.isAuthenticated = false
			})
			.addCase(loginApi.pending, (state) => {
				state.isLoading = true
			})
			.addCase(loginApi.fulfilled, (state, action) => {
				state.isAuthenticated = true
				state.sessionData = createSession(action.payload)
			})
			.addCase(registerApi.pending, (state) => {
				state.isLoading = true
			})
			.addCase(registerApi.fulfilled, (state, action) => {
				state.isAuthenticated = true
				state.sessionData = createSession(action.payload)
			})
	},
})

export const authReducer = authSlice.reducer
export const { logout } = authSlice.actions
