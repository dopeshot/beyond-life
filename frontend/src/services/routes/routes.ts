export const routes = {
	index: '/',
	account: {
		register: '/account/register',
		login: '/account/login',
		profile: '/account/profile',
		forgotPassword: '/account/forgot-password',
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
		testator: (id: string) => `/last-will/editor/testator?id=${id}`,
		marriage: (id: string) => `/last-will/editor/marriage?id=${id}`,
		heirs: (id: string) => `/last-will/editor/heirs?id=${id}`,
		inheritance: (id: string) => `/last-will/editor/inheritance?id=${id}`,
		succession: (id: string) => `/last-will/editor/succession?id=${id}`,
		buy: (options?: { id: string }) => {
			if (!options) return '/last-will/buy'

			const queryString = new URLSearchParams({
				...(options.id && { id: options.id }),
			}).toString()

			return `/last-will/buy${queryString !== '' ? `?${queryString}` : ''}`
		},
		final: (id: string) => `/last-will/editor/final?id=${id}`,
	},
	misc: {
		privacy: '/misc/privacy-policy',
		terms: '/misc/terms-of-service',
	},
}
