import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../ButtonsAndLinks/Button/Button'
import { Modal, ModalProps } from './Modal'

const meta: Meta<typeof Modal> = {
	title: 'Components/Modal',
	component: Modal,
}

export default meta
type Story = StoryObj<ModalProps>

export const Default: Story = (args: ModalProps) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Open Modal</Button>
			<Modal open={isOpen} headline={args.headline} onClose={() => setIsOpen(false)}>
				{args.children}
			</Modal>
		</>
	)
}

Default.args = {
	headline: 'Modal Headline',
	children: <p>Modal Content</p>,
}
