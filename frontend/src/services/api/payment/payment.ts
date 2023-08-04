import axios from 'axios'

/**
 * Start a new checkout session
 * @param plan the plan to subscribe to
 * @returns the checkout url
 */
export const createCheckoutSession = async (plan: 'single' | 'family'): Promise<string> => {
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/checkout`, {
			plan,
		})
		return response.data.url
	} catch (error) {
		return 'ERROR'
	}
}
