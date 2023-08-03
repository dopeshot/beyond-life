import { LastWill, PersonType } from '../db/entities/lastwill.entity'
import { LastWillService } from './lastwill.service'

const SAMPLE_LAST_WILL: LastWill = {
  createdAt: new Date(),
  updatedAt: new Date(),
  _id: 'aaaaaaaaaaaaaaaa',
  accountId: 'aaaaaaaaaaaaaab',
  common: {
    isBerlinWill: false,
    isPartnerGermanCitizenship: true,
  },
  testator: {
    name: 'Peter Lustig',
    address: {
      city: 'here',
    },
  },
  items: [
    {
      id: 'a',
      name: 'my old bike',
    },
  ],
  financialAssets: [
    {
      id: 'b',
      amount: 10000,
      where: 'over there',
      currency: 'imagination',
    },
  ],
  heirs: [
    {
      id: 'person1',
      type: PersonType.FATHER,
      name: 'Anders Lustig',
      percentage: 100,
      itemIds: ['a'],
    },
  ],
  progressKeys: [],
}

describe('lastwill.service.ts', () => {
  const lastWillService = new LastWillService(null, null)
  describe('includesFinancialInheritance', () => {
    it('should return false without financial assets', () => {
      // ACT && ASSERT
      expect(
        lastWillService.includesFinancialInheritance({
          ...SAMPLE_LAST_WILL,
          financialAssets: [],
        }),
      ).toEqual(false)
    })

    it('should return false without any heirs', () => {
      // ACT && ASSERT
      expect(
        lastWillService.includesFinancialInheritance({
          ...SAMPLE_LAST_WILL,
          heirs: [],
        }),
      ).toEqual(false)
    })

    it('should return false without any heirs that inherit financial assets', () => {
      // ACT && ASSERT
      expect(
        lastWillService.includesFinancialInheritance({
          ...SAMPLE_LAST_WILL,
          heirs: [{ ...SAMPLE_LAST_WILL.heirs[0], percentage: null }],
        }),
      ).toEqual(false)
    })

    it('should return true with financial assets and heirs ', () => {
      // ACT && ASSERT
      expect(
        lastWillService.includesFinancialInheritance(SAMPLE_LAST_WILL),
      ).toEqual(true)
    })
  })

  describe('includesItemInheritance', () => {
    it('should return false without items', () => {
      // ACT && ASSERT
      expect(
        lastWillService.includesItemInheritance({
          ...SAMPLE_LAST_WILL,
          items: [],
        }),
      ).toEqual(false)
    })

    it('should return false without any heirs', () => {
      // ACT && ASSERT
      expect(
        lastWillService.includesItemInheritance({
          ...SAMPLE_LAST_WILL,
          heirs: [],
        }),
      ).toEqual(false)
    })

    it('should return false without any heirs that inherit items', () => {
      // ACT && ASSERT
      expect(
        lastWillService.includesItemInheritance({
          ...SAMPLE_LAST_WILL,
          heirs: [{ ...SAMPLE_LAST_WILL.heirs[0], itemIds: [] }],
        }),
      ).toEqual(false)
    })

    it('should return true with items and heirs ', () => {
      // ACT && ASSERT
      expect(lastWillService.includesItemInheritance(SAMPLE_LAST_WILL)).toEqual(
        true,
      )
    })
  })
})
