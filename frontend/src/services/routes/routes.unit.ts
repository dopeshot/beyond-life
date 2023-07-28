import { routes } from './routes'

describe('Router', () => {
	describe('account routes', () => {
		it('should return account register path', () => {
			expect(routes.account.register()).to.equal('/account/register')
		})

		it('should return account login path', () => {
			expect(routes.account.login()).to.equal('/account/login')
		})
	})

	describe('lastWill routes', () => {
		const ID = 'test-id'

		it('should return lastWill auth path', () => {
			expect(routes.lastWill.auth()).to.equal('/last-will/auth')
			expect(routes.lastWill.auth({ id: ID })).to.equal(`/last-will/auth?id=${ID}`)
		})

		it('should return lastWill testator path with id', () => {
			expect(routes.lastWill.testator(ID)).to.equal(`/last-will/editor/testator?id=${ID}`)
		})

		it('should return lastWill marriage path with id', () => {
			expect(routes.lastWill.marriage(ID)).to.equal(`/last-will/editor/marriage?id=${ID}`)
		})

		it('should return lastWill heirs path with id', () => {
			expect(routes.lastWill.heirs(ID)).to.equal(`/last-will/editor/heirs?id=${ID}`)
		})

		it('should return lastWill inheritance path with id', () => {
			expect(routes.lastWill.inheritance(ID)).to.equal(`/last-will/editor/inheritance?id=${ID}`)
		})

		it('should return lastWill succession path with id', () => {
			expect(routes.lastWill.succession(ID)).to.equal(`/last-will/editor/succession?id=${ID}`)
		})

		it('should return lastWill buy path', () => {
			expect(routes.lastWill.buy()).to.equal('/last-will/buy')
			expect(routes.lastWill.buy({ id: ID })).to.equal(`/last-will/buy?id=${ID}`)
		})

		it('should return lastWill final path with id', () => {
			expect(routes.lastWill.final(ID)).to.equal(`/last-will/editor/final?id=${ID}`)
		})
	})

	describe('misc routes', () => {
		it('should return imprint path', () => {
			expect(routes.misc.imprint).to.equal('/misc/imprint')
		})

		it('should return privacy policy path', () => {
			expect(routes.misc.privacy).to.equal('/misc/privacy-policy')
		})

		it('should return faq overview', () => {
			expect(routes.misc.faq.index).to.equal('/misc/faq')
		})

		it('should return faq question', () => {
			expect(routes.misc.faq.single('test')).to.equal('/misc/faq/test')
		})
	})
})
