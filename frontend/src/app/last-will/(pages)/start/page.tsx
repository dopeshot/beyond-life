'use client'
import { Form, Formik } from 'formik'
import Image from 'next/image'
import image from '../../../../assets/images/layout/headerBackground.jpg'
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
                <Form>
                    <Label name="germanCitizenship" labelText="Besitzen Sie die Deutsche Staatsbürgerschaft?" inputRequired />
                    <div className="border border-gray-300">

                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Start
