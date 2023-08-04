import { Gender, PersonType } from '../../db/entities/lastwill.entity'
import {
  getPossessivePronouns,
  joinStringArrayForSentence,
} from './grammar.utils'

describe('grammar.utils.ts', () => {
  describe('getPossessivePronouns', () => {
    it(`should return the correct grammar for ${PersonType.FATHER}`, () => {
      // ACT
      const res = getPossessivePronouns(PersonType.FATHER, null)
      // ASSERT
      expect(res).toEqual('Mein Vater')
    })

    it(`should return the correct grammar for ${PersonType.MOTHER}`, () => {
      // ACT
      const res = getPossessivePronouns(PersonType.MOTHER, null)
      // ASSERT
      expect(res).toEqual('Meine Mutter')
    })

    it(`should return the correct grammar for ${PersonType.PARTNER}`, () => {
      // ACT
      const res = getPossessivePronouns(PersonType.PARTNER, null)
      // ASSERT
      expect(res).toEqual('Mein Partner')
    })

    it(`should return the correct grammar for ${PersonType.CHILD}`, () => {
      // ACT
      const res = getPossessivePronouns(PersonType.CHILD, null)
      // ASSERT
      expect(res).toEqual('Mein Kind')
    })

    it(`should return the correct grammar for ${PersonType.SIBLING} (${Gender.MALE})`, () => {
      // ACT
      const res = getPossessivePronouns(PersonType.SIBLING, Gender.MALE)
      // ASSERT
      expect(res).toEqual('Mein Bruder')
    })

    it(`should return the correct grammar for ${PersonType.SIBLING} (${Gender.FEMALE})`, () => {
      // ACT
      const res = getPossessivePronouns(PersonType.SIBLING, Gender.FEMALE)
      // ASSERT
      expect(res).toEqual('Meine Schwester')
    })

    it(`should return the correct grammar for ${PersonType.SIBLING} (${Gender.DIVERS})`, () => {
      // ACT
      const res = getPossessivePronouns(PersonType.SIBLING, Gender.DIVERS)
      // ASSERT
      expect(res).toEqual('Mein Geschwisterkind')
    })

    it('should have default value', () => {
      // ACT
      const res = getPossessivePronouns('test' as PersonType, null)
      // ASSERT
      expect(res).toEqual('Mein Verwandter')
    })
  })

  describe('joinStringArrayForSentence', () => {
    it('should join array properly', () => {
      // ACT
      const res = joinStringArrayForSentence(['a', 'b', 'c'])
      // ASSERT
      expect(res).toEqual('a, b und c')
    })

    it('should handle empty array', () => {
      // ACT
      const res = joinStringArrayForSentence([])
      // ASSERT
      expect(res).toBeNull()
    })

    it('should handle array with just one item', () => {
      // ACT
      const res = joinStringArrayForSentence(['a'])
      // ASSERT
      expect(res).toEqual('a')
    })

    it('should handle array with just one item', () => {
      // ACT
      const res = joinStringArrayForSentence(['a'])
      // ASSERT
      expect(res).toEqual('a')
    })
  })
})
