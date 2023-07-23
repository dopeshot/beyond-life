import { Tokens } from '../../types/auth'

/**
 * Register a user and return the tokens.
 * @param credentials credentials from user
 * @returns the tokens.
 */
export const register = async ({ email, password }: { email: string; password: string }): Promise<Tokens | null> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})
		const data: Tokens = await response.json()

		return data
	} catch (error) {
		throw new Error('Register failed.')
	}
}
