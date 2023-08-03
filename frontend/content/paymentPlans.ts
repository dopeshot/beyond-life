import { PaymentPlanProps } from '../src/components/PaymentPlan/PaymentPlan'

export const FreePlan: PaymentPlanProps = {
	title: 'Free',
	type: 'free',
	price: '0€',
	descriptionItems: [
		{ text: 'Testament abschreiben', icon: 'close', iconColor: 'text-gray-500' },
		{ text: 'Testament bearbeiten', icon: 'close', iconColor: 'text-gray-500' },
		{ text: 'Sicher gespeichert', icon: 'check' },
	],
}

export const PaymentPlans: PaymentPlanProps[] = [
	{
		title: 'Single',
		type: 'single',
		price: '49€',
		descriptionItems: [
			{ text: '1 Testament', icon: 'check' },
			{ text: 'Immer anpassbar', icon: 'check' },
			{ text: 'Sicher verschlüsselt', icon: 'check' },
		],
	},
	{
		title: 'Family',
		type: 'family',
		price: '79€',
		descriptionItems: [
			{ text: '5 Testamente', icon: 'check' },
			{ text: 'Immer anpassbar', icon: 'check' },
			{ text: 'Sicher verschlüsselt', icon: 'check' },
		],
	},
]
