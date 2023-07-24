import { PaymentPlanProps } from '../src/components/PaymentPlan/PaymentPlan'

export const FreePlan: PaymentPlanProps = {
	title: 'Free',
	price: '0€',
	descriptionItems: [
		{ text: 'Testament abschreiben', icon: 'close', iconColor: 'text-gray-500' },
		{ text: 'Testament bearbeiten', icon: 'close', iconColor: 'text-gray-500' },
		{ text: 'Sicher gespeichert', icon: 'check' },
	],
}

export const PaymentPlans: PaymentPlanProps[] = [
	{
		title: 'Basic',
		price: '49€',
		descriptionItems: [
			{ text: '1 Testament', icon: 'check' },
			{ text: 'Immer anpassbar', icon: 'check' },
			{ text: 'Sicher verschlüsselt', icon: 'check' },
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
			{ text: 'Sicher verschlüsselt', icon: 'check' },
		],
		handleSubmit: () => {
			'family'
		},
	},
]
