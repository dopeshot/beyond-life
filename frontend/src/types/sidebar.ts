export enum SidebarPages {
	TESTATOR = 'testator',
	MARRIAGE = 'marriage',
	HEIRS = 'heirs',
	INHERITANCE = 'inheritance',
	SUCCESSION = 'succession',
	FINAL = 'final',
}

export enum SidebarButtonState {
	ACTIVE = 'active',
	DEFAULT = 'default',
	DISABLED = 'disabled',
}

export type SidebarElement = {
	page: SidebarPages
	title: string
	description?: string
}
