'use client'
import Image, { StaticImageData } from "next/image"
import { Dispatch, SetStateAction } from "react"
import { Headline } from "../../Headline/Headline"
import { IconButton } from "../../IconButton/IconButton"

type StepProps = {
    /** The title of the step */
    title: string
    /** The description of the step */
    description: string
    /** The image of the step */
    image: StaticImageData
    /** The step number */
    stepNumber: number
    /** The current step */
    currentStep: number
    /** The total amount of steps */
    stepsCount: number
    /** The function to set the current step */
    setCurrentStep: Dispatch<SetStateAction<number>>
}

/**
 * One Step of the a step by step tutorial.
 */
export const Step: React.FC<StepProps> = ({ title, description, image, currentStep, setCurrentStep, stepsCount }) => {
    return <div className="flex items-center gap-3 md:gap-10">
        {/* Image */}
        <div className="w-1/2">
            <Image src={image} alt={`Schritt ${currentStep}`} />
        </div>

        {/* Content */}
        <div className="w-1/2">
            <p className="text-sm">Schritt {currentStep}</p>
            <Headline level={4}>
                {title}
            </Headline>
            <p className="mb-2 md:mb-4">{description}</p>

            {/* Buttons */}
            <div className="flex gap-2">
                {/* Button Left */}
                <IconButton onClick={() => setCurrentStep((currentStep) => currentStep > 1 ? currentStep = currentStep - 1 : currentStep)} icon="chevron_left" color="black" className="bg-yellow hover:bg-yellow-600 hover:bg-opacity-100 focus:bg-yellow-700 focus:bg-opacity-100" />

                {/* Button Right */}
                <IconButton onClick={() => setCurrentStep((currentStep) => currentStep <= stepsCount ? currentStep = currentStep + 1 : currentStep)} icon="chevron_right" color="black" className="bg-yellow hover:bg-yellow-600 hover:bg-opacity-100 focus:bg-yellow-700 focus:bg-opacity-100" />
            </div>
        </div>
    </div>
}