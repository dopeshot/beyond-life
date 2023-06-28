'use client'
import { useLastWillContext } from '../../store/last-will/LastWillContext'
import { Headline } from '../Headline/Headline'
import { Icon } from '../Icon/Icon'

/**
 * Display Last Will.
 */
export const LastWill = () => {
	const { lastWill } = useLastWillContext()

	return (
		<div className="mt-2 flex-1 rounded-xl border-2 border-gray-100 px-4 py-3 md:px-8 md:py-6">
			<div className="flex pb-8">
				<Icon icon="edit" className="mr-2" />
				<Headline level={3} size="text-lg">
					Vorlage zum Abschreiben
				</Headline>
			</div>
			<Headline level={3} size="text-lg" className="pb-4 text-center">
				Mein letzter Wille und Testament
			</Headline>
			<p className="pb-2">
				Ich, {lastWill?.testator?.firstName || ' [Name] '} {lastWill.testator.lastName}, geboren am{' '}
				{lastWill.testator.birthDate || ' [Geburtstag] '} in {lastWill.testator.birthPlace || ' [Geburtsort] '},
				widerrufe mit diesem Testament alle bisher errichteten Verfügungen von Todes wegen und bestimme hiermit
				Folgendes:
			</p>
			<Headline level={3} size="text-lg">
				§1 Erbeinsetzung
			</Headline>
			<p className="pb-1">Als Erben meines Nachlasses setze ich folgende Personen ein:</p>

			{lastWill.marriage.relationshipStatus === 'married' ? (
				<p className="pb-2">
					{lastWill.marriage.partnerGender === 'male'
						? 'Meinen Ehemann'
						: lastWill.marriage.partnerGender === 'female'
						? 'Meine Ehefrau'
						: 'Meinen Ehepartner'}
					, {lastWill.marriage.partnerFirstName} {lastWill.marriage.partnerLastName}, geboren am{' '}
					{lastWill.marriage.partnerDateOfBirth}, mit einem Anteil in Höhe von 30,00 Prozent.
				</p>
			) : null}

			{/*
				lastWill.heirs.persons.map((person, index) => (

				))
				*/
			}

			<Headline level={3} size="text-lg">
				§2 Ersatzerbe
			</Headline>
			<p className="pb-2">
				Sollte meine Frau, {lastWill.marriage.partnerFirstName} {lastWill.marriage.partnerLastName}, vor mir verstorben
				sein, erhalten die verbliebenen Erben diesen Erbteil entsprechend dem Verhältnis der von mir vorgegebenen
				Erbanteile.
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
