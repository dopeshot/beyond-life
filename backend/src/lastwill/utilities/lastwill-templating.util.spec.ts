import {
  FinancialAsset,
  Organisation,
  Person,
  PersonType,
} from '../../db/entities/lastwill.entity'
import {
  PARAGRAPH_TITLES,
  PLACEHOLDERS,
  generateFinancialInheritancePragraphs,
  generateInheritanceForOrganisation,
  generateInheritanceForPerson,
  generateInitialText,
  generateLocationHeader,
  generateTestatorHeader,
} from './lastwill-templating.util'

const SAMPLE_ORGANISATION: Organisation = {
  id: 'aaaaa',
  name: 'Jedi Order',
  type: PersonType.ORGANISATION,
  percentage: 42,
  address: {
    city: 'Coruscant',
    zipCode: '01234',
    street: 'jedi avenue',
    houseNumber: '1',
  },
}

const SAMPLE_PERSON: Person = {
  id: 'bbbbb',
  name: 'Obi Wan Kenobi',
  type: PersonType.FATHER,
  percentage: 69,
  address: {
    city: 'Somewhere on Tatooine',
    zipCode: '111',
    street: 'sandstreet',
    houseNumber: '5432',
  },
  birthDate: '01.01.1970',
  birthPlace: 'Coruscant',
  itemIds: ['a', 'b', 'c'],
}

const SAMPLE_FINANCIAL_ASSET: FinancialAsset = {
  id: '1',
  where: 'Clash of Clans Gold Storage',
  amount: 1,
  currency: 'Gold',
}

/**
 * No direct text checks on purpose. Focus is on logic, not on typos or anything
 */

describe('lastwill-templating.util.ts', () => {
  describe('generateTestatorHeader', () => {
    it('should return valid header for given values', () => {
      // ARRANGE
      const testatorName = 'testName'
      const testatorStreet = 'testStreet'
      const testatorhouseNumber = 'testHouseNumber'
      const testatorCity = 'testCity'
      const testatorZipCode = 'testZipCode'
      // ACT
      const res = generateTestatorHeader(
        testatorName,
        testatorStreet,
        testatorhouseNumber,
        testatorCity,
        testatorZipCode,
      )
      // ASSERT
      expect(res.fullName).toEqual(testatorName)
      expect(res.AddressStreet).toContain(testatorStreet)
      expect(res.AddressStreet).toContain(testatorhouseNumber)
      expect(res.AddressCity).toContain(testatorZipCode)
      expect(res.AddressCity).toContain(testatorCity)
    })

    it('should replace null with placeholders', () => {
      // ACT
      const res = generateTestatorHeader(null, null, null, null, null)
      // ASSERT
      expect(res.fullName).toEqual(PLACEHOLDERS.PERSON_NAME)
      expect(res.AddressStreet).toContain(PLACEHOLDERS.STREET)
      expect(res.AddressStreet).toContain(PLACEHOLDERS.HOUSE_NUMBER)
      expect(res.AddressCity).toContain(PLACEHOLDERS.ZIP_CODE)
      expect(res.AddressCity).toContain(PLACEHOLDERS.CITY)
    })

    it('should replace null with placeholders', () => {
      // ACT
      const res = generateTestatorHeader(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )
      // ASSERT
      expect(res.fullName).toEqual(PLACEHOLDERS.PERSON_NAME)
      expect(res.AddressStreet).toContain(PLACEHOLDERS.STREET)
      expect(res.AddressStreet).toContain(PLACEHOLDERS.HOUSE_NUMBER)
      expect(res.AddressCity).toContain(PLACEHOLDERS.ZIP_CODE)
      expect(res.AddressCity).toContain(PLACEHOLDERS.CITY)
    })
  })

  describe('generateLocationHeader', () => {
    it('should create valid header', () => {
      // ACT
      const res = generateLocationHeader('testCity')
      // ASSERT
      expect(res).toContain('testCity')
    })

    it('should contain date in valid format', () => {
      // ARRANGE
      const date = new Date()
      const currentDate = `${date.getDay()}.${
        date.getUTCMonth() + 1
      }.${date.getFullYear()}`
      // ACT
      const res = generateLocationHeader('testCity')
      // ASSERT
      expect(res).toContain(currentDate)
    })

    it('should use placeholders', () => {
      // ACT
      const res = generateLocationHeader(null)
      // ASSERT
      expect(res).toContain(PLACEHOLDERS.CITY)
    })
  })

  describe('generateInitialText', () => {
    it('should generate header', () => {
      // ACT
      const res = generateInitialText('testName', '01.01.1970', 'coruscant')
      // ASSERT
      expect(res).toContain('testName')
      expect(res).toContain('01.01.1970')
      expect(res).toContain('coruscant')
    })

    it('should use placeholders', () => {
      // ACT
      const res = generateInitialText(null, null, null)
      // ASSERT
      expect(res).toContain(PLACEHOLDERS.PERSON_NAME)
      expect(res).toContain(PLACEHOLDERS.BIRTH_DATE)
      expect(res).toContain(PLACEHOLDERS.BIRTH_PLACE)
    })
  })

  describe('generateInheritanceForOrganisation', () => {
    it('should create valid paragraph', () => {
      // ACT
      const res = generateInheritanceForOrganisation(SAMPLE_ORGANISATION)
      // ASSERT
      expect(res).toContain(SAMPLE_ORGANISATION.name)
      expect(res).toContain(SAMPLE_ORGANISATION.percentage.toString())
      expect(res).toContain(SAMPLE_ORGANISATION.address.city)
      expect(res).toContain(SAMPLE_ORGANISATION.address.zipCode)
    })

    it('should use placeholders for null values', () => {
      // ACT
      const res = generateInheritanceForOrganisation({} as Organisation)
      // ASSERT
      expect(res).toContain(PLACEHOLDERS.COMPANY_NAME)
      expect(res).toContain(PLACEHOLDERS.PERCENTAGE)
      expect(res).toContain(PLACEHOLDERS.CITY)
      expect(res).toContain(PLACEHOLDERS.ZIP_CODE)
    })
  })

  describe('generateInheritanceForPerson', () => {
    it('should create valid paragraph', () => {
      // ACT
      const res = generateInheritanceForPerson(SAMPLE_PERSON)
      // ASSERT
      expect(res).toContain(SAMPLE_PERSON.name)
      expect(res).toContain(SAMPLE_PERSON.birthDate)
      expect(res).toContain(SAMPLE_PERSON.percentage.toString())
    })

    it('should use placeholder for null values', () => {
      // ACT
      const res = generateInheritanceForPerson({} as Person)
      // ASSERT
      expect(res).toContain(PLACEHOLDERS.PERSON_NAME)
      expect(res).toContain(PLACEHOLDERS.BIRTH_DATE)
      expect(res).toContain(PLACEHOLDERS.PERCENTAGE)
    })
  })

  describe('generateFinancialInheritancePragraphs', () => {
    it('should valid paragraph for person', () => {
      // ACT
      // Use first as the following is legal giberish
      const res = generateFinancialInheritancePragraphs(
        [SAMPLE_PERSON],
        [SAMPLE_FINANCIAL_ASSET],
      )[0]
      // ASSERT
      expect(res.title).toEqual(PARAGRAPH_TITLES.FINANCIAL)
      expect(
        res.contents.find(
          (e) =>
            e.includes(SAMPLE_PERSON.name) &&
            e.includes(SAMPLE_PERSON.percentage.toString()) &&
            e.includes(SAMPLE_PERSON.birthDate),
        ),
      ).toBeTruthy()
    })

    it('should valid paragraph for organisation', () => {
      // ACT
      // Use first as the following is legal giberish
      const res = generateFinancialInheritancePragraphs(
        [SAMPLE_ORGANISATION],
        [SAMPLE_FINANCIAL_ASSET],
      )[0]
      // ASSERT
      expect(res.title).toEqual(PARAGRAPH_TITLES.FINANCIAL)
      expect(
        res.contents.find(
          (e) =>
            e.includes(SAMPLE_ORGANISATION.name) &&
            e.includes(SAMPLE_ORGANISATION.percentage.toString()) &&
            e.includes(SAMPLE_ORGANISATION.address.zipCode) &&
            e.includes(SAMPLE_ORGANISATION.address.city),
        ),
      ).toBeTruthy()
    })

    it('should valid paragraph for array of organisation and person', () => {
      // ACT
      // Use first as the following is legal giberish
      const res = generateFinancialInheritancePragraphs(
        [SAMPLE_ORGANISATION, SAMPLE_PERSON],
        [SAMPLE_FINANCIAL_ASSET],
      )[0]
      // ASSERT
      expect(res.title).toEqual(PARAGRAPH_TITLES.FINANCIAL)
      expect(
        res.contents.find(
          (e) =>
            e.includes(SAMPLE_ORGANISATION.name) &&
            e.includes(SAMPLE_ORGANISATION.percentage.toString()) &&
            e.includes(SAMPLE_ORGANISATION.address.zipCode) &&
            e.includes(SAMPLE_ORGANISATION.address.city),
        ),
      ).toBeTruthy()
      expect(
        res.contents.find(
          (e) =>
            e.includes(SAMPLE_PERSON.name) &&
            e.includes(SAMPLE_PERSON.percentage.toString()) &&
            e.includes(SAMPLE_PERSON.birthDate),
        ),
      ).toBeTruthy()
    })

    it('should contain paragraph listing all assets', () => {
      // ARRANGE
      const COPIED_ASSET = {
        ...SAMPLE_FINANCIAL_ASSET,
        where: 'Clash of Clans Elixir thingy',
      }
      // ACT
      // Use first as the following is legal giberish
      const res = generateFinancialInheritancePragraphs(
        [SAMPLE_ORGANISATION],
        [SAMPLE_FINANCIAL_ASSET, COPIED_ASSET],
      )[0]
      // ASSERT
      expect(res.title).toEqual(PARAGRAPH_TITLES.FINANCIAL)
      expect(
        res.contents.find((e) => e.includes(SAMPLE_FINANCIAL_ASSET.where)),
      ).toBeTruthy()
      expect(
        res.contents.find((e) => e.includes(COPIED_ASSET.where)),
      ).toBeTruthy()
    })
  })

  //describe('generateItemInheritanceParagraph', () => {
  //  it('should generate valid paragraphs for ')
  // })
})
