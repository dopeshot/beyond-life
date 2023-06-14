import { ErrorMessage } from 'formik'
import { Icon } from '../../Icon/Icon'

export type FormErrorProps = {
	/** Unique name of formik field. */
	fieldName: string
}

/**
 * Errormessage for inputs, can only be used with formik.
 */
export const FormError: React.FunctionComponent<FormErrorProps> = ({ fieldName }) => {
	return (
		<ErrorMessage name={fieldName}>
			{(errorMessage) => (
				<div datacy={`formerror-${fieldName}`} className="flex items-center text-red">
					<Icon icon="error" className="mr-2"></Icon>
					<span className="text-sm font-medium">{errorMessage}</span>
				</div>
			)}
		</ErrorMessage>
	)
}
