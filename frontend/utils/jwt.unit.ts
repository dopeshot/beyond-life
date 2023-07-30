import { parseJwt } from './jwt'

describe('parseJwt', () => {
	const validToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
	const invalidToken = 'invalid.token'
	const expectedPayload = {
		sub: '1234567890',
		name: 'John Doe',
		iat: 1516239022,
	}

	it('should return the payload of a valid JWT token', () => {
		const payload = parseJwt(validToken)
		expect(payload).to.deep.equal(expectedPayload)
	})

	it('should throw an error for an invalid JWT token', () => {
		expect(() => parseJwt(invalidToken)).to.throw('Unexpected token')
	})
})
