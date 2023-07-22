import { Button } from '../../ButtonsAndLinks/Button/Button'
import { Route } from '../../ButtonsAndLinks/Route/Route'

export type FormStepsButtonsProps = {
	/** Called when click back button. Do the same as submit. */
	previousOnClick: () => Promise<void>
	/** Page link to before current page. */
	previousHref: string
	/** Page link to after current page. */
	nextHref: string
	/** Next step loading. */
	loading?: boolean
	/** Form dirty state. */
	dirty: boolean
}

/**
 * Buttons to use for the funnel form. Displays next and previous step buttons.
 */
export const FormStepsButtons: React.FC<FormStepsButtonsProps> = ({
	previousOnClick,
	loading = false,
	dirty,
	previousHref,
	nextHref,
}) => {
	return (
		<div className="mb-4 mt-8 flex flex-col items-center justify-between md:mb-5 md:mt-10 md:flex-row">
			{/* Previous Step */}
			{!dirty ? (
				<Route datacy="route-previous-submit" href={previousHref} className="order-1 md:order-none" kind="tertiary">
					Vorheriger Schritt
				</Route>
			) : (
				<Button
					datacy="button-previous-submit"
					type="button"
					loading={loading}
					onClick={previousOnClick}
					className="order-1 md:order-none"
					kind="tertiary"
				>
					Vorheriger Schritt
				</Button>
			)}

			{/* Next Step - Submit Button */}
			{!dirty ? (
				<Route datacy="route-next-submit" href={nextHref} icon="arrow_forward" className="mb-4 md:mb-0">
					Nächster Schritt
				</Route>
			) : (
				<Button
					datacy="button-next-submit"
					type="submit"
					className="mb-4 md:mb-0"
					loading={loading}
					icon="arrow_forward"
				>
					Nächster Schritt
				</Button>
			)}
		</div>
	)
}
