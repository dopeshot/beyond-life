'use client'
import Image, { StaticImageData } from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { Headline } from '../../Headline/Headline'
import { IconButton } from '../../IconButton/IconButton'

export type StepProps = {
	/** The title of the step. */
	title: string
	/** The description of the step. */
	description: string
	/** The image of the step. */
	image: StaticImageData
	/** The step number. */
	stepNumber: number
	/** The current step. */
	currentStep: number
	/** The total amount of steps. */
	stepsCount: number
	/** The function to set the current step. */
	setCurrentStep: Dispatch<SetStateAction<number>>
}

/**
 * One Step of the a step by step tutorial.
 */
export const Step: React.FC<StepProps> = ({ title, description, image, currentStep, setCurrentStep, stepsCount }) => {
	return (
		<div className="items-center gap-3 md:flex md:gap-10">
			{/* Image */}
			<div className="md:w-1/2">
				<Image src={image} alt={`Schritt ${currentStep}`} datacy="step-image" />
			</div>

			{/* Content */}
			<div className="md:w-1/2">
				<p className="text-sm" datacy="step-number">
					Schritt {currentStep}
				</p>
				<Headline level={4} datacy="step-title">
					{title}
				</Headline>
				<p className="mb-2 md:mb-4" datacy="step-description">
					{description}
				</p>

				{/* Buttons */}
				<div className="flex gap-2">
					{/* Button Left */}
					<IconButton
						disabled={currentStep === 1}
						dimOpacityWhenDisabled
						onClick={() => {
							const nextStep = currentStep > 1 ? (currentStep = currentStep - 1) : currentStep
							setCurrentStep(nextStep)
						}}
						icon="chevron_left"
						color="black"
						backgroundColor="yellow"
						datacy="step-prev-button"
					/>

					{/* Button Right */}
					<IconButton
						disabled={currentStep > stepsCount}
						dimOpacityWhenDisabled
						onClick={() => {
							const nextStep = currentStep <= stepsCount ? (currentStep = currentStep + 1) : currentStep
							setCurrentStep(nextStep)
						}}
						icon="chevron_right"
						color="black"
						backgroundColor="yellow"
						datacy="step-next-button"
					/>
				</div>
			</div>
		</div>
	)
}
