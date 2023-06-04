import Image from 'next/image'
import image from '../../../../assets/images/layout/headerBackground.jpg'
import { Headline } from '../../../../components/Headline/Headline'

export const metadata = {
    title: 'Start | Beyond Life',
    description: 'Handle your death.',
}

/**
 * Testament Start Page for Legal Stuff.
 */
const TestamentStart = () => {
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
        </div>
    )
}

export default TestamentStart
