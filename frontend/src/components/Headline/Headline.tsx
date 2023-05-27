import { fontArbutusSlab } from '../../services/font/font'

type HeadlineProps = {
	/** Content of Headline. */
	children: React.ReactNode
	/** Specifies if its an h1, h2, h3,... */
	level?: 1 | 2 | 3 | 4 | 5 | 6
	/** Customize size. Is also set with level. */
	size?: string
	/** If true adds margin. */
	hasMargin?: boolean
	/** Custom classname. */
	className?: string
	/** Adds title attribute to headline. */
	title?: string
	/** For testing. */
	datacy?: string
}

/** Defines the classes for each size level */
export const twTextSizes: { [K in Required<HeadlineProps>['level']]: string } = {
	1: 'text-2xl md:text-4xl',
	2: 'text-2xl md:text-3xl',
	3: 'text-xl md:text-2xl',
	4: 'text-lg md:text-xl',
	5: 'text-base md:text-lg',
	6: '',
}

/**
 * Custom Headline Component, to easy handle headlines with different level and adjustive styles.
 */
export const Headline: React.FC<HeadlineProps> = ({
	level = 1,
	children,
	size,
	title,
	hasMargin = true,
	className = '',
}) => {
	const CustomTag = `h${level}` as keyof JSX.IntrinsicElements

	return (
		<CustomTag
			title={title}
			className={`${size ?? twTextSizes[level]} ${
				(level === 1 || level === 2) && fontArbutusSlab.className
			} font-bold ${hasMargin ? 'mb-2' : ''} ${className}`}
		>
			{children}
		</CustomTag>
	)
}
