import { SidebarPages } from '../types/sidebar'
import { LastWillState, initialState, lastWillReducer, setInheritance, setProgressKeys } from './lastwill'

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