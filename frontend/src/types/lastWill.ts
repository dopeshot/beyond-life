export type Testator = {
	relationshipStatus?: RelationshipStatus
} & Omit<Person, 'type' | 'percentage' | 'itemIds' | 'id' | 'child'>

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
} & Address &
	ChildInfo &
	Id

type ChildInfo = {
	child?: {
		type?: 'natural' | 'adopted' | 'step' // TODO MC: Where is this used?
		relationship?: ChildRelationShip
	}
}
export type ChildRelationShip = 'childTogether' | 'childFromPartner' | 'childFromOther'

export type Organisation = {
	name?: string
	type: OrganisationType
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

export type HeirsTypes = PersonType | OrganisationType
export type PersonType = 'partner' | 'mother' | 'father' | 'child' | 'siblings' | 'other'
export type OrganisationType = 'organisation'

type Gender = 'male' | 'female' | 'divers'
type RelationshipStatus = 'married' | 'divorced' | 'widowed' | 'unmarried'
export type MatrimonialProperty = 'communityOfGain' | 'separationOfProperty'
