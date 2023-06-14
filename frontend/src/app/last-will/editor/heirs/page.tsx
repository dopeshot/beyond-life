'use client'
import { FieldArray, Form, Formik, FormikState } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../types/sidebar'

type HeirsForm = {
	persons: {
		firstName: string
		lastName: string
	}[]
}

/**
 * Heirs Page
 */
const Heirs = () => {
	const initialValues: HeirsForm = {
		persons: [
			{
				firstName: 'Michael',
				lastName: 'Müller',
			},
		],
	}

	const [DEBUG_submittedState, setDEBUG_submittedState] = useState<any>({})

	const validationSchema: Yup.ObjectSchema<HeirsForm> = Yup.object({
		persons: Yup.array()
			.required("You can't have an empty list of persons")
			.of(
				Yup.object().shape({
					firstName: Yup.string().required('Required'),
					lastName: Yup.string().required('Required'),
				})
			),
	})

	const submitHeirs = (values: HeirsForm) => {
		console.log('values:', values)
		setDEBUG_submittedState(values)
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
					<FieldArray name="persons">
						{(props) => (
							<div>
								{(props.form as FormikState<HeirsForm>).values.persons.map((person, index) => (
									<div key={index}>
										<TextInput name={`persons.${index}.firstName`} labelText="Vorname" inputRequired />
										<TextInput name={`persons.${index}.lastName`} labelText="Nachname" inputRequired />
										<Button type="button" kind="secondary" onClick={() => props.remove(index)}>
											Remove
										</Button>
									</div>
								))}
								<Button type="button" kind="primary" onClick={() => props.push({ firstName: '', lastName: '' })}>
									Add
								</Button>
							</div>
						)}
					</FieldArray>
					<Button kind="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Formik>

			<p>{JSON.stringify(DEBUG_submittedState)}</p>
			<Route href={routes.lastWill.inheritance('1')}>
				<div>Next</div>
			</Route>
		</div>
	)
}

export default Heirs
