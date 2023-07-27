export const routes = {
	index: '/',
	account: {
		register: (options?: { funnel: boolean }) => {
			if (!options) return '/account/register'

			const queryString = new URLSearchParams(`funnel=${options.funnel}`).toString()

			return `/account/register${queryString !== '' ? `?${queryString}` : ''}`
		},
		login: (options?: { funnel: boolean }) => {
			if (!options) return '/account/login'

			const queryString = new URLSearchParams(`funnel=${options.funnel}`).toString()

			return `/account/login${queryString !== '' ? `?${queryString}` : ''}`
		},
		profile: '/account/profile',
		resetPassword: '/account/reset-password',
	},
	profile: {
		myLastWills: '/profile/last-will',
		settings: '/profile/settings',
	},
	lastWill: {
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
		faq: {
			index: '/misc/faq',
			single: (slug: string) => `/misc/faq/${slug}`,
		},
		imprint: '/misc/imprint',
		privacy: '/misc/privacy',
	},
}
