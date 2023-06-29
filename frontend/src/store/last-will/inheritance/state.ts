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
			name: 'mein Fahrrad',
			description: '',
		},
		{
			id: 2,
			name: 'mein geerbtes Kunstwerk',
			description: 'Vererbe es weiter an deine Kinder',
		},
		{
			id: 3,
			name: 'mein Ferienhaus am Garadasee',
		},
		{
			id: 4,
			name: 'mein Gold im Nachtschrank',
		},
		{
			id: 5,
			name: 'meine Antiquitätensammlung',
		},
		{
			id: 6,
			name: 'mein Fotoapparat',
			description: 'Benutzte Sie für tolle Urlaubsbilder',
		},
		{
			id: 7,
			name: 'mein iPhone 13',
		},
		{
			id: 8,
			name: 'mein Instrument',
		},
		{
			id: 9,
			name: 'mein Mercedes Benz EQS',
			description: '',
		},
		{
			id: 10,
			name: 'mein Tesla Model 3',
			description: '',
		},
	],
}
