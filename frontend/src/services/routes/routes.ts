export const routes = {
	index: '/',
	account: {
		register: '/account/register',
		login: '/account/login',
		profile: '/account/profile',
	},
	lastWill: {
		index: '/',
		start: '/start',
		auth: (options?: { id: string }) => {
			if (!options) return '/auth'

			const queryString = new URLSearchParams({
				...(options.id && { id: options.id }),
			}).toString()

			return `/auth${queryString !== '' ? `?${queryString}` : ''}`
		},
		testator: (id: string) => `/editor/testator?id=${id}`,
		marriage: (id: string) => `/editor/marriage?id=${id}`,
		heirs: (id: string) => `/editor/heirs?id=${id}`,
		inheritance: (id: string) => `/editor/inheritance?id=${id}`,
		succession: (id: string) => `/editor/succession?id=${id}`,
		buy: (options?: { id: string }) => {
			if (!options) return '/buy'

			const queryString = new URLSearchParams({
				...(options.id && { id: options.id }),
			}).toString()

			return `/buy${queryString !== '' ? `?${queryString}` : ''}`
		},
		final: (id: string) => `/editor/final?id=${id}`,
	},
	misc: {
		privacy: '/misc/privacy-policy',
		terms: '/misc/terms-of-service',
	},
}
