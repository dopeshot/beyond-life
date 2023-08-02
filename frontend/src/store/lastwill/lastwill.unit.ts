import {
	LastWillState,
	MarriageFormPayload,
	Organisation,
	OrganisationFormPayload,
	Person,
	PersonFormPayload,
	SuccessionFormPayload,
} from '../../types/lastWill'
import { SidebarPages } from '../../types/sidebar'
import {
	addOrganisationHeir,
	addPersonHeir,
	createTestator,
	initialState,
	lastWillReducer,
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
			childRelationShip: 'childTogether',
			ownChild: [],
		}

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

		const organisationFormPayload: OrganisationFormPayload = {
			id: 'org_1',
			name: 'Organisation A',
			street: 'Street A',
			houseNumber: '1',
			zipCode: '12345',
			city: 'City A',
		}

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

		describe('organisations', () => {
			it('should add an organisation heir', () => {
				const action = addOrganisationHeir(organisationFormPayload)

				const newState = lastWillReducer(initialStateTesting, action)
				// Assert that the new heir has been added to the heirs list
				expect(newState.data.heirs).to.have.lengthOf(1)
				expect(newState.data.heirs[0]).to.deep.equal(expectedOrganisationHeir)
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
					expect(newState.data.heirs[0]).to.deep.include({ id: 'org_1', name: 'Updated Organisation A' })
					expect(newState.data.heirs[0]).to.deep.equal({ ...expectedOrganisationHeir, name: 'Updated Organisation A' })
				})
			})
		})

		describe('persons', () => {
			it('should add a person heir', () => {
				const action = addPersonHeir(personFormPayload)
				const newState = lastWillReducer(initialStateTesting, action)

				// Assert that the new heir has been added to the heirs list
				expect(newState.data.heirs).to.have.lengthOf(1)
				expect(newState.data.heirs[0]).to.deep.equal(expectedPersonHeir)
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
					expect(newState.data.heirs[0]).to.deep.include({ birthPlace: expectedPersonHeir.birthPlace })
					expect(newState.data.heirs[0]).to.deep.equal({ ...expectedPersonHeir, name: 'Updated Person A' })
				})

				it('should patch person with new fields (service)', () => {
					const payload: Partial<PersonFormPayload> = {
						type: 'father',
						name: 'Updated Person A',
						moreInfos: ['isHandicapped'],
						street: 'Side Street',
						houseNumber: '20',
					}

					const patchedPerson = patchPerson(expectedPersonHeir, payload)
					expect(patchedPerson).to.deep.equal({
						...expectedPersonHeir,
						type: 'father',
						name: 'Updated Person A',
						address: {
							...expectedPersonHeir.address,
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

					const patchedPerson = patchPerson(expectedPersonHeir, payload)
					expect(patchedPerson).to.deep.equal(expectedPersonHeir)
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
				expect(newState.data.heirs[0]).to.deep.equal(expectedPersonHeir)

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

			it(`should set all succession's heirs when ${setSuccession} is called`, () => {
				// // Add 2 heir
				// const action = addPersonHeir(personFormPayload)
				// let newState = lastWillReducer(initialStateTesting, action)
			})
		})
	})
})
