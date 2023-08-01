import { MarriageFormPayload, Organisation, Person } from '../../types/lastWill'
import { SidebarPages } from '../../types/sidebar'
import {
	LastWillState,
	addOrganisationHeir,
	addPersonHeir,
	createTestator,
	initialState,
	lastWillReducer,
	removeHeir,
	setInheritance,
	setMarriage,
	setProgressKeys,
	setTestator,
	updateOrganisationHeir,
	updatePersonHeir,
} from './lastwill'

describe('lastWillSlice', () => {
	const initialStateTesting: LastWillState = initialState

	describe('inheritance', () => {
		it('should set inheritance', () => {
			const financialAsset = {
				id: 'ID_1',
				where: 'Meine Bank',
				amount: 100,
				currency: '€',
			}

			const item = {
				id: 'ID_3',
				name: 'Mein Fahrrad',
				description: 'Bitte damit fahren!',
			}

			const action = setInheritance({
				financialAssets: [financialAsset],
				items: [item],
			})

			const newState = lastWillReducer(initialStateTesting, action)

			expect(newState.data.financialAssets).to.have.lengthOf(1)
			expect(newState.data.financialAssets[0]).to.be.deep.equal(financialAsset)
			expect(newState.data.items).to.have.lengthOf(1)
			expect(newState.data.items[0]).to.be.deep.equal(item)
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

	describe('marriage', () => {
		const action: MarriageFormPayload = {
			name: 'John Doe',
			gender: 'male',
			birthDate: '1990-01-01',
			birthPlace: 'New York',
			moreInfos: ['isHandicapped', 'isBerlinWill'],
			street: 'Main St.',
			houseNumber: '123',
			zipCode: '12345',
			city: 'New York',
			isPartnerGermanCitizenship: ['isPartnerGermanCitizenship'],
			matrimonialProperty: 'communityOfGain',
			relationshipStatus: 'married',
		}

		const expectedPartnerObject = {
			type: 'partner',
			name: 'John Doe',
			gender: 'male',
			birthDate: '1990-01-01',
			birthPlace: 'New York',
			isHandicapped: true,
			isInsolvent: false,
			address: {
				street: 'Main St.',
				houseNumber: '123',
				zipCode: '12345',
				city: 'New York',
			},
		}

		beforeEach(() => {
			// Ensure that the initial state is empty
			expect(initialStateTesting.data.heirs).to.have.lengthOf(0)
		})

		it(`it should set partner data when ${setMarriage} is called`, () => {
			const newState = lastWillReducer(initialStateTesting, setMarriage(action))

			const partnerWithoutId = Cypress._.omit(newState.data.heirs[0], 'id')
			expect(partnerWithoutId).to.be.deep.equal(expectedPartnerObject)
		})

		it('should set relationshipStatus to married when setMarriage is called', () => {
			const newState = lastWillReducer(initialStateTesting, setMarriage(action))
			expect(newState.data.testator.relationshipStatus).to.equal('married')
		})

		it('should set isBerlinWill to true when setMarriage is called with isBerlinWill in moreInfos', () => {
			const newState = lastWillReducer(initialStateTesting, setMarriage(action))
			expect(newState.data.common.isBerlinWill).to.be.true
		})

		it('should set isPartnerGermanCitizenship to true when setMarriage is called with isPartnerGermanCitizenship', () => {
			const newState = lastWillReducer(initialStateTesting, setMarriage(action))
			expect(newState.data.common.isPartnerGermanCitizenship).to.be.true
		})

		it('should set matrimonialProperty to communityOfGain when setMarriage is called with matrimonialProperty as communityOfGain', () => {
			const newState = lastWillReducer(initialStateTesting, setMarriage(action))
			expect(newState.data.common.matrimonialProperty).to.equal('communityOfGain')
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

	describe('heirs', () => {
		describe('organisations', () => {
			it('should add an organisation heir', () => {
				const action = addOrganisationHeir({
					id: 'org_1',
					name: 'Organisation A',
					street: 'Street A',
					houseNumber: '1',
					zipCode: '12345',
					city: 'City A',
				})

				const newState = lastWillReducer(initialStateTesting, action)
				// Assert that the new heir has been added to the heirs list
				expect(newState.data.heirs).to.have.lengthOf(1)
				const expectedOrganisationHeir: Organisation = {
					id: 'org_1',
					type: 'organisation',
					name: 'Organisation A',
					address: {
						street: 'Street A',
						houseNumber: '1',
						zipCode: '12345',
						city: 'City A',
					},
				}
				expect(newState.data.heirs[0]).to.deep.equal(expectedOrganisationHeir)
			})

			it('should update an organisation heir', () => {
				// First, add an organisation heir to the state
				let newState = lastWillReducer(
					initialStateTesting,
					addOrganisationHeir({
						id: 'org_1',
						name: 'Organisation A',
						street: 'Street A',
						houseNumber: '1',
						zipCode: '12345',
						city: 'City A',
					})
				)

				// Then, update this heir
				const action = updateOrganisationHeir({
					id: 'org_1',
					name: 'Updated Organisation A',
				})
				newState = lastWillReducer(newState, action)

				// Assert that the heir has been updated
				expect(newState.data.heirs).to.have.lengthOf(1)
				expect(newState.data.heirs[0]).to.deep.include({ id: 'org_1', name: 'Updated Organisation A' })
			})
		})

		describe('persons', () => {
			it('should add a person heir', () => {
				const action = addPersonHeir({
					id: 'person_1',
					type: 'child',
					name: 'Person A',
					gender: 'male',
					birthDate: '2000-01-01',
					birthPlace: 'Place A',
					street: 'Street A',
					houseNumber: '1',
					zipCode: '12345',
					city: 'City A',
					moreInfos: [],
					childRelationShip: 'childTogether',
					ownChild: [],
				})

				const newState = lastWillReducer(initialStateTesting, action)
				// Assert that the new heir has been added to the heirs list
				expect(newState.data.heirs).to.have.lengthOf(1)
				const expectedPersonHeir: Person = {
					id: 'person_1',
					type: 'child',
					name: 'Person A',
					gender: 'male',
					birthDate: '2000-01-01',
					birthPlace: 'Place A',
					address: {
						street: 'Street A',
						houseNumber: '1',
						zipCode: '12345',
						city: 'City A',
					},
					isHandicapped: false,
					isInsolvent: false,
				}
				expect(newState.data.heirs[0]).to.deep.equal(expectedPersonHeir)
			})

			it('should update a person heir', () => {
				// First, add a person heir to the state
				let newState = lastWillReducer(
					initialStateTesting,
					addPersonHeir({
						id: 'person_1',
						type: 'child',
						name: 'Person A',
						gender: 'male',
						birthDate: '2000-01-01',
						birthPlace: 'Place A',
						street: 'Street A',
						houseNumber: '1',
						zipCode: '12345',
						city: 'City A',
						moreInfos: [],
						childRelationShip: 'childFromOther',
						ownChild: [],
					})
				)

				// Then, update this heir
				const action = updatePersonHeir({
					id: 'person_1',
					type: 'child',
					name: 'Updated Person A',
					gender: 'male',
					birthDate: '2000-01-01',
					birthPlace: 'Place A',
					street: 'Street A',
					houseNumber: '1',
					zipCode: '12345',
					city: 'City A',
					moreInfos: [],
					childRelationShip: 'childFromOther',
					ownChild: [],
				})
				newState = lastWillReducer(newState, action)

				// Assert that the heir has been updated
				expect(newState.data.heirs).to.have.lengthOf(1)
				expect(newState.data.heirs[0]).to.deep.include({ id: 'person_1', name: 'Updated Person A' })
			})
		})

		it('should remove an heir', () => {
			// First, add two heirs to the state
			let newState = lastWillReducer(
				initialStateTesting,
				addPersonHeir({
					id: 'person_1',
					type: 'child',
					name: 'Person A',
					gender: 'male',
					birthDate: '2000-01-01',
					birthPlace: 'Place A',
					street: 'Street A',
					houseNumber: '1',
					zipCode: '12345',
					city: 'City A',
					moreInfos: [],
					childRelationShip: 'childFromOther',
					ownChild: [],
				})
			)
			newState = lastWillReducer(
				newState,
				addOrganisationHeir({
					id: 'org_1',
					name: 'Organisation A',
					street: 'Street A',
					houseNumber: '1',
					zipCode: '12345',
					city: 'City A',
				})
			)

			// Then, remove one heir
			const action = removeHeir('person_1')
			newState = lastWillReducer(newState, action)

			// Assert that the heir has been removed
			expect(newState.data.heirs).to.have.lengthOf(1)
			expect(newState.data.heirs[0]).to.deep.include({ id: 'org_1', name: 'Organisation A' })
		})
	})
})