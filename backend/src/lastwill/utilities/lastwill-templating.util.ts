import {
  FinancialAsset,
  Item,
  Organisation,
  Person,
  PersonType,
} from '../../db/entities/lastwill.entity'
import {
  LastWillParagraph,
  TestatorHeader,
} from '../dto/generated-lastwill.dto'
import {
  getPossessivePronouns,
  joinStringArrayForSentence,
} from './grammar.utils'

export const PLACEHOLDERS = {
  CITY: '[Stadt]',
  HOUSE_NUMBER: '[Hausnummer]',
  ZIP_CODE: '[PLZ]',
  PERSON_NAME: '[Name]',
  STREET: '[Straßenname]',
  BIRTH_DATE: '[Geburtsdatum]',
  BIRTH_PLACE: '[Geburtsort]',
  COMPANY_NAME: '[Unternehmensname]',
  PERCENTAGE: '[Prozentsatz]',
  CURRENCY: '[Währung]',
  CALCULATED_AMOUNT: '[Errechneter Wert]',
  FINANCIAL_ASSET_LOCATION: '[Bank/Ort]',
  ITEM_NAME: '[Gegenstand]',
}

export const PARAGRAPH_TITLES = {
  FINANCIAL: 'Erbeinsetzung',
  FINANCIAL_ADDITIONAL: 'Ersatzerbe',
  ITEM: 'Vermächtnisse',
  GERMAN_LAW: 'Rechtswahl',
  SEVERABILITY_CLAUSE: 'Salvatorische Klausel',
}

export function generateTestatorHeader(
  testatorName: string,
  testatorStreet: string,
  testatorhouseNumber: string,
  testatorCity: string,
  testatorZipCode: string,
): TestatorHeader {
  return {
    fullName: testatorName || PLACEHOLDERS.PERSON_NAME,
    AddressStreet: `${testatorStreet || PLACEHOLDERS.STREET} ${
      testatorhouseNumber || PLACEHOLDERS.HOUSE_NUMBER
    }`,
    AddressCity: `${testatorZipCode || PLACEHOLDERS.ZIP_CODE} ${
      testatorCity || PLACEHOLDERS.CITY
    }`,
  }
}

export function generateLocationHeader(city: string): string {
  return `${city || PLACEHOLDERS.CITY}, den ${new Date().toLocaleDateString(
    'de-DE',
  )}`
}

export function generateInitialText(
  testatorName: string,
  birthdate: string,
  birthPlace: string,
): string {
  return `Ich, ${testatorName || PLACEHOLDERS.PERSON_NAME}, geboren am ${
    getDateorPlaceholder(birthdate) || PLACEHOLDERS.BIRTH_DATE
  } in ${
    birthPlace || PLACEHOLDERS.BIRTH_PLACE
  }, widerrufe mit diesem Testament alle bisher errichteten Verfügungen von Todes wegen und bestimme hiermit Folgendes:`
}

export function generateInheritanceForOrganisation(
  organisation: Organisation,
): string {
  return `Das Unternehmen, ${
    organisation.name || PLACEHOLDERS.COMPANY_NAME
  }, aus ${organisation.address?.zipCode || PLACEHOLDERS.ZIP_CODE} ${
    organisation.address?.city || PLACEHOLDERS.CITY
  }, mit einem Anteil in Höhe von ${
    organisation.percentage || PLACEHOLDERS.PERCENTAGE
  } Prozent meines Vermögens`
}

export function generateInheritanceForPerson(person: Person) {
  const correctPossessivePronouns = getPossessivePronouns(
    person.type,
    person.gender,
  )
  return `${correctPossessivePronouns}, ${
    person.name || PLACEHOLDERS.PERSON_NAME
  } geboren am ${
    getDateorPlaceholder(person.birthDate) || PLACEHOLDERS.BIRTH_DATE
  } mit einem Anteil von ${
    person.percentage || PLACEHOLDERS.PERCENTAGE
  } Prozent meines Vermögens.`
}

export function getOptionalDescription(text: string): string {
  if (!text || text === '') {
    return ''
  }
  return `( ${text} )`
}

export function getDateorPlaceholder(dateString: string): string | undefined {
  if (!dateString) return
  return new Date(dateString).toLocaleDateString('de-de')
}

export function getFormattedCurrencyValues(value: number, currency: string) {
  console.log(value, currency)
  if (!value || !currency) return ''
  return `(${value.toString()} ${currency})`
}

export function generateFinancialInheritancePragraphs(
  heirs: (Person | Organisation)[],
  financialAssets: FinancialAsset[],
): LastWillParagraph[] {
  const mainParagraph: LastWillParagraph = {
    title: PARAGRAPH_TITLES.FINANCIAL,
    contents: [],
  }

  const financialAssetList = financialAssets.map((asset) => {
    const assetLocation = asset.where || PLACEHOLDERS.FINANCIAL_ASSET_LOCATION
    return `${assetLocation} ${getFormattedCurrencyValues(
      asset.amount,
      asset.currency,
    )}`
  })

  mainParagraph.contents.push(
    `Als Erbe meines Vermögens, aufgeteilt auf ${joinStringArrayForSentence(
      financialAssetList,
    )}, setze ich folgende Personen ein:`,
  )

  for (const heir of heirs) {
    // Company
    if (heir.type === PersonType.ORGANISATION) {
      mainParagraph.contents.push(
        generateInheritanceForOrganisation(heir as Organisation),
      )
    } else {
      mainParagraph.contents.push(generateInheritanceForPerson(heir as Person))
    }
  }

  // The second paragraph is a standard paragraph handling death of one of the heirs
  return [
    mainParagraph,
    {
      title: PARAGRAPH_TITLES.FINANCIAL_ADDITIONAL,
      contents: [
        'Sollte einer der Erben, vor mir verstorben sein, erhalten die verbliebenen Erben diesen Erbteil entsprechend dem Verhältnis der von mir vorgegebenen Erbanteile.',
      ],
    },
  ]
}

export function generateItemInheritanceParagraph(
  heirs: (Person | Organisation)[],
  items: Item[],
): LastWillParagraph {
  const paragraph: LastWillParagraph = {
    title: PARAGRAPH_TITLES.ITEM,
    contents: [],
  }
  // Build hashmap for efficiency
  const itemMap: Map<string, Item> = new Map<string, Item>()
  for (const item of items) {
    itemMap.set(item.id, item)
  }

  for (const heir of heirs) {
    const itemNames = heir.itemIds.map((id) => {
      const itemName = itemMap.get(id)?.name || PLACEHOLDERS.ITEM_NAME
      return `${itemName} ${getOptionalDescription(
        itemMap.get(id)?.description,
      )}`
    })

    if (heir.type === PersonType.ORGANISATION) {
      paragraph.contents.push(
        `Ich vermache dem Unternehmen ${
          heir.name || PLACEHOLDERS.COMPANY_NAME
        } die folgenden Erbgegenstände ohne Anrechnung auf den Erbanteil: ${joinStringArrayForSentence(
          itemNames,
        )}`,
      )
    } else {
      // Add birthdate
      paragraph.contents.push(
        `Ich vermache ${heir.name || PLACEHOLDERS.PERSON_NAME}, geboren am ${
          getDateorPlaceholder(heir.birthDate) || PLACEHOLDERS.BIRTH_DATE
        } , die folgenden Erbgegenstände ohne Anrechnung auf den Erbanteil: ${joinStringArrayForSentence(
          itemNames,
        )}`,
      )
    }
  }
  // Legal gibberish
  paragraph.contents.push(
    ...[
      'Die Vermächtnisse fallen jeweils mit dem Erbfall an und sind sofort fällig.',
      'Etwaige Kosten der Vermächtniserfüllung haben die jeweiligen Vermächtnisnehmer zu tragen.',
      'Ersatzvermächtnisnehmer sind nicht bestimmt. Das jeweilige Vermächtnis entfällt ersatzlos, wenn der/die Vermächtnisnehmer/-in vor oder nach dem Erbfall, gleich aus welchem Grunde, wegfällt.',
    ],
  )
  return paragraph
}

export function getLegalClauses(): LastWillParagraph[] {
  return [
    {
      title: PARAGRAPH_TITLES.GERMAN_LAW,
      contents: [
        'Auf meinen gesamten Nachlass sowie für Fragen, die die Wirksamkeit dieses Testaments betreffen, soll deutsches Erbrecht anwendbar sein. Diese Rechtswahl soll auch dann weiterhin Gültigkeit haben, wenn ich meinen letzten gewöhnlichen Aufenthalt im Ausland habe.',
      ],
    },
    {
      title: PARAGRAPH_TITLES.SEVERABILITY_CLAUSE,
      contents: [
        'Sollte eine der in diesem Testament enthaltenen Anordnungen unwirksam sein, so behalten dennoch alle anderen Anordnungen ihre Wirkung.',
      ],
    },
  ]
}
