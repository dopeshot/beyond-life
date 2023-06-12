export const routes = {
	index: '/',
	account: {
		register: '/account/register',
		login: '/account/login',
		profile: '/account/profile',
	},
	lastWill: {
		index: '/last-will',
		start: '/last-will/start',
		auth: (options?: { id: string }) => {
			if (!options) return '/last-will/auth'

			const queryString = new URLSearchParams({
				...(options.id && { id: options.id }),
			}).toString()

			return `/last-will/auth${queryString !== '' ? `?${queryString}` : ''}`
		},
		testator: (id: string) => `/last-will/${id}/testator`,
		marriage: (id: string) => `/last-will/${id}/marriage`,
		heirs: (id: string) => `/last-will/${id}/heirs`,
		inheritance: (id: string) => `/last-will/${id}/inheritance`,
		succession: (id: string) => `/last-will/${id}/succession`,
		buy: (options?: { id: string }) => {
			if (!options) return '/last-will/buy'

			const queryString = new URLSearchParams({
				...(options.id && { id: options.id }),
			}).toString()

			return `/last-will/buy${queryString !== '' ? `?${queryString}` : ''}`
		},
		final: (id: string) => `/last-will/${id}/final`,
	},
	misc: {
		privacy: '/misc/privacy-policy',
		terms: '/misc/terms-of-service',
	},
}
