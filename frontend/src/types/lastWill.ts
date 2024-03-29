// Form types

import { SidebarPages } from './sidebar'

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
}

export type OrganisationFormPayload = {
	id: string
	name?: string
} & Address

export type HeirSuccesion = {
	id: string
	type: HeirsTypes
	name: string
} & Succession

export type SuccessionFormPayload = {
	heirs: HeirSuccesion[]
}

export type InheritanceFormPayload = {
	financialAssets: FinancialAsset[]
	items: Item[]
}

// Store
export type LastWillState = {
	// DO NOT SYNC THIS WITH BACKEND
	isLoading: boolean
	isInitialized: boolean
	error: string | null

	// SYNC THIS WITH BACKEND
	data: {
		_id: string
		common: {
			isBerlinWill?: boolean
			isPartnerGermanCitizenship?: boolean
			matrimonialProperty?: MatrimonialProperty
		}
		progressKeys: SidebarPages[]
		testator: Testator
		heirs: (Person | Organisation)[]
		financialAssets: FinancialAsset[]
		items: Item[]
	}
}

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
} & { address?: Address } & Succession &
	Id

export type Organisation = {
	name?: string
	type: OrganisationType
} & { address?: Address } & Succession &
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

type Succession = {
	percentage?: number
	itemIds?: string[]
}

export type HeirsTypes = PersonType | OrganisationType
export type PersonType = 'partner' | 'mother' | 'father' | 'child' | 'siblings' | 'other'
export type OrganisationType = 'organisation'

type Gender = 'male' | 'female' | 'divers'
export type RelationshipStatus = 'married' | 'divorced' | 'widowed' | 'unmarried'
export type MatrimonialProperty = 'communityOfGain' | 'separationOfProperty'
export type PartnerMoreInfos = 'partnerHandicapped' | 'partnerInsolvent' | 'partnerBerlinWill'

// Final Last Will

export type GeneratedLastWill = {
	testatorHeader: TestatorHeader
	locationHeader: string
	title: string
	initialText: string
	paragraphs: LastWillParagraph[]
}

export type TestatorHeader = {
	fullName: string
	AddressStreet: string
	AddressCity: string
}

export type LastWillParagraph = {
	title: string
	contents: string[]
}
