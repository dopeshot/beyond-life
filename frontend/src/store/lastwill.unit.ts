import { SidebarPages } from '../types/sidebar'
import { LastWillState, lastWillReducer, setProgressKeys } from './lastwill'

describe('should add progress key to global store', () => {
	const initialState: LastWillState = {
		progressKeys: [],
		financialAssets: [],
		items: [],
	}

	it(`should add a progress key when ${setProgressKeys} is called`, () => {
		// Ensure that the initial state is empty
		expect(initialState.progressKeys).to.have.lengthOf(0)

		const action = setProgressKeys(SidebarPages.TESTATOR)
		const newState = lastWillReducer(initialState, action)

		// Ensure that the new state has the progress key
		expect(newState.progressKeys).to.have.lengthOf(1)
		expect(newState.progressKeys[0]).to.equal(SidebarPages.TESTATOR)
	})

	it('should not modify state when an unknown action type is provided', () => {
		// Ensure that the initial state is empty
		expect(initialState.progressKeys).to.have.lengthOf(0)

		const unknownAction = { type: 'UNKNOWN_ACTION', payload: {} }
		const newState = lastWillReducer(initialState, unknownAction)

		// Ensure that the state remains unchanged
		expect(newState).to.deep.equal(initialState)
	})
})
