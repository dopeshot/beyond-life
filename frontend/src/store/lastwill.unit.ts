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

		expect(newState.progressKeys).to.have.lengthOf(1)
		expect(newState.progressKeys[0]).to.equal(SidebarPages.TESTATOR)
	})
})
