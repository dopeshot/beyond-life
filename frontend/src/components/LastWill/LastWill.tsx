'use client'
import { useLastWillContext } from '../../store/last-will/LastWillContext'
import { HeirsTypes } from '../../store/last-will/heirs/state'
import { FinancialAsset } from '../../store/last-will/inheritance/state'
import { Gender } from '../../types/gender'
import { Headline } from '../Headline/Headline'

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
			if (financialAsset.currency === '€') {
				if (financialAsset.amount) {
					sum += Number(financialAsset.amount)
				}
			}
		})
		return sum
	}

	const getMoneyAmount = (amount: number, percentage: number) => {
		return (percentage / 100) * amount
	}

	return (
		<div className="w-100 mt-2 flex-1 rounded-xl border-2 border-gray-100 px-4 py-3 md:px-8 md:py-6 xl:w-5/6 2xl:w-4/6">
			{/* Header */}
			<div className="flex justify-between pt-6 font-semibold">
				<div className="flex flex-col">
					<p>
						{lastWill?.testator?.firstName || ' [Vorname] '} {lastWill.testator.lastName || ' [Nachname] '}
					</p>
					<p>
						{lastWill?.testator?.street || ' [Straße] '} {lastWill?.testator?.houseNumber || ' [Hausnummer] '}
					</p>
					<p>
						{lastWill?.testator?.postalCode || ' [PLZ] '} {lastWill?.testator?.city || ' [Ort] '}
					</p>
				</div>
				<div>
					<p>
						{lastWill?.testator?.city || ' [Ort] '}, den{' '}
						{new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}
					</p>
				</div>
			</div>
			{/* Start Testament */}
			<Headline level={3} size="text-lg" className="pb-8 pt-12 text-center">
				Mein letzter Wille und Testament
			</Headline>
			{/* Erblasser */}
			<p className="pb-8">
				Ich, {lastWill?.testator?.firstName || ' [Vorname] '} {lastWill.testator.lastName || ' [Nachname] '}, geboren am{' '}
				{lastWill.testator.birthDate || ' [Geburtstag] '} in {lastWill.testator.birthPlace || ' [Geburtsort]'},
				widerrufe mit diesem Testament alle bisher errichteten Verfügungen von Todes wegen und bestimme hiermit
				Folgendes:
			</p>
			{/* Verteiltes Erbe */}
			<Headline level={3} size="text-lg">
				§1 Erbeinsetzung
			</Headline>
			<p className="pb-4">Als Erben meines Nachlasses setze ich folgende Personen ein:</p>
			{lastWill.marriage.relationshipStatus === undefined && lastWill.heirs.persons.length === 0 && (
				<p className="pb-4">[Keine Erben angegeben]</p>
			)}
			{/* Ehepartner */}
			{lastWill.marriage.relationshipStatus === 'married' && (
				<p className="pb-4">
					{getPartnerGenderText(lastWill.marriage.partnerGender ?? 'divers')},{' '}
					{lastWill.marriage.partnerFirstName || ' [Name] '} {lastWill.marriage.partnerLastName || '[Nachname]'},
					geboren am {lastWill.marriage.partnerDateOfBirth || ' [Geburtstag] '}, mit einem Anteil in Höhe von{' '}
					{lastWill.marriage.percentage || ' [?%] '} Prozent.
					{lastWill.inheritance.financialAssets[0].amount !== '' && (
						<>
							Dies entspricht einem Wert von{' '}
							{getMoneyAmount(calculateSumOfMoney(lastWill.inheritance.financialAssets), lastWill.marriage.percentage)}{' '}
							€.
						</>
					)}
				</p>
			)}
			{/* Sonstige Erben außer Ehepartner */}
			{lastWill.heirs.persons.map((person, index) => (
				<p key={index} className="pb-4">
					{getHeirGenderText(person.heirsType ?? 'other', person.gender ?? 'divers')},{' '}
					{person.firstName || ' [Vorname] '} {person.lastName || ' [Nachname]'}, geboren am{' '}
					{person.dateOfBirth || ' [Geburtstag] '}, mit einem Anteil in Höhe von {person.percentage || ' [?%] '}{' '}
					Prozent.
					{lastWill.inheritance.financialAssets.length > 1 && (
						<>
							Dies entspricht einem Wert von{' '}
							{getMoneyAmount(calculateSumOfMoney(lastWill.inheritance.financialAssets), person.percentage)} €.
						</>
					)}
				</p>
			))}
			
			{/* Unternehmen die erben */}
			{lastWill.heirs.organisations.map((organisation, index) => (
				<p key={index} className="pb-4">
					Das Unternehmen, {organisation.name || ' [Name] '}, aus {organisation.zipCode} {organisation.city}, mit einem
					Anteil in Höhe von {organisation.percentage || ' [?%] '} Prozent.
					{lastWill.inheritance.financialAssets.length > 0 && (
						<>
							Dies entspricht einem Wert von{' '}
							{getMoneyAmount(calculateSumOfMoney(lastWill.inheritance.financialAssets), organisation.percentage)} €.
						</>
					)}
				</p>
			))}

			{/* Ersatzerbe fixer String */}
			<Headline level={3} size="text-lg">
				§2 Ersatzerbe
			</Headline>
			<p className="pb-4">
				Sollte einer der Erben, vor mir verstorben sein, erhalten die verbliebenen Erben diesen Erbteil entsprechend dem
				Verhältnis der von mir vorgegebenen Erbanteile.
			</p>

			{/* Vermächtnisse */}
			{lastWill.inheritance.items[0].name !== '' && (
				<>
					<Headline level={3} size="text-lg">
						§3 Vermächtnisse
					</Headline>

					{/* Vermächtnisse Ehepartner */}
					{lastWill.marriage.relationshipStatus === 'married' &&
						lastWill.marriage.items.length > 0 &&
						lastWill.marriage.items.map((item, index) => (
							<p key={index} className="pb-2">
								Ich vermache {lastWill.marriage.partnerFirstName || ' [Vorname] '}{' '}
								{lastWill.marriage.partnerLastName || ' [Nachname]'}, geboren am{' '}
								{lastWill.marriage.partnerDateOfBirth || ' [Geburtstag] '}, ohne Anrechnung auf ihren Erbteil,{' '}
								{item.name}.
								{item.description !== '' && (
									<>
										{' '}
										{lastWill.marriage.partnerFirstName || ' [Vorname] '} ist mit der folgenden Auflage beschwert:{' '}
										{item.description}.
									</>
								)}
							</p>
						))}

					{/* Vermächtnisse sontige Erben */}
					{lastWill.heirs.persons.map(
						(person, index) =>
							person.items.length > 0 &&
							person.items.map((item, index) =>
								lastWill.inheritance.items.map((item, index) => (
									<p key={index} className="pb-2">
										Ich vermache {person.firstName || ' [Vorname] '} {person.lastName || ' [Nachname]'}, geboren am{' '}
										{person.dateOfBirth || ' [Geburtstag] '}, ohne Anrechnung auf ihren Erbteil, {item.name}.
										{item.description !== '' && (
											<>
												{' '}
												{person.firstName || ' [Vorname] '} ist mit der folgenden Auflage beschwert: {item.description}.
											</>
										)}
									</p>
								))
							)
					)}

					{lastWill.heirs.persons.map(
						(person, index) =>
							person.items.length > 0 &&
							person.items.map((itemId) => {
								const item = lastWill.inheritance.items.find((item) => item.id === itemId)
								if (item) {
									return (
										<p key={itemId} className="pb-2">
											Ich vermache {person.firstName || ' [Vorname] '} {person.lastName || ' [Nachname]'}, geboren am{' '}
											{person.dateOfBirth || ' [Geburtstag] '}, ohne Anrechnung auf ihren Erbteil, {item.name}.
											{item.description !== '' && (
												<>
													{' '}
													{person.firstName || ' [Vorname] '}
													ist mit der folgenden Auflage beschwert: {item.description}.
												</>
											)}
										</p>
									)
								}
							})
					)}

					<p className="pb-3">Die Vermächtnisse fallen jeweils mit dem Erbfall an und sind sofort fällig.</p>
					<p className="pb-3">
						Etwaige Kosten der Vermächtniserfüllung haben die jeweiligen Vermächtnisnehmer zu tragen.
					</p>
					<p className="pb-3">
						Ersatzvermächtnisnehmer sind nicht bestimmt. Das jeweilige Vermächtnis entfällt ersatzlos, wenn der/die
						Vermächtnisnehmer/-in vor oder nach dem Erbfall, gleich aus welchem Grunde, wegfällt.
					</p>
				</>
			)}

			{/* Rechtswahl */}
			{lastWill.inheritance.items[0].name !== '' ? (
				<Headline level={3} size="text-lg">
					§4 Rechtswahl
				</Headline>
			) : (
				<Headline level={3} size="text-lg">
					§3 Rechtswahl
				</Headline>
			)}
			<p className="pb-4">
				Auf meinen gesamten Nachlass sowie für Fragen, die die Wirksamkeit dieses Testaments betreffen, soll deutsches
				Erbrecht anwendbar sein. Diese Rechtswahl soll auch dann weiterhin Gültigkeit haben, wenn ich meinen letzten
				gewöhnlichen Aufenthalt im Ausland habe.
			</p>
			{/* Klausel */}
			{lastWill.inheritance.items[0].name !== '' ? (
				<Headline level={3} size="text-lg">
					§5 Salvatorische Klausel
				</Headline>
			) : (
				<Headline level={3} size="text-lg">
					§4 Salvatorische Klausel
				</Headline>
			)}
			<p className="pb-4">
				Sollte eine der in diesem Testament enthaltenen Anordnungen unwirksam sein, so behalten dennoch alle anderen
				Anordnungen ihre Wirkung.
			</p>

			<div className="mt-8">
				<p className="mb-2">[Deine Unterschrift]</p>
				<hr className=" w-2/6 border-t-2" />
				<p className="mt-2">
					{lastWill?.testator?.firstName || ' [Vorname] '} {lastWill?.testator?.lastName || ' [Nachname] '}
				</p>
			</div>

			<div className=" pt-10">
				Hinweis: Dieses Testament-Generierungstool ist ein Prototyp und ausschließlich für die Media Night an der
				Hochschule der Medien in Stuttgart gedacht. Es ist noch in Entwicklung und bietet derzeit keine rechtliche
				Absicherung, doch wir arbeiten daran, in Zukunft eine Notarvalidierung bereitzustellen.
			</div>
		</div>
	)
}
