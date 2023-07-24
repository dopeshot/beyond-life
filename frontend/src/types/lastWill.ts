export type Testator = {
	relationshipStatus?: RelationshipStatus
} & Omit<Person, 'type' | 'percentage' | 'itemIds' | 'id' | 'childType'>

export type Person = {
	type: PersonType
	name?: string
	gender?: Gender
	birthDate?: string
	birthPlace?: string
	isHandicapped?: boolean
	isInsolvent?: boolean

	// Succession
	percentage?: number
	itemIds?: number[]

	// Heirs
	childType?: 'natural' | 'adopted' | 'step'
} & Address &
	Id

export type Organisation = {
	name?: string
	type: 'organisation'
} & Address &
	Id

export type FinancialAsset = {
	where?: string
	amount?: number
	currency?: string
} & Id

export type Item = {
	name?: string
	description?: string
} & Id

type Id = {
	id: string
}
type Address = {
	street?: string
	houseNumber?: string
	zipCode?: string
	city?: string
}
export type PersonType = 'partner' | 'mother' | 'father' | 'child' | 'siblings' | 'other'
type Gender = 'male' | 'female' | 'divers'
type RelationshipStatus = 'married' | 'divorced' | 'widowed' | 'unmarried'
export type MatrimonialProperty = 'communityOfGain' | 'separationOfProperty'
