import { CheckboxOptions } from '../src/types/form'

export const testatorMoreInfosOptions: CheckboxOptions[] = [
	{
		value: 'isHandicapped',
		label: 'Haben Sie eine Behinderung?',
	},
	{
		value: 'isInsolvent',
		label: 'Sind Sie insolvent?',
	},
]

export const partnerMoreInfosOptions: CheckboxOptions[] = [
	{
		value: 'isHandicapped',
		label: 'Hat ihr Partner eine Behinderung?',
		helperText: 'Das Behindertentestament ist ein besonderes Testament. Mindestens ein Erbe hat eine Behinderung. Durch ein Behindertentestament können Angehörige mit Behinderung nach dem Ableben ihrer Eltern über dem Sozialhilfeniveau versorgt werden. Das Familienvermögen bleibt andererseits erhalten und fällt nicht an den Sozial- bzw. Eingliederungshilfeträger. Das gilt auch, wenn ein größeres Vermögen vererbt werden soll.Sinn und Zweck des Behindertentestaments ist es also, dem Kind zwar Vermögen zukommen zu lassen, gleichzeitig aber den Zugriff des Sozial- bzw. Eingliederungshilfeträgers auf das Geerbte zu verhindern.'
	},
	{
		value: 'isInsolvent',
		label: 'Ist ihr Partner insolvent?',
		helperText: 'Wenn ein Erbe sich in einem laufendem Insolvenzverfahren befindet fällt die gesamte Erbschaft in die Insolvenzmasse, so dass der Insolvenzverwalter über sie verfügt. Tritt der Erbfall während der Wohlverhaltensphase ein, muss der Erbe 50 Prozent der Erbschaft an den Treuhänder abtreten. Die andere Hälfte darf der Erbe behalten.'
	},
	{
		value: 'isBerlinWill',
		label: 'Wollen Sie ein Berliner Testament?',
		helperText: 'Ein Berliner Testament ist ein gemeinschaftliches Testament von Ehegatten oder eingetragenen Lebenspartnern, in dem sich die Partner gegenseitig zu Alleinerben einsetzen und gleichzeitig bestimmen, wer nach dem Tod des Längstlebenden Erbe werden soll.',
	},
]

export const personMoreInfosOptions: CheckboxOptions[] = [
	{
		value: 'isHandicapped',
		label: 'Hat die Person eine Behinderung?',
		helperText: 'Das Behindertentestament ist ein besonderes Testament. Mindestens ein Erbe hat eine Behinderung. Durch ein Behindertentestament können Angehörige mit Behinderung nach dem Ableben ihrer Eltern über dem Sozialhilfeniveau versorgt werden. Das Familienvermögen bleibt andererseits erhalten und fällt nicht an den Sozial- bzw. Eingliederungshilfeträger. Das gilt auch, wenn ein größeres Vermögen vererbt werden soll.Sinn und Zweck des Behindertentestaments ist es also, dem Kind zwar Vermögen zukommen zu lassen, gleichzeitig aber den Zugriff des Sozial- bzw. Eingliederungshilfeträgers auf das Geerbte zu verhindern.'
	},
	{
		value: 'isInsolvent',
		label: 'Ist die Person insolvent?',
	},
]
