import { Gender, PersonType } from '../../db/entities/lastwill.entity'

export function getPossessivePronouns(type: PersonType, gender: Gender) {
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
