import Image from 'next/image'
import image from '../../../../assets/images/layout/testamentPreview.jpg'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { Headline } from '../../../../components/Headline/Headline'
import { Icon } from '../../../../components/Icon/Icon'

export const metadata = {
	title: 'Auth | Siebtes Leben',
	description: '',
}

/**
 * Login/Register Page with ads for last will.
 */
const Advertisement = () => {
	return (
		<div className="container mt-5 flex flex-col gap-8 p-8 md:px-16 lg:h-[calc(100vh-130px-60px)] lg:flex-row lg:gap-4">
			<div className="order-2 mx-0 flex h-full flex-col justify-center lg:order-1 lg:w-1/2 lg:p-4">
				<div className="mb-8 flex flex-col">
					<Headline>Ihr Testament ist bereit, um abgeschrieben zu werden</Headline>
					<p className="text-xl font-bold">Schalten Sie es jetzt frei</p>
				</div>

				{/* Features */}
				<div className="mb-16 flex flex-col gap-2">
					<div className="flex items-center gap-6">
						<Icon icon="check" className="text-yellow-700" />
						<p>Zählt ein Leben lang</p>
					</div>
					<div className="flex items-center gap-6">
						<Icon icon="sync" className="text-yellow-700" />
						<p>Flexibel und anpassbar</p>
					</div>
					<div className="flex items-center gap-6">
						<Icon icon="lock" className="text-yellow-700" />
						<p>Zählt ein Leben lang</p>
					</div>
				</div>

				{/* Buttons */}
				<div className="flex flex-col-reverse items-center justify-center gap-4 sm:flex-row sm:justify-between">
					<Button icon="login" kind="tertiary" className="w-auto">
						Login
					</Button>
					<Button icon="arrow_forward" className="sm:w-max">
						Account erstellen
					</Button>
				</div>
			</div>

			{/* Image */}
			<div className="order-1 flex w-full items-center justify-center lg:order-2 lg:h-full lg:w-1/2">
				<div className="h-full max-h-[580px] w-40 rounded-xl border-2 p-4 lg:w-auto lg:rounded-3xl">
					<Image className="h-full w-auto object-cover object-top blur-[2px]" src={image} alt="Testament Preview" />
				</div>
			</div>
		</div>
	)
}

export default Advertisement
