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
			id: 1,
			name: 'Fahrrad',
			description: '',
		},
		{
			id: 2,
			name: 'Das geerbte Kunstwerk',
			description: 'gut damit umgehen!',
		},
		{
			id: 3,
			name: 'Ferienhaus am Garadasee',
		},
		{
			id: 4,
			name: 'Gold im Nachtschrank',
		},
		{
			id: 5,
			name: 'Antiquitätensammlung',
		},
		{
			id: 6,
			name: 'Fotoapparat',
			description: 'Und das Zubehör',
		},
		{
			id: 7,
			name: 'iPhone 13',
		},
		{
			id: 8,
			name: 'Instrument',
		},
		{
			id: 9,
			name: 'Mercedes Benz EQS',
			description: '',
		},
		{
			id: 10,
			name: 'Tesla Model 3',
			description: '',
		},
	],
}
