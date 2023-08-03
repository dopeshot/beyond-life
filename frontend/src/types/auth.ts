import { HttpStatusCode } from 'axios'

export type TokensResponse = {
	access_token: string
	refresh_token: string
}

export type SessionData = {
	accessToken: string
	decodedAccessToken: {
		id: string
		email: string
		iat: number
		exp: number
		hasVerifiedEmail: boolean
		paymentPlan: 'family' | 'single' | 'free'
	}
	refreshToken: string
}

export type AuthErrorResponse = {
	error: string
	message: string
	statusCode: HttpStatusCode
}
