export type InheritanceState = {
	financialAssets: FinancialAsset[]
	items: Item[]
}

export type FinancialAsset = {
	id: number
	where?: string
	amount?: number | string
	currency?: string
}

export type Item = {
	id: number
	name?: string
	description?: string
}

export const initialInheritanceState: InheritanceState = {
	financialAssets: [],
	items: [],
}
