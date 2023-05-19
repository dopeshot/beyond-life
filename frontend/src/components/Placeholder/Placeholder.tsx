type PlaceholderProps = {
	/** Name of placeholder. */
	name: string
	/** Style of placeholder. */
	className?: string
	/** For testing. */
	datacy?: string
}

/**
 * Placeholder component to show where a component is missing and easier to find.
 */
export const Placeholder: React.FC<PlaceholderProps> = ({ name, className = '', datacy }) => {
	return (
		<div
			className={`bg-green-500 text-center p-2${className ? ` ${className}` : ''}`}
			data-cy={datacy}
		>
			P
		</div>
	)
}
