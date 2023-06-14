'use client'
import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../types/sidebar'

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
		console.log('values:', values)
	}

	const { services } = useLastWillContext()

	useEffect(() => {
		services.setProgressKey({ progressKey: SidebarPages.HEIRS })
	}, [services])

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

			<Route href={routes.lastWill.inheritance('1')}>
				<div>Next</div>
			</Route>
		</div>
	)
}

export default Heirs
