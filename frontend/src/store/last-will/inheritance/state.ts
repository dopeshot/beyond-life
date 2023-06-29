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
	financialAssets: [
		{
			id: 0,
			where: 'Geld bei der Sparkasse',
			amount: 15000,
			currency: '€',
		},
		{
			id: 1,
			where: 'Geld bei Cosmos im Aktiendepot',
			amount: 450000,
			currency: '€',
		},
		{
			id: 2,
			where: 'Geld im Tresor unter den Büchern',
			amount: 8000,
			currency: '€',
		},
		{
			id: 3,
			where: 'Bitcoin bei Binance',
			amount: 25,
			currency: 'BTC',
		},
	],
	items: [
		{
			id: 0,
			name: 'Mercedes EQS',
			description: 'Die Person die das Auto kriegt soll damit in Urlaub fahren',
		},
		{
			id: 1,
			name: 'Ferienhaus am Garadasee',
		},
		{
			id: 2,
			name: 'Gold im Nachtschrank',
		},
		{
			id: 3,
			name: 'Hardwareteile',
		},
		{
			id: 4,
			name: 'Fotoapparat',
			description: 'Und das Zubehör',
		},
		{
			id: 5,
			name: 'iPhone 13',
		},
		{
			id: 6,
			name: 'Instrument',
		},
	],
}
