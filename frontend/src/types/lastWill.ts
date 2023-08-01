// Form types

type BasicPersonPayload = {
	name?: string
	gender?: Gender
	birthDate?: string
	birthPlace?: string
} & Address

export type TestatorFormPayload = BasicPersonPayload & {
	moreInfos?: string[]
}

export type MarriageFormPayload = BasicPersonPayload & {
	relationshipStatus?: RelationshipStatus
	isPartnerGermanCitizenship?: string[]
	moreInfos?: string[] // update type
	matrimonialProperty?: MatrimonialProperty
}

export type PersonFormPayload = BasicPersonPayload & {
	id: string
	type: PersonType

	moreInfos?: string[]
	childRelationShip?: ChildRelationShip
	ownChild?: string[]
}

export type OrganisationFormPayload = {
	id: string
	name?: string
} & Address

// TODO: REFACTOR THIS AFTER ERBFOLGE IS DONE
export type SuccessionFormPayload = {
	persons: SuccessionPerson[]
	organisations: SuccessionOrganisation[]
	partner: SuccessionPartner
}

export type SuccessionPerson = {
	id: number | null
	percentage: number
	itemIds: number[]
}

export type SuccessionPartner = {
	percentage: number
	itemIds: number[]
}

export type SuccessionOrganisation = {
	id: number | null
	percentage: number
	itemIds: number[]
}
// TODO: REFACTOR THIS AFTER ERBFOLGE IS DONE

export type InheritanceFormPayload = {
	financialAssets: FinancialAsset[]
	items: Item[]
}

// Store
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
} & { address?: Address } & ChildInfo &
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
} & { address?: Address } & Id

export type FinancialAsset = {
	where?: string
	amount?: number
	currency?: string
} & Id

export type Item = {
	name?: string
	description?: string
} & Id

// Base types

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
