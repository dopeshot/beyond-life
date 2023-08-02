import axios from 'axios'

/**
 * Start a new checkout session
 * @param plan the plan to subscribe to
 * @returns the checkout url
 */
export const createCheckoutSession = async (plan: 'single' | 'family'): Promise<string> => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/checkout`, {
		plan,
	})
	return response.data.url
}
