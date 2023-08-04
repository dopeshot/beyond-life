import {
  FinancialAsset,
  Item,
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
  generateItemInheritanceParagraph,
  generateLocationHeader,
  generateTestatorHeader,
  getDateorPlaceholder,
  getFormattedCurrencyValues,
  getLegalClauses,
  getOptionalDescription,
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
  birthDate: '1.1.1970',
  birthPlace: 'Coruscant',
  itemIds: ['a', 'b', 'c'],
}

const SAMPLE_ITEM: Item = {
  id: 'a',
  name: 'testItem01',
  description: 'an item for testing',
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
  beforeAll(() => {
    process.env.TZ = 'Europe/Amsterdam'
  })
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

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should contain date in valid format', () => {
      const date = new Date()
      // ARRANGE
      jest.useFakeTimers()
      // Mock new Date constructor with given value
      jest.setSystemTime(date)

      const currentDate = `${date.getDate()}.${
        date.getMonth() + 1
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
      const res = generateInitialText('testName', '1.1.1970', 'coruscant')
      // ASSERT
      expect(res).toContain('testName')
      expect(res).toContain('1.1.1970')
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
    it('should return valid paragraph for person', () => {
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
      ).not.toBeUndefined()
    })

    it('should return valid paragraph for organisation', () => {
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
      ).not.toBeUndefined()
    })

    it('should return valid paragraph for array of organisation and person', () => {
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
      ).not.toBeUndefined()
      expect(
        res.contents.find(
          (e) =>
            e.includes(SAMPLE_PERSON.name) &&
            e.includes(SAMPLE_PERSON.percentage.toString()) &&
            e.includes(SAMPLE_PERSON.birthDate),
        ),
      ).not.toBeUndefined()
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
      ).not.toBeUndefined()
      expect(
        res.contents.find((e) => e.includes(COPIED_ASSET.where)),
      ).not.toBeUndefined()
    })

    it('should use placeholders for missing values', () => {
      // ACT
      const res = generateFinancialInheritancePragraphs(
        [SAMPLE_ORGANISATION],
        [{ ...SAMPLE_FINANCIAL_ASSET, where: null }],
      )[0]
      // ASSERT
      expect(res.title).toEqual(PARAGRAPH_TITLES.FINANCIAL)
      expect(
        res.contents.find((e) =>
          e.includes(PLACEHOLDERS.FINANCIAL_ASSET_LOCATION),
        ),
      ).not.toBeUndefined()
    })
  })

  describe('generateItemInheritanceParagraph', () => {
    it('should return valid paragraphs for person', () => {
      // ACT
      const res = generateItemInheritanceParagraph(
        [{ ...SAMPLE_PERSON, itemIds: [SAMPLE_ITEM.id] }],
        [SAMPLE_ITEM],
      )
      // ASSERT
      expect(res.title).toEqual(PARAGRAPH_TITLES.ITEM)
      expect(
        res.contents.find(
          (e) => e.includes(SAMPLE_ITEM.name) && e.includes(SAMPLE_PERSON.name),
        ),
      ).not.toBeUndefined()
    })

    it('should return valid paragraphs for organisation', () => {
      // ACT
      const res = generateItemInheritanceParagraph(
        [{ ...SAMPLE_ORGANISATION, itemIds: [SAMPLE_ITEM.id] }],
        [SAMPLE_ITEM],
      )
      // ASSERT
      expect(res.title).toEqual(PARAGRAPH_TITLES.ITEM)
      expect(
        res.contents.find(
          (e) =>
            e.includes(SAMPLE_ITEM.name) &&
            e.includes(SAMPLE_ORGANISATION.name),
        ),
      ).not.toBeUndefined()
    })

    it('should return valid paragraph for person and organisation ', () => {
      // ACT
      const res = generateItemInheritanceParagraph(
        [
          { ...SAMPLE_ORGANISATION, itemIds: [SAMPLE_ITEM.id] },
          {
            ...SAMPLE_PERSON,
            itemIds: ['b'],
          },
        ],
        [SAMPLE_ITEM, { ...SAMPLE_ITEM, name: 'testItem02', id: 'b' }],
      )
      // ASSERT
      expect(res.title).toEqual(PARAGRAPH_TITLES.ITEM)
      expect(
        res.contents.find(
          (e) =>
            e.includes(SAMPLE_ITEM.name) &&
            e.includes(SAMPLE_ORGANISATION.name) &&
            !e.includes('testItem02'),
        ),
      ).not.toBeUndefined()
      expect(
        res.contents.find(
          (e) =>
            e.includes('testItem02') &&
            e.includes(SAMPLE_PERSON.name) &&
            !e.includes(SAMPLE_ITEM.name),
        ),
      ).not.toBeUndefined()
    })

    it('should list all items if one entity inherits multiple ', () => {
      // ACT
      const res = generateItemInheritanceParagraph(
        [{ ...SAMPLE_ORGANISATION, itemIds: [SAMPLE_ITEM.id, 'b'] }],
        [SAMPLE_ITEM, { ...SAMPLE_ITEM, name: 'testItem02', id: 'b' }],
      )
      // ASSERT
      expect(res.title).toEqual(PARAGRAPH_TITLES.ITEM)
      expect(
        res.contents.find(
          (e) =>
            e.includes('testItem02') &&
            e.includes(SAMPLE_ORGANISATION.name) &&
            e.includes(SAMPLE_ITEM.name),
        ),
      ).not.toBeUndefined()
    })

    it('should use placeholders for missing values ', () => {
      // ACT
      const res = generateItemInheritanceParagraph(
        [
          {
            ...SAMPLE_ORGANISATION,
            itemIds: [SAMPLE_ITEM.id],
            name: null,
          },
          {
            ...SAMPLE_PERSON,
            itemIds: ['b'],
            name: null,
            birthDate: null,
          },
        ],
        [SAMPLE_ITEM, { ...SAMPLE_ITEM, name: null, id: 'b' }],
      )
      // ASSERT
      expect(res.title).toEqual(PARAGRAPH_TITLES.ITEM)
      expect(
        res.contents.find(
          (e) =>
            e.includes(PLACEHOLDERS.ITEM_NAME) &&
            e.includes(PLACEHOLDERS.PERSON_NAME) &&
            e.includes(PLACEHOLDERS.BIRTH_DATE),
        ),
      ).not.toBeUndefined()
      expect(
        res.contents.find((e) => e.includes(PLACEHOLDERS.COMPANY_NAME)),
      ).not.toBeUndefined()
    })
  })

  describe('getLegalClauses', () => {
    it('should return legal clauses', () => {
      // ACT
      const res = getLegalClauses()
      // ASSERT
      expect(res.length).toBeGreaterThan(0)
    })

    it('should return clauses with valid titles', () => {
      // ACT
      const res = getLegalClauses()
      // ASSERT
      for (const clause of res) {
        expect(Object.values(PARAGRAPH_TITLES)).toContain(clause.title)
      }
    })
  })

  describe('getOptionalDescription', () => {
    describe('Positive Tests', () => {
      it('should return formatted text', () => {
        // ACT
        const res = getOptionalDescription('abc')
        // ASSERT
        expect(res).toEqual('( abc )')
      })

      it('should return empty string on falsy input', () => {
        // ACT
        const res = getOptionalDescription(undefined)
        // ASSERT
        expect(res).toEqual('')
      })
    })
  })

  describe('getDateorPlaceholder', () => {
    describe('Positive Tests', () => {
      it('should return formatted date', () => {
        // ACT
        const res = getDateorPlaceholder('1970-01-01T00:00:00')
        // ASSERT
        expect(res).toEqual('1.1.1970')
      })

      it('should return undefined on falsy input', () => {
        // ACT
        const res = getDateorPlaceholder(undefined)
        // ASSERT
        expect(res).toEqual(undefined)
      })

      it('should return undefined on empty string input', () => {
        // ACT
        const res = getDateorPlaceholder('')
        // ASSERT
        expect(res).toEqual(undefined)
      })
    })
  })

  describe('getFormattedCurrencyValues', () => {
    describe('Positive Tests', () => {
      it('should return formatted string', () => {
        // ACT
        const res = getFormattedCurrencyValues(1, 'Gold')
        // ASSERT
        expect(res).toEqual('(1 Gold)')
      })

      it('should return empty string on no currency', () => {
        // ACT
        const res = getFormattedCurrencyValues(1, null)
        // ASSERT
        expect(res).toEqual('')
      })

      it('should return empty string on no amount', () => {
        // ACT
        const res = getFormattedCurrencyValues(null, 'Gold')
        // ASSERT
        expect(res).toEqual('')
      })
    })
  })
})
