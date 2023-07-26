export type TokensResponse = {
	access_token: string
	refresh_token: string
}

export type SessionData = {
	accessToken: string
	decodedAccessToken: {
		id: number
		email: string
		iat: number
		exp: number
	}
	refreshToken: string
}
