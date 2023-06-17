export type InheritanceState = {
	financialAssets: FinancialAsset[]
	items: Item[]
}

export type FinancialAsset = {
	where?: string
	amount?: number | string
	currency?: string
}

export type Item = {
	name?: string
	description?: string
}

export type ItemForm = Item & { id?: number }
export type FinancialAssetForm = FinancialAsset & { id?: number }

export const initialInheritanceState: InheritanceState = {
	financialAssets: [],
	items: [],
}
