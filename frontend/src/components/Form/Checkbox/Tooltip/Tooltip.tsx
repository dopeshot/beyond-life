import React from 'react'

type TooltipProps = {
	children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
	return (
		<div
			className="absolute w-80 rounded-md bg-black p-2 text-sm text-white"
			style={{
				top: '100%',
				left: '50%',
				transform: 'translateX(-50%)',
			}}
		>
			{children}
		</div>
	)
}

export default Tooltip
