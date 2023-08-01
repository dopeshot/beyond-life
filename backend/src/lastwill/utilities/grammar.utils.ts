import { Gender, PersonType } from '../../db/entities/lastwill.entity'

export function getPossessivePronouns(
  type: PersonType,
  gender: Gender,
): string {
  switch (type) {
    case PersonType.CHILD:
      return 'Mein Kind'
    case PersonType.FATHER:
      return 'Mein Vater'
    case PersonType.MOTHER:
      return 'Meine Mutter'
    case PersonType.SIBLING:
      if (gender === Gender.FEMALE) return 'Meine Schwester'
      if (gender === Gender.MALE) return 'Mein Bruder'
      // Assuming gender neutral siblings are referred to as Geschwisterkind
      return 'Mein Geschwisterkind'
    default:
      return 'Mein Verwandter'
  }
}

export function joinStringArrayForSentence(arr: string[]): string {
  if (arr.length === 0) return null
  if (arr.length === 1) return arr.at(-1)
  return `${arr.slice(0, -1).join(', ')} und ${arr.at(-1)}`
}
