'use client'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { TextInput } from '../../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../../components/Headline/Headline'

type HeirsForm = {
	heirs: string
}

/**
 * Heirs Page
 */
const Heirs = () => {
	const initialValues = {
		heirs: 'test',
	}
	const validationSchema: Yup.ObjectSchema<HeirsForm> = Yup.object({
		heirs: Yup.string().required('Bitte geben Sie einen Namen ein.'),
	})

	const submitHeirs = (values: HeirsForm) => {
		console.log("values:", values)
	}
	return (
		<div className="container mt-5">
			<Headline>Erben</Headline>
			<Formik onSubmit={submitHeirs} validationSchema={validationSchema} initialValues={initialValues}>
				<Form>
					<TextInput name="heirs" labelText="Erben" inputRequired />
					<Button kind="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Formik>
		</div>
	)
}

export default Heirs
