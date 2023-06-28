import { Arbutus_Slab, Plus_Jakarta_Sans } from 'next/font/google'

// Load all fonts here and use the font.classname to apply
// example: className={`${fontPlusJakartaSans.className}`}
export const fontPlusJakartaSans = Plus_Jakarta_Sans({
	subsets: ['latin'],
	display: 'swap',
	preload: true,
})

export const fontArbutusSlab = Arbutus_Slab({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
})
