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
		<div className={`bg-gray-400 text-center ${className ? ` ${className}` : ''}`} data-cy={`${name} ${datacy}`}>
			P
		</div>
	)
}
