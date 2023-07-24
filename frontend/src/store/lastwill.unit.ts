import { SidebarPages } from '../types/sidebar'
import {
	LastWillState,
	createTestator,
	initialState,
	lastWillReducer,
	setInheritance,
	setProgressKeys,
	setTestator,
} from './lastwill'

describe('lastWillSlice', () => {
	const initialStateTesting: LastWillState = {
		...initialState,
		// Override data if needed
	}

	describe('inheritance', () => {
		it('should set inheritance', () => {
			const action = setInheritance({
				financialAssets: [
					{
						id: 'ID_1',
						where: 'Meine Bank',
						amount: 100,
						currency: '€',
					},
				],
				items: [
					{
						id: 'ID_3',
						name: 'Mein Fahrrad',
						description: 'Bitte damit fahren!',
					},
				],
			})
			const newState = lastWillReducer(initialStateTesting, action)

			expect(newState.data.financialAssets).to.have.lengthOf(1)
			expect(newState.data.financialAssets[0].id).to.equal('ID_1')
			expect(newState.data.items).to.have.lengthOf(1)
			expect(newState.data.items[0].id).to.equal('ID_3')
		})
	})

	describe('testator', () => {
		it("should convert the testator's moreInfos to booleans", () => {
			const action = setTestator({
				name: 'Max Mustermann',
				birthDate: '2000-01-01',
				birthPlace: 'Musterstadt',
				zipCode: '12345',
				city: 'Musterstadt',
				street: 'Musterstraße 1',
				moreInfos: ['isHandicapped', 'isInsolvent'],
			})
			const newState = lastWillReducer(initialStateTesting, action)

			expect(newState.data.testator.isHandicapped).to.equal(true)
			expect(newState.data.testator.isInsolvent).to.equal(true)
		})

		it("should convert testator's payload to testator", () => {
			const payload = {
				name: 'Max Mustermann',
				birthDate: '2000-01-01',
				birthPlace: 'Musterstadt',
				zipCode: '12345',
				city: 'Musterstadt',
				street: 'Musterstraße 1',
				moreInfos: ['isInsolvent'],
			}

			const testator = {
				name: 'Max Mustermann',
				birthDate: '2000-01-01',
				birthPlace: 'Musterstadt',
				zipCode: '12345',
				city: 'Musterstadt',
				street: 'Musterstraße 1',
				isHandicapped: false,
				isInsolvent: true,
			}

			expect(createTestator(payload)).to.deep.equal(testator)
		})
		it('should set testator', () => {
			const action = setTestator({
				name: 'Max Mustermann',
				birthDate: '2000-01-01',
				birthPlace: 'Musterstadt',

				zipCode: '12345',
				city: 'Musterstadt',
				street: 'Musterstraße 1',
				moreInfos: ['isHandicapped'],
			})
			const newState = lastWillReducer(initialStateTesting, action)

			const testator = {
				name: 'Max Mustermann',
				birthDate: '2000-01-01',
				birthPlace: 'Musterstadt',

				zipCode: '12345',
				city: 'Musterstadt',
				street: 'Musterstraße 1',
				isHandicapped: true,
				isInsolvent: false,
			}

			expect(newState.data.testator).to.deep.equal(testator)
		})
	})
	describe('progress keys', () => {
		it(`should add a progress key when ${setProgressKeys} is called`, () => {
			// Ensure that the initial state is empty
			expect(initialStateTesting.data.progressKeys).to.have.lengthOf(0)

			const action = setProgressKeys(SidebarPages.TESTATOR)
			const newState = lastWillReducer(initialStateTesting, action)

			// Ensure that the new state has the progress key
			expect(newState.data.progressKeys).to.have.lengthOf(1)
			expect(newState.data.progressKeys[0]).to.equal(SidebarPages.TESTATOR)
		})

		it('should not modify state when an unknown action type is provided', () => {
			// Ensure that the initial state is empty
			expect(initialStateTesting.data.progressKeys).to.have.lengthOf(0)

			const unknownAction = { type: 'UNKNOWN_ACTION', payload: {} }
			const newState = lastWillReducer(initialStateTesting, unknownAction)

			// Ensure that the state remains unchanged
			expect(newState).to.deep.equal(initialStateTesting)
		})
	})

	// TODO: Add reset tests
})
