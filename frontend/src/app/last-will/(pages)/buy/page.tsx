'use client'
import Image from 'next/image'
import image from '../../../../assets/images/layout/testamentPreview.jpg'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { Headline } from '../../../../components/Headline/Headline'
import { Icon } from '../../../../components/Icon/Icon'

/**
 * Paywall Page
 */
const Buy = () => {
	return (
		<div className="container mt-5 flex flex-col gap-8 p-8 md:px-40 lg:h-[calc(100vh-130px-60px)] lg:flex-row lg:gap-4 lg:p-8 xl:p-20">
			<div className="order-2 flex h-full flex-col justify-center lg:order-1 lg:w-1/2 lg:p-4">
				<div className="mb-12">
					<Headline>Ihr Testament ist bereit, um abgeschrieben zu werden</Headline>
					<p className="text-xl">Schalten Sie es jetzt frei</p>
				</div>

				{/* TODO onClick weiterleiten zu stripe */}
				{/* Price Plans */}
				<div className="flex w-full flex-col justify-center gap-4 sm:flex-row lg:justify-start">
					{/* Basic Plan */}
					<div className="w-auto rounded-xl border-2 px-6 py-3">
						<div className="mb-4">
							<p className="text-xl font-bold">Basic</p>
							<p className="text-3xl font-bold">49€</p>
						</div>

						<Button className="mb-4">Auswählen</Button>

						<div className="flex gap-2">
							<Icon icon="check" className="text-yellow-700" />
							<p>1 Testament</p>
						</div>
						<div className="flex gap-2">
							<Icon icon="check" className="text-yellow-700" />
							<p>Immer anpassbar</p>
						</div>
					</div>

					{/* Premium Plan */}
					<div className="w-auto rounded-xl border-2 px-6 py-3">
						<div className="mb-4">
							<p className="text-xl font-bold">Premium</p>
							<p className="text-3xl font-bold">149€</p>
						</div>

						<Button className="mb-4">Auswählen</Button>

						<div className="flex gap-2">
							<Icon icon="check" className="text-yellow-700" />
							<p>5 Testaments</p>
						</div>
						<div className="flex gap-2">
							<Icon icon="check" className="text-yellow-700" />
							<p>Immer anpassbar</p>
						</div>
					</div>
				</div>
			</div>

			{/* Image */}
			<div className="order-1 flex w-full items-center justify-center lg:order-2 lg:w-1/2">
				<div className="h-full max-h-[580px] w-40 rounded-xl border-2 p-4 lg:w-auto lg:rounded-3xl">
					<Image className="h-full w-auto object-cover object-top blur-[2px]" src={image} alt="Testament Preview" />
				</div>
			</div>
		</div>
	)
}

export default Buy
