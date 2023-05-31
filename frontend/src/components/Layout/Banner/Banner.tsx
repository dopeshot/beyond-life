import { Headline } from '../../Headline/Headline'

type BannerProps = {
	/** Title of banner. */
	title: string
	/** Description of banner. */
	description: string
	/** Button to display. */
	button: React.ReactNode
}

/**
 * Banner for repeat call to action, looks best when using no container.
 */
export const Banner: React.FC<BannerProps> = ({ title, description, button }) => {
	return (
		<div className="bg-yellow py-12">
			<div className="container flex flex-col items-center justify-center">
				{/* Content Text */}
				<div className="mb-2 text-center md:mb-6 md:w-2/3 xl:w-1/2">
					<Headline level={4}>{title}</Headline>
					<p>{description}</p>
				</div>

				{/* Button */}
				{button}
			</div>
		</div>
	)
}
