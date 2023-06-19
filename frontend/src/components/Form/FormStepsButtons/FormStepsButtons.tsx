import { Button } from '../../ButtonsAndLinks/Button/Button'

export type FormStepsButtonsProps = {
	/** Called when click back button. Do the same as submit. */
	previousOnClick: () => Promise<void>
	/** Next step loading. */
	loading?: boolean
}

/**
 * Buttons to use for the funnel form. Displays next and previous step buttons.
 */
export const FormStepsButtons: React.FC<FormStepsButtonsProps> = ({ previousOnClick, loading = false }) => {
	return (
		<div className="mb-4 mt-6 flex flex-col items-center justify-between md:mb-5 md:mt-6 md:flex-row">
			{/* Previous Step */}
			<Button
				datacy="route-previous-Step"
				type="button"
				onClick={previousOnClick}
				className="order-1 md:order-none"
				kind="tertiary"
			>
				Vorheriger Schritt
			</Button>

			{/* Next Step - Submit Button */}
			<Button datacy="button-submit" type="submit" className="mb-4 md:mb-0" loading={loading} icon="arrow_forward">
				Nächster Schritt
			</Button>
		</div>
	)
}
