import type { Meta, StoryObj } from '@storybook/react'
import example from '../../../assets/images/tutorial/example.png'
import { Step } from './Step'

const meta: Meta<typeof Step> = {
    title: 'Layout/Step',
    component: Step,
}

export default meta
type Story = StoryObj<typeof Step>

export const Default: Story = {
    args: {
        title: 'Eingabe der notwendigen Daten',
        description: 'Geben Sie die notwendigen Daten ein, um die Anfrage zu erstellen.',
        stepNumber: 1,
        currentStep: 1,
        stepsCount: 3,
        setCurrentStep: () => { },
        image: example,
    },
}
