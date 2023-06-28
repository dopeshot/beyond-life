'use client'
import { useLastWillContext } from '../../store/last-will/LastWillContext'
import { HeirsTypes } from '../../store/last-will/heirs/state'
import { FinancialAsset } from '../../store/last-will/inheritance/state'
import { Gender } from '../../types/gender'
import { Headline } from '../Headline/Headline'
import { Icon } from '../Icon/Icon'

/**
 * Display Last Will.
 */
export const LastWill = () => {
	const { lastWill } = useLastWillContext()

	const getPartnerGenderText = (gender: Gender) => {
		if (gender === 'male') {
			return 'Meinen Ehemann'
		} else if (gender === 'female') {
			return 'Meine Ehefrau'
		} else {
			return 'Meinen Ehepartner'
		}
	}

	const getHeirGenderText = (heirType: HeirsTypes, heirGender: Gender) => {
		switch (heirType) {
			case 'mother':
				return 'Meine Mutter'
			case 'father':
				return 'Mein Vater'
			case 'child':
				return heirGender === 'male' ? 'Mein Sohn' : heirGender === 'female' ? 'Meine Tochter' : 'Mein Kind'
			case 'siblings':
				return heirGender === 'male' ? 'Mein Bruder' : heirGender === 'female' ? 'Meine Schwester' : 'Mein Geschwister'
			case 'other':
				return 'Mein Erbe'
			case 'organisation':
				return 'Das Unternehmen'
			default:
				return ''
		}
	}

	const calculateSumOfMoney = (financialAssets: FinancialAsset[]) => {
		let sum = 0
		financialAssets.forEach((financialAsset) => {
			if (financialAsset.amount) {
				sum += Number(financialAsset.amount)
			}
		})
		return sum
	}

	const getMoneyAmount = (amount: number, percentage: number) => {
		return (percentage / 100) * amount
	}

	return (
		<div className="w-100 mt-2 flex-1 rounded-xl border-2 border-gray-100 px-4 py-3 md:px-8 md:py-6 xl:w-5/6 2xl:w-4/6">
			<div className="flex">
				<Icon icon="edit" className="mr-2" />
				<Headline level={3} size="text-lg">
					Vorlage zum Abschreiben
				</Headline>
			</div>
			Ein gültiges Testament muss vom Erblasser handschriftlich und eigenhändig verfasst und unterzeichnet werden.
			<Headline level={3} size="text-lg" className="pb-4 pt-4 text-center">
				Mein letzter Wille und Testament
			</Headline>
			<p className="pb-2">
				Ich, {lastWill?.testator?.firstName || ' [Vorname] '} {lastWill.testator.lastName || ' [Nachname] '}, geboren am{' '}
				{lastWill.testator.birthDate || ' [Geburtstag] '} in {lastWill.testator.birthPlace || ' [Geburtsort]'},
				widerrufe mit diesem Testament alle bisher errichteten Verfügungen von Todes wegen und bestimme hiermit
				Folgendes:
			</p>
			<Headline level={3} size="text-lg">
				§1 Erbeinsetzung
			</Headline>
			<p className="pb-1">Als Erben meines Nachlasses setze ich folgende Personen ein:</p>
			{lastWill.marriage.relationshipStatus === undefined && lastWill.heirs.persons.length === 0 && (
				<p className="pb-2">[Keine Erben angegeben]</p>
			)}
			{lastWill.marriage.relationshipStatus === 'married' && (
				<p className="pb-2">
					{getPartnerGenderText(lastWill.marriage.partnerGender ?? 'divers')},{' '}
					{lastWill.marriage.partnerFirstName || ' [Name] '} {lastWill.marriage.partnerLastName || '[Nachname]'},
					geboren am {lastWill.marriage.partnerDateOfBirth || ' [Geburtstag] '}, mit einem Anteil in Höhe von{' '}
					{lastWill.marriage.partnerPercentageOfMoney || ' [?%] '} Prozent.
					{lastWill.inheritance.financialAssets.length > 0 && (
						<>
							Dies entspricht einem Wert von{' '}
							{getMoneyAmount(
								calculateSumOfMoney(lastWill.inheritance.financialAssets),
								lastWill.marriage.partnerPercentageOfMoney
							)}{' '}
							€.
						</>
					)}
				</p>
			)}
			{lastWill.heirs.persons.map((person, index) => (
				<p key={index} className="pb-2">
					{getHeirGenderText(person.heirsType ?? 'other', person.gender ?? 'divers')},{' '}
					{person.firstName || ' [Vorname] '} {person.lastName || ' [Nachname]'}, geboren am{' '}
					{person.dateOfBirth || ' [Geburtstag] '}, mit einem Anteil in Höhe von {person.percentageOfMoney || ' [?%] '}.
					{lastWill.inheritance.financialAssets.length > 0 && (
						<>
							Dies entspricht einem Wert von{' '}
							{getMoneyAmount(
								calculateSumOfMoney(lastWill.inheritance.financialAssets),
								person.partnerPercentageOfMoney
							)}{' '}
							€.
						</>
					)}
				</p>
			))}
			{lastWill.heirs.organisations.map((organisation, index) => (
				<p key={index} className="pb-2">
					Das Unternehmen, {organisation.name || ' [Name] '}, aus {organisation.zipCode} {organisation.city}, mit einem
					Anteil in Höhe von {organisation.percentageOfMoney || ' [?%] '}.
					{lastWill.inheritance.financialAssets.length > 0 && (
						<>
							Dies entspricht einem Wert von{' '}
							{getMoneyAmount(
								calculateSumOfMoney(lastWill.inheritance.financialAssets),
								organisation.partnerPercentageOfMoney
							)}{' '}
							€.
						</>
					)}
				</p>
			))}
			<Headline level={3} size="text-lg">
				§2 Ersatzerbe
			</Headline>
			<p className="pb-2">
				Sollte einer der Erben, vor mir verstorben sein, erhalten die verbliebenen Erben diesen Erbteil entsprechend dem
				Verhältnis der von mir vorgegebenen Erbanteile.
			</p>
			<Headline level={3} size="text-lg">
				§3 Vermächtnisse
			</Headline>
			<p className="pb-2">
				Ich vermache {}, {}, geboren am {}, ohne Anrechnung auf ihren Erbteil, {}. {} ist mit der folgenden Auflage
				beschwert: {}.
			</p>
			<p className="pb-2">Die Vermächtnisse fallen jeweils mit dem Erbfall an und sind sofort fällig.</p>
			<p className="pb-2">Etwaige Kosten der Vermächtniserfüllung haben die jeweiligen Vermächtnisnehmer zu tragen.</p>
			<p className="pb-2">
				Ersatzvermächtnisnehmer sind nicht bestimmt. Das jeweilige Vermächtnis entfällt ersatzlos, wenn der/die
				Vermächtnisnehmer/-in vor oder nach dem Erbfall, gleich aus welchem Grunde, wegfällt.
			</p>
			<Headline level={3} size="text-lg">
				§4 Rechtswahl
			</Headline>
			<p className="pb-2">
				Auf meinen gesamten Nachlass sowie für Fragen, die die Wirksamkeit dieses Testaments betreffen, soll deutsches
				Erbrecht anwendbar sein. Diese Rechtswahl soll auch dann weiterhin Gültigkeit haben, wenn ich meinen letzten
				gewöhnlichen Aufenthalt im Ausland habe.
			</p>
			<Headline level={3} size="text-lg">
				§5 Salvatorische Klausel
			</Headline>
			<p className="pb-2">
				Sollte eine der in diesem Testament enthaltenen Anordnungen unwirksam sein, so behalten dennoch alle anderen
				Anordnungen ihre Wirkung.
			</p>
		</div>
	)
}
