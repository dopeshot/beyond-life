'use client'
import { Form, Formik, FormikProps } from 'formik'
import Image from 'next/image'
import { ObjectSchema, boolean, object } from 'yup'
import image from '../../../../assets/images/layout/headerBackground.jpg'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { FormError } from '../../../../components/Errors/FormError/FormError'
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

    const formValidation: ObjectSchema<LastWillStart> = object().shape({
        germanCitizenship: boolean().required("Dieses Feld ist erforderlich. Bitte wählen Sie eine Option aus."),
        germanRightOfInheritance: boolean().required("Dieses Feld ist erforderlich. Bitte wählen Sie eine Option aus.")
    })

    const onSubmit = (values: LastWillStart) => {
        console.log(values)
    }

    return (
        <div className="container items-center lg:flex mt-8 lg:mt-[30px] lg:h-[calc(100vh-130px-60px)]">
            {/* Left Image with Text */}
            <header className="flex relative bg-black bg-opacity-50 bg-cover bg-no-repeat bg-blend-darken rounded-2xl lg:h-[calc(100vh-130px-60px)] lg:w-1/2 xl:w-1/3 mb-5 lg:mb-0">
                <Image
                    className="absolute -z-10 object-cover object-center h-full rounded-2xl"
                    src={image}
                    alt="Couple"
                    placeholder="blur"
                />
                {/* Content */}
                <div className="flex h-full flex-col justify-center p-5 md:p-10">
                    <Headline className="text-yellow">
                        Jetzt loslegen
                    </Headline>
                    <p className="text-white md:text-lg">
                        Erstellen Sie Ihr Testament in nur wenigen Schritten und hinterlassen Sie ein Vermächtnis, das zählt.
                    </p>
                </div>
                {/* Content end */}
            </header>
            {/* Left Image with Text end */}

            {/* Form Fields */}
            <Formik initialValues={initalFormValues} validationSchema={formValidation} onSubmit={onSubmit}>
                {({ values, setFieldValue }: FormikProps<LastWillStart>) =>
                    <Form className="h-full flex flex-col lg:pl-10 xl:w-1/2 mb-5 md:mb-0">
                        {/* German Citizenship Field */}
                        <div className="mb-5 lg:my-10">
                            <Label name="germanCitizenship" className="font-semibold block mb-2" labelText="Besitzen Sie die Deutsche Staatsbürgerschaft?" inputRequired />
                            <div className="grid grid-cols-2 gap-3 mb-2">
                                <CustomSelectionButton active={values.germanCitizenship === true} activeColor="green" onClick={() => setFieldValue("germanCitizenship", true)} headline="Ja" description="Ich besitze die Deutsche Staatsbürgerschaft." />
                                <CustomSelectionButton active={values.germanCitizenship === false} activeColor="red" activeIcon="cancel" onClick={() => setFieldValue("germanCitizenship", false)} headline="Nein" description="Ich besitze eine Ausländische Staatsbürgerschaft." />
                            </div>
                            <FormError fieldName="germanCitizenship" />
                        </div>
                        {/* German Citizenship Field end */}

                        {/* German Right of Inheritance Field */}
                        <div className="mb-5 md:mb-10">
                            <Label name="germanRightOfInheritance" className="font-semibold block mb-2" labelText="Soll das Testament nach Deutschem Erbrecht verfasst werden?" inputRequired />
                            <div className="grid grid-cols-2 gap-3 mb-2">
                                <CustomSelectionButton active={values.germanRightOfInheritance === true} activeColor="green" onClick={() => setFieldValue("germanRightOfInheritance", true)} headline="Ja" description="Das Testament soll nach Deutschem Erbrecht verfasst werden." />
                                <CustomSelectionButton active={values.germanRightOfInheritance === false} activeColor="red" activeIcon="cancel" onClick={() => setFieldValue("germanRightOfInheritance", false)} headline="Nein" description="Das Testament soll nach einem anderen Erbrecht verfasst werden." />
                            </div>
                            <FormError fieldName="germanRightOfInheritance" />
                        </div>
                        {/* German Right of Inheritance Field end */}

                        {/* Submit Button */}
                        <Button type="submit" icon="arrow_forward" className="ml-auto mt-auto">Nächster Schritt</Button>
                    </Form>
                }
            </Formik>
            {/* Form Fields end */}
        </div>
    )
}

export default Start
