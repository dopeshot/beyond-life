import { Button } from '../../ButtonsAndLinks/Button/Button'
import { Route } from '../../ButtonsAndLinks/Route/Route'

export type FormStepsButtonsProps = {
	/** Link to previous step. */
	href: string
	/** Next step disabled. Default should be !(dirty && isValid). */
	disabled: boolean
	/** Next step loading. */
	loading?: boolean
}

/**
 * Buttons to use for the funnel form. Displays next and previous step buttons.
 */
export const FormStepsButtons: React.FC<FormStepsButtonsProps> = ({ href, disabled, loading = false }) => {
	return (
		<div className="mb-4 mt-6 flex flex-col items-center justify-between md:mb-5 md:mt-6 md:flex-row">
			{/* Previous Step */}
			<Route datacy="route-previous-Step" className="order-1 md:order-none" href={href} kind="tertiary">
				Vorheriger Schritt
			</Route>

			{/* Next Step - Submit Button */}
			<Button
				datacy="button-submit"
				type="submit"
				className="mb-4 md:mb-0"
				disabled={disabled}
				loading={loading}
				icon="arrow_forward"
			>
				Nächster Schritt
			</Button>
		</div>
	)
}
