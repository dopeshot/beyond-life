import axios from 'axios'
import { parseJwt } from '../../../utils/jwt'
import { SessionData, TokensResponse } from '../../types/auth'

export const LOCAL_STORAGE_KEY = 'session'

/**
 * Create a session object from the tokens.
 * @param tokens access and refresh tokens
 * @returns session object
 */
export const createSession = (tokens: TokensResponse) => {
	const { access_token, refresh_token } = tokens

	// Decode access token
	const decodedAccessToken = parseJwt(access_token)

	// Create session object
	const sessionData: SessionData = {
		accessToken: access_token,
		refreshToken: refresh_token,
		decodedAccessToken,
	}

	return sessionData
}

/**
 * Save session data in local storage.
 * @param sessionData session data to save in local storage
 */
export const saveSession = (sessionData: SessionData): void => {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessionData))
}

/**
 * Remove session data from local storage.
 */
export const endSession = (): void => {
	localStorage.removeItem(LOCAL_STORAGE_KEY)
}

/**
 * Get the session data from local storage.
 * @returns session data or null if not found or an error occurred
 */
export const getSession = (): SessionData | null => {
	try {
		const sessionData = localStorage.getItem(LOCAL_STORAGE_KEY)
		if (!sessionData) return null
		return JSON.parse(sessionData)
	} catch (error) {
		return null
	}
}

/**
 * Set the authorization header for axios.
 * @param accessToken access token
 */
export const setAxiosAuthHeader = (accessToken: string): void => {
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
}
