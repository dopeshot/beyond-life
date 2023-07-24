import { PaymentPlanProps } from '../src/components/PaymentPlan/PaymentPlan'

export const FreePlan: PaymentPlanProps = {
	title: 'Free',
	price: '0€',
	descriptionItems: [{ text: 'Dein Testament wird sicher gespeichert', icon: 'check' }],
}

export const PaymentPlans: PaymentPlanProps[] = [
	{
		title: 'Basic',
		price: '49€',
		descriptionItems: [
			{ text: '1 Testament', icon: 'check' },
			{ text: 'Immer anpassbar', icon: 'check' },
			{ text: 'Verschlüsselt', icon: 'check' },
		],
		handleSubmit: () => {
			'sigle'
		},
	},
	{
		title: 'Premium',
		price: '149€',
		descriptionItems: [
			{ text: '5 Testamente', icon: 'check' },
			{ text: 'Immer anpassbar', icon: 'check' },
			{ text: 'Verschlüsselt', icon: 'check' },
		],
		handleSubmit: () => {
			'family'
		},
	},
]
