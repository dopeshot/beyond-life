'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormStepsButtons } from '../../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Headline } from '../../../../../components/Headline/Headline'
import { routes } from '../../../../../services/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { setProgressKeys } from '../../../../../store/lastwill/lastwill'
import { SuccessionFormPayload } from '../../../../../types/lastWill'
import { SidebarPages } from '../../../../../types/sidebar'

/**
 * Succession Page
 */
const Succession = () => {
	// Router
	const router = useRouter()

	// Global State
	const _id = useAppSelector((state) => state.lastWill.data._id)
	const isLoading = useAppSelector((state) => state.lastWill.isLoading)
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
	const dispatch = useAppDispatch()

	const PREVIOUS_LINK = routes.lastWill.inheritance(_id)
	const NEXT_LINK = isAuthenticated ? routes.lastWill.final(_id) : routes.lastWill.plans(_id) // TODO checken, ob für Testament schon bezahlt wurde

	// Formik
	const initialFormValues: SuccessionFormPayload = {
		persons: [],
		organisations: [],
		partner: {
			percentage: 0,
			itemIds: [],
		},
	}

	const onSubmit = async (values: SuccessionFormPayload, href: string) => {
		console.log(values)
		try {
			// Update succession global store
			// await services.submitSuccession(values)
			console.log(values)

			router.push(href)
		} catch (error) {
			console.error('An error occured while submitting the form: ', error)
		}
	}

	// Use to handle sidebar display state and progress
	useEffect(() => {
		dispatch(setProgressKeys(SidebarPages.SUCCESSION))
	}, [dispatch])

	return (
		<div className="container mt-5 flex flex-1 flex-col">
			<Headline className="hidden lg:block">Erbfolge</Headline>
			<Formik initialValues={initialFormValues} onSubmit={(values) => onSubmit(values, NEXT_LINK)}>
				{({ values, dirty, setFieldValue }: FormikProps<SuccessionFormPayload>) => (
					<Form>
						{/* Form Steps Buttons */}
						<FormStepsButtons
							loading={isLoading}
							dirty={dirty}
							previousOnClick={() => onSubmit(values, PREVIOUS_LINK)}
							previousHref={PREVIOUS_LINK}
							nextHref={NEXT_LINK}
						/>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Succession
