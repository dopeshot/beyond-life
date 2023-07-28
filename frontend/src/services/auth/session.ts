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
 * Set the authorization header for axios.
 * @param accessToken access token
 */
export const setAxiosAuthHeader = (accessToken: string): void => {
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
}

/**
 * Refresh the access token using the refresh token.
 * @param refreshToken refresh token
 * @returns new access and refresh tokens
 */
export const refreshTokenApi = async (refreshToken: string): Promise<TokensResponse | null> => {
	try {
		const response = await axios.post<TokensResponse>(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
			{
				refresh_token: refreshToken,
			},
			{
				headers: {
					Authorization: 'Bearer ' + refreshToken,
				},
			}
		)
		const tokens = response.data

		return tokens
	} catch (error) {
		return null
	}
}
