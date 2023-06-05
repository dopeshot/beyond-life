'use client'
import { Form, Formik, FormikProps } from 'formik'
import Image from 'next/image'
import image from '../../../../assets/images/layout/headerBackground.jpg'
import { CustomSelectionButton } from '../../../../components/Form/CustomSelectionButton/CustomSelectionButton'
import { Label } from '../../../../components/Form/Label/Label'
import { Headline } from '../../../../components/Headline/Headline'

type LastWillStart = {
    germanCitizenship?: boolean
    germanRightOfInheritance?: boolean
}

/**
 * Last Will Start Page for Legal Stuff.
 */
const Start = () => {
    const initalFormValues: LastWillStart = {
        germanCitizenship: undefined,
        germanRightOfInheritance: undefined
    }

    const onSubmit = (values: LastWillStart) => {
        console.log(values)
    }

    return (
        <div className="container lg:flex mt-5">
            <header className="flex relative bg-black bg-opacity-50 bg-cover bg-no-repeat bg-blend-darken rounded-2xl lg:w-1/3">
                <Image
                    className="absolute -z-10 object-cover object-center h-full rounded-2xl"
                    src={image}
                    alt="Couple"
                    placeholder="blur"
                />
                <div className="flex h-full flex-col justify-center p-5 md:p-10">
                    <Headline className="text-yellow">
                        Jetzt loslegen
                    </Headline>
                    <p className="text-white md:text-lg">
                        Erstellen Sie Ihr Testament in nur wenigen Schritten und hinterlassen Sie ein Vermächtnis, das zählt.
                    </p>
                </div>
            </header>

            <Formik initialValues={initalFormValues} onSubmit={onSubmit}>
                {({ values, setFieldValue }: FormikProps<LastWillStart>) =>
                    <Form className="pl-10 lg:w-1/2">
                        <Label name="germanCitizenship" className="font-semibold block mb-2" labelText="Besitzen Sie die Deutsche Staatsbürgerschaft?" inputRequired />
                        <div className="grid grid-cols-2 gap-3">
                            <CustomSelectionButton active={values.germanCitizenship === true} activeColor="green" onClick={() => setFieldValue("germanCitizenship", true)} headline="Ja" description="Ich besitze die Deutsche Staatsbürgerschaft." />
                            <CustomSelectionButton active={values.germanCitizenship === false} activeColor="red" activeIcon="cancel" onClick={() => setFieldValue("germanCitizenship", false)} headline="Nein" description="Ich besitze eine Ausländische Staatsbürgerschaft." />
                        </div>
                    </Form>
                }
            </Formik>
        </div>
    )
}

export default Start
