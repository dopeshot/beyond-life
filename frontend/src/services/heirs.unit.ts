import { Organisation, Person } from '../types/lastWill'
import { determineHeirRelationship } from './heirs'

describe('determineHeirRelationship', function () {
	it('should return Bruder for male siblings', function () {
		const sibling: Person = {
			type: 'siblings',
			gender: 'male',
			id: '1',
		}
		const result = determineHeirRelationship(sibling)
		expect(result).to.equal('Bruder')
	})

	it('should return Schwester for female siblings', function () {
		const sibling: Person = {
			type: 'siblings',
			gender: 'female',
			id: '1',
		}
		const result = determineHeirRelationship(sibling)
		expect(result).to.equal('Schwester')
	})

	it('should return correct heir type for non-sibling persons', function () {
		const mother: Person = {
			type: 'mother',
			gender: 'female',
			id: '1',
		}
		const result = determineHeirRelationship(mother)
		expect(result).to.equal('Mutter')
	})

	it('should return correct heir type for organisations', function () {
		const org: Organisation = {
			type: 'organisation',
			id: '1',
		}
		const result = determineHeirRelationship(org)
		expect(result).to.equal('Organisation')
	})

	it('should return undefined for unknown heir types', function () {
		const unknown: any = {
			type: 'unknown',
			gender: 'male',
			id: '1',
		}
		const result = determineHeirRelationship(unknown)
		expect(result).to.equal(undefined)
	})
})
