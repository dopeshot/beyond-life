import {
  FinancialAsset,
  Organisation,
  Person,
  PersonType,
} from '../../db/entities/lastwill.entity'
import {
  LastWillParagraph,
  TestatorHeader,
} from '../dto/generated-lastwill.dto'
import { getPossessivePronouns } from './grammar.utils'

const PLACEHOLDERS = {
  CITY: '[Stadt]',
  HOUSE_NUMBER: '[Hausnummer]',
  ZIP_CODE: '[PLZ]',
  NAME: '[Name]',
  STREET: '[Straßenname]',
  BIRTH_DATE: '[Geburtsdatum]',
  BIRTH_PLACE: '[Geburtsort]',
  COMPANY_NAME: '[Unternehmensname]',
  PERCENTAGE: '[Prozentsatz]',
  CURRENCY: '[Währung]',
  CALCULATED_AMOUNT: '[Errechneter Wert]',
  FINANCIAL_ASSET_LOCATION: '[Bank/Ort]',
}

const PARAGRAPH_TITLES = {
  FINANCIAL: 'Erbeinsetzung',
  FINANCIAL_ADDITIONAL: 'Ersatzerbe',
}

export function generateTestatorHeader(
  testatorName: string,
  testatorStreet: string,
  testatorhouseNumber: string,
  testatorCity: string,
  testatorZipCode: string,
): TestatorHeader {
  return {
    fullName: testatorName || PLACEHOLDERS.NAME,
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
  return `Ich, ${testatorName || PLACEHOLDERS.NAME}, geboren am ${
    birthdate || PLACEHOLDERS.BIRTH_DATE
  } in ${
    birthPlace || PLACEHOLDERS.BIRTH_PLACE
  }, widerrufe mit diesem Testament alle bisher errichteten Verfügungen von Todes wegen und bestimme hiermit Folgendes:`
}

function generateInheritanceForOrganisation(
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

function generateInheritanceForPerson(person: Person) {
  const correctPossessivePronouns = getPossessivePronouns(
    person.type,
    person.gender,
  )
  return `${correctPossessivePronouns}, ${
    person.name || PLACEHOLDERS.NAME
  } geboren am ${
    person.birthDate || PLACEHOLDERS.BIRTH_DATE
  } mit einem Anteil von ${
    person.percentage || PLACEHOLDERS.PERCENTAGE
  } Prozent meines Vermögens.`
}

export function generateFinancialInheritancePragraphs(
  heirs: (Person | Organisation)[],
  financialAssets: FinancialAsset[],
): LastWillParagraph[] {
  const mainParagraph: LastWillParagraph = {
    title: PARAGRAPH_TITLES.FINANCIAL,
    contents: [],
  }

  const financialAssetLocations = financialAssets.map(
    (asset) => asset.where || PLACEHOLDERS.FINANCIAL_ASSET_LOCATION,
  )

  mainParagraph.contents.push(
    `Als Erbe meines Vermögens, aufgeteilt auf ${financialAssetLocations.join(
      ',',
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
