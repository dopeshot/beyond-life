import { SidebarElement, SidebarPages } from '../src/types/sidebar'

export const sidebarElements: SidebarElement[] = [
	{
		page: SidebarPages.TESTATOR,
		title: 'Erblasser',
		description: 'Persönliche Daten des Erblassers',
	},
	{
		page: SidebarPages.MARRIAGE,
		title: 'Familienstand',
		description: 'Beziehungsstatus, Art des Testaments, Daten des Ehepartners',
	},
	{
		page: SidebarPages.HEIRS,
		title: 'Erben',
		description: 'Erben und deren Anteile',
	},
	{
		page: SidebarPages.INHERITANCE,
		title: 'Erbschaft',
		description: 'Erbschaftsgegenstände',
	},
	{
		page: SidebarPages.SUCCESSION,
		title: 'Erbfolge',
		description: 'Stammbaum und Verteilung',
	},
	{
		page: SidebarPages.FINAL,
		title: 'Zusammenfassung',
		description: 'Überprüfung und Abschreiben',
	},
]
