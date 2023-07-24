export type NavLink = {
	text: string
} & (
	| {
			href: string
	  }
	| {
			onClick: () => void
	  }
)
