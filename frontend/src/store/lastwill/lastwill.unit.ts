import {
	LastWillState,
	MarriageFormPayload,
	Organisation,
	OrganisationFormPayload,
	Person,
	PersonFormPayload,
	SuccessionFormPayload,
	Testator,
	TestatorFormPayload,
} from '../../types/lastWill'
import { SidebarPages } from '../../types/sidebar'
import {
	addOrganisationHeir,
	addPersonHeir,
	createTestator,
	initialState,
	lastWillReducer,
	patchOrganisation,
	patchPerson,
	removeHeir,
	setInheritance,
	setMarriage,
	setProgressKeys,
	setSuccession,
	setTestator,
	updateOrganisationHeir,
	updatePersonHeir,
} from './lastwill'

const testatorFormPayload: TestatorFormPayload = {
	name: 'Max Mustermann',
	birthDate: '2000-01-01',
	birthPlace: 'Musterstadt',
	zipCode: '12345',
	city: 'Musterstadt',
	street: 'Musterstraße',
	houseNumber: '1',
	moreInfos: ['isInsolvent'],
}

const testator: Testator = {
	name: 'Max Mustermann',
	birthDate: '2000-01-01',
	birthPlace: 'Musterstadt',
	address: {
		zipCode: '12345',
		city: 'Musterstadt',
		street: 'Musterstraße',
		houseNumber: '1',
	},
	isHandicapped: false,
	isInsolvent: true,
}

const personFormPayload: PersonFormPayload = {
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
}

const person: Person = {
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
const marriageFormPayload: MarriageFormPayload = {
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

const marriagePerson: Omit<Person, 'id'> = {
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
const organisationFormPayload: OrganisationFormPayload = {
	id: 'org_1',
	name: 'Organisation A',
	street: 'Street A',
	houseNumber: '1',
	zipCode: '12345',
	city: 'City A',
}

const organisation: Organisation = {
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

describe('lastWillSlice', () => {
	const initialStateTesting: LastWillState = initialState

	describe('inheritance', () => {
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

		it(`should set financialAsset when ${setInheritance} is called`, () => {
			const action = setInheritance({
				financialAssets: [financialAsset],
				items: [],
			})

			const state = lastWillReducer(initialStateTesting, action)

			expect(state.data.financialAssets).to.have.lengthOf(1)
			expect(state.data.financialAssets[0]).to.be.deep.equal(financialAsset)
		})

		it(`should set items when ${setInheritance} is called`, () => {
			const action = setInheritance({
				financialAssets: [],
				items: [item],
			})

			const state = lastWillReducer(initialStateTesting, action)

			expect(state.data.items).to.have.lengthOf(1)
			expect(state.data.items[0]).to.be.deep.equal(item)
		})

		it('should remove itemsIds from heirs when item is removed', () => {
			// Add heir
			let state = lastWillReducer(initialStateTesting, addPersonHeir(personFormPayload))

			// Add item
			state = lastWillReducer(state, setInheritance({ financialAssets: [], items: [item] }))

			// Assign item to heir
			state = lastWillReducer(
				state,
				setSuccession({
					heirs: [
						{
							id: state.data.heirs[0].id,
							type: 'child',
							name: 'Person A',
							itemIds: [state.data.items[0].id],
							percentage: 100,
						},
					],
				})
			)

			// Remove item
			state = lastWillReducer(state, setInheritance({ financialAssets: [], items: [] }))

			// Check if item is removed from heir
			expect(state.data.heirs[0].itemIds).to.have.lengthOf(0)
		})
	})

	describe('testator', () => {
		it("should convert the testator's moreInfos to booleans", () => {
			const action = setTestator({
				...testatorFormPayload,
				moreInfos: ['isHandicapped', 'isInsolvent'],
			})
			const state = lastWillReducer(initialStateTesting, action)

			expect(state.data.testator.isHandicapped).to.equal(true)
			expect(state.data.testator.isInsolvent).to.equal(true)
		})

		it("should convert testator's payload to testator (service)", () => {
			expect(createTestator(testatorFormPayload)).to.deep.equal(testator)
		})
		it('should set testator (reducer)', () => {
			const state = lastWillReducer(initialStateTesting, setTestator(testatorFormPayload))
			expect(state.data.testator).to.deep.equal(testator)
		})
	})

	describe('marriage', () => {
		beforeEach(() => {
			// Ensure that the initial state is empty
			expect(initialStateTesting.data.heirs).to.have.lengthOf(0)
		})

		it(`it should set partner data when ${setMarriage} is called`, () => {
			const newState = lastWillReducer(initialStateTesting, setMarriage(marriageFormPayload))

			const partnerWithoutId = Cypress._.omit(newState.data.heirs[0], 'id')
			expect(partnerWithoutId).to.be.deep.equal(marriagePerson)
		})

		it(`should patch partner data when ${setMarriage} is called`, () => {
			let state = lastWillReducer(initialStateTesting, setMarriage(marriageFormPayload))
			state = lastWillReducer(
				state,
				setSuccession({
					heirs: [
						{
							id: state.data.heirs[0].id,
							type: 'partner',
							name: 'John Doe',
							itemIds: ['1', '2', '3'],
							percentage: 42,
						},
					],
				})
			)

			state = lastWillReducer(
				state,
				setMarriage({
					...marriageFormPayload,
					name: 'Jane Doe',
				})
			)

			const partnerWithoutId = Cypress._.omit(state.data.heirs[0], 'id')

			expect(partnerWithoutId).to.deep.equal({
				...marriagePerson,
				name: 'Jane Doe',
				percentage: 42,
				itemIds: ['1', '2', '3'],
			})
		})

		it('should set relationshipStatus to married when setMarriage is called', () => {
			const newState = lastWillReducer(initialStateTesting, setMarriage(marriageFormPayload))
			expect(newState.data.testator.relationshipStatus).to.equal('married')
		})

		it('should set isBerlinWill to true when setMarriage is called with isBerlinWill in moreInfos', () => {
			const newState = lastWillReducer(initialStateTesting, setMarriage(marriageFormPayload))
			expect(newState.data.common.isBerlinWill).to.be.true
		})

		it('should set isPartnerGermanCitizenship to true when setMarriage is called with isPartnerGermanCitizenship', () => {
			const newState = lastWillReducer(initialStateTesting, setMarriage(marriageFormPayload))
			expect(newState.data.common.isPartnerGermanCitizenship).to.be.true
		})

		it('should set matrimonialProperty to communityOfGain when setMarriage is called with matrimonialProperty as communityOfGain', () => {
			const newState = lastWillReducer(initialStateTesting, setMarriage(marriageFormPayload))
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
				const action = addOrganisationHeir(organisationFormPayload)

				const newState = lastWillReducer(initialStateTesting, action)
				// Assert that the new heir has been added to the heirs list
				expect(newState.data.heirs).to.have.lengthOf(1)
				expect(newState.data.heirs[0]).to.deep.equal(organisation)
			})

			describe('patch organisation', () => {
				it('should update an organisation heir', () => {
					// First, add an organisation heir to the state
					let newState = lastWillReducer(initialStateTesting, addOrganisationHeir(organisationFormPayload))

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

				it('should patch person with new fields (reducer)', () => {
					// First, add an organisation heir to the state
					let newState = lastWillReducer(initialStateTesting, addOrganisationHeir(organisationFormPayload))

					// Then, update this heir
					const action = updateOrganisationHeir({
						id: 'org_1',
						name: 'Updated Organisation A',
					})
					newState = lastWillReducer(newState, action)

					// Assert that the heir has been updated
					expect(newState.data.heirs[0]).to.deep.equal({ ...organisation, name: 'Updated Organisation A' })
				})

				it('should patch organisation with new fields (service)', () => {
					const payload: Partial<OrganisationFormPayload> = {
						id: 'org_1',
						name: 'Updated Organisation A',
						city: 'Updated City A',
						houseNumber: '2',
					}

					const patchedOrganisation = patchOrganisation(organisation, payload)
					expect(patchedOrganisation).to.deep.equal({
						...organisation,
						name: 'Updated Organisation A',
						address: {
							...organisation.address,
							city: 'Updated City A',
							houseNumber: '2',
						},
					})
				})

				it('should not patch organisation id (service)', () => {
					const payload: Partial<OrganisationFormPayload> = {
						id: 'org_2',
					}

					const patchedOrganisation = patchOrganisation(organisation, payload)
					expect(patchedOrganisation).to.deep.equal(organisation)
				})
			})
		})

		describe('persons', () => {
			it('should add a person heir', () => {
				const action = addPersonHeir(personFormPayload)
				const newState = lastWillReducer(initialStateTesting, action)

				// Assert that the new heir has been added to the heirs list
				expect(newState.data.heirs).to.have.lengthOf(1)
				expect(newState.data.heirs[0]).to.deep.equal(person)
			})

			describe('patch person', () => {
				it('should update a person heir', () => {
					// First, add a person heir to the state
					let newState = lastWillReducer(initialStateTesting, addPersonHeir(personFormPayload))

					// Then, update this heir
					const action = updatePersonHeir({
						id: 'person_1',
						type: 'child',
						name: 'Updated Person A',
					})
					newState = lastWillReducer(newState, action)

					// Assert that the heir has been updated
					expect(newState.data.heirs).to.have.lengthOf(1)
					expect(newState.data.heirs[0]).to.deep.include({ id: 'person_1', name: 'Updated Person A' })
				})

				it('should patch person with new fields (reducer)', () => {
					// First, add a person heir to the state
					let newState = lastWillReducer(initialStateTesting, addPersonHeir(personFormPayload))

					// Then, update this heir
					const action = updatePersonHeir({
						id: 'person_1',
						type: 'child',
						name: 'Updated Person A',
					})
					newState = lastWillReducer(newState, action)

					// Assert that the heir has been updated
					expect(newState.data.heirs[0]).to.deep.equal({ ...person, name: 'Updated Person A' })
				})

				it('should patch person with new fields (service)', () => {
					const payload: Partial<PersonFormPayload> = {
						type: 'father',
						name: 'Updated Person A',
						moreInfos: ['isHandicapped'],
						street: 'Side Street',
						houseNumber: '20',
					}

					const patchedPerson = patchPerson(person, payload)
					expect(patchedPerson).to.deep.equal({
						...person,
						type: 'father',
						name: 'Updated Person A',
						address: {
							...person.address,
							street: 'Side Street',
							houseNumber: '20',
						},
						isHandicapped: true,
					})
				})

				it('should not patch person id (service)', () => {
					const payload: Partial<PersonFormPayload> = {
						id: 'person_2',
					}

					const patchedPerson = patchPerson(person, payload)
					expect(patchedPerson).to.deep.equal(person)
				})
			})
		})

		it('should remove an heir', () => {
			// First, add two heirs to the state
			let newState = lastWillReducer(initialStateTesting, addPersonHeir(personFormPayload))
			newState = lastWillReducer(newState, addOrganisationHeir(organisationFormPayload))

			// Then, remove one heir
			const action = removeHeir('person_1')
			newState = lastWillReducer(newState, action)

			// Assert that the heir has been removed
			expect(newState.data.heirs).to.have.lengthOf(1)
			expect(newState.data.heirs[0]).to.deep.include({ id: 'org_1', name: 'Organisation A' })
		})

		describe('succession', () => {
			it(`should set sucession when ${setSuccession} is called`, () => {
				// Add heir
				const action = addPersonHeir(personFormPayload)
				let newState = lastWillReducer(initialStateTesting, action)

				// Assert that the new heir has been added to the heirs list
				expect(newState.data.heirs).to.have.lengthOf(1)
				expect(newState.data.heirs[0]).to.deep.equal(person)

				// Add succession
				const formPayload: SuccessionFormPayload = {
					heirs: [
						{
							id: 'person_1',
							name: 'Person A',
							type: 'child',
							itemIds: ['1', '2', '3'],
							percentage: 42,
						},
					],
				}
				const successionAction = setSuccession(formPayload)
				newState = lastWillReducer(newState, successionAction)

				// Assert that the succession has been added to the state
				expect(newState.data.heirs[0].percentage).to.equal(42)
				expect(newState.data.heirs[0].itemIds).to.have.lengthOf(3)
				expect(newState.data.heirs[0].itemIds).to.deep.equal(['1', '2', '3'])
			})

			it(`should set two succession's heirs when ${setSuccession} is called`, () => {
				// Add two heirs
				let state = lastWillReducer(initialStateTesting, addPersonHeir(personFormPayload))
				state = lastWillReducer(state, addOrganisationHeir(organisationFormPayload))

				// Assert that the new heirs have been added to the heirs list
				expect(state.data.heirs).to.have.lengthOf(2)
				expect(state.data.heirs[0]).to.deep.equal(person)
				expect(state.data.heirs[1]).to.deep.equal(organisation)

				// Add succession
				const formPayload: SuccessionFormPayload = {
					heirs: [
						{
							id: 'person_1',
							name: 'Person A',
							type: 'child',
							itemIds: ['1', '2', '3'],
							percentage: 42,
						},
						{
							id: 'org_1',
							name: 'Organisation A',
							type: 'organisation',
							itemIds: ['4', '5', '6'],
							percentage: 58,
						},
					],
				}

				const successionAction = setSuccession(formPayload)
				state = lastWillReducer(state, successionAction)

				// Assert that the succession has been added to the state
				expect(state.data.heirs[0].percentage).to.equal(42)
				expect(state.data.heirs[0].itemIds).to.have.lengthOf(3)
				expect(state.data.heirs[0].itemIds).to.deep.equal(['1', '2', '3'])
				expect(state.data.heirs[1].percentage).to.equal(58)
				expect(state.data.heirs[1].itemIds).to.have.lengthOf(3)
				expect(state.data.heirs[1].itemIds).to.deep.equal(['4', '5', '6'])
			})
		})
	})
})
