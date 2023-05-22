export type NavLink = {
	text: string
} & (
	| {
			to: string
	  }
	| {
			onClick: () => void
	  }
)
