import { Icon } from '../Icon/Icon'

type LoadingProps = {
	text?: string
}

/**
 * Loading component
 */
export const Loading: React.FC<LoadingProps> = ({ text = 'Laden' }) => {
	return (
		<div className="flex">
			<Icon icon="sync" className="animate-spin mr-3" />
			<p>{text}...</p>
		</div>
	)
}
