import { Organisation, Person, PersonType } from '../types/lastWill'
import {
	determineHeirRelationship,
	getHeirsWithoutPercentage,
	getPercentageLeftPerHeir,
	getSumOfPercentage,
} from './heirs'

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
		const unknown: Person = {
			type: 'unknown' as PersonType,
			gender: 'male',
			id: '1',
		}
		const result = determineHeirRelationship(unknown)
		expect(result).to.equal(undefined)
	})

	describe('Heir percentage functions', function () {
		const heirs: (Person | Organisation)[] = [
			{
				id: '1',
				type: 'child',
				name: 'John',
				percentage: 20,
			},
			{
				id: '2',
				type: 'partner',
				name: 'Jane',
				percentage: undefined,
			},
			{
				id: '3',
				type: 'organisation',
				name: 'Org',
				percentage: 30,
			},
			{
				id: '4',
				type: 'father',
				name: 'Bob',
				percentage: undefined,
			},
		]

		describe('getHeirsWithoutPercentage', function () {
			it('should return heirs without percentage', function () {
				const result = getHeirsWithoutPercentage(heirs)
				expect(result).to.have.lengthOf(2)
				expect(result[0].name).to.equal('Jane')
				expect(result[1].name).to.equal('Bob')
			})
		})

		describe('getSumOfPercentage', function () {
			it('should return sum of heirs percentages', function () {
				const result = getSumOfPercentage(heirs)
				expect(result).to.equal(50)
			})
		})

		describe('getPercentageLeftPerHeir', function () {
			it('should return percentage left per heir', function () {
				const result = getPercentageLeftPerHeir(heirs)
				expect(result).to.equal(25)
			})
		})
	})
})
