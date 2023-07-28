import axios from 'axios'
import { TokensResponse } from '../../../types/auth'

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
