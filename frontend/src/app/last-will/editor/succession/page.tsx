'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ObjectSchema, object } from 'yup'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SuccessionFormPayload } from '../../../../store/last-will/succassion/actions'
import { SidebarPages } from '../../../../types/sidebar'

const PREVIOUS_LINK = routes.lastWill.inheritance('1')
const NEXT_LINK = routes.lastWill.final('1')

/**
 * Succession Page
 */
const Succession = () => {
	const router = useRouter()
	const { lastWill, services } = useLastWillContext()

	// Formik
	const initialFormValues = {} // lastWill.succession

	const onSubmit = async (values: any, href: string) => {}

	const validationSchema: ObjectSchema<SuccessionFormPayload> = object().shape({})

	useEffect(() => {
		services.setProgressKey({ progressKey: SidebarPages.SUCCESSION })
	}, [services])

	return (
		<div className="container mt-5 flex flex-1 flex-col">
			<Headline>Erbfolge</Headline>
			<Formik
				initialValues={initialFormValues}
				validationSchema={validationSchema}
				onSubmit={(values) => onSubmit(values, NEXT_LINK)}
			>
				{({ values, dirty }: FormikProps<SuccessionFormPayload>) => (
					<Form className="flex flex-1 flex-col">
						{/* Content */}
						<div className="mt-6 flex flex-1 flex-col rounded-xl border-2 border-gray-100 px-4 py-3 md:px-8 md:py-4"></div>

						{/* Form Steps Buttons */}
						<FormStepsButtons
							loading={lastWill.common.isLoading}
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
