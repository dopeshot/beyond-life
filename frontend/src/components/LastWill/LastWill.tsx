'use client'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getLastWillFulltext } from '../../services/api/lastwill/lastWillFulltext'
import { useAppSelector } from '../../store/hooks'
import { GeneratedLastWill } from '../../types/lastWill'
import { Headline } from '../Headline/Headline'

/**
 * Display Last Will.
 */
export const LastWill = () => {
	const _id = useAppSelector((state) => state.lastWill.data._id)
	const [lastWill, setLastWill] = useState<GeneratedLastWill | null>(null)

	useEffect(() => {
		const getGeneratedLastWill = async () => {
			const response = await getLastWillFulltext(_id)
			setLastWill(response)
		}
		getGeneratedLastWill()
	}, [_id])

	if (!lastWill) return notFound()

	return (
		<main className="w-100 bg-red-0 my-2 flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 md:px-8 md:py-6 xl:w-5/6 2xl:w-4/6">
			<section className="bg-red-0 mb-8 flex justify-between">
				<aside>
					<p>{lastWill.testatorHeader.fullName}</p>
					<p>{lastWill.testatorHeader.AddressStreet}</p>
					<p>{lastWill.testatorHeader.AddressCity}</p>
				</aside>
				<aside className="bg-red-0">
					<p>
						{lastWill.locationHeader}, den {new Date().toLocaleDateString()}
					</p>
				</aside>
			</section>
			<section className="bg-green-0 mb-8 text-center">
				<Headline level={3} hasMargin>
					{lastWill.title}
				</Headline>
			</section>
			<p className="mb-4">{lastWill.initialText}</p>
			<section className="bg-yellow-0 mb-8">
				{lastWill.paragraphs.map((paragraph, index) => (
					<div key={index} className="mb-6">
						<Headline level={4} hasMargin>
							{paragraph.title}
						</Headline>
						{paragraph.contents.map((content, index) => (
							<p key={index}>{content}</p>
						))}
					</div>
				))}
			</section>
			<section className="mb-8 flex">
				<div>
					<p className="mb-4">[IHRE UNTERSCHRIFT]</p>
					<hr className="border-t-1 mb-4 border-black" />
					<p>{lastWill.testatorHeader.fullName}</p>
				</div>
			</section>
			<footer>
				<p className="mb-4 text-gray-600">
					Hinweis: Das Testament muss mit der Hand geschrieben werden. Dieser Text stellt keinen Ersatz für
					professionelle rechtliche Beratung dar. Wenn Sie Fragen oder Bedenken haben, sollten Sie einen Anwalt
					konsultieren.
				</p>
			</footer>
		</main>
	)
}
