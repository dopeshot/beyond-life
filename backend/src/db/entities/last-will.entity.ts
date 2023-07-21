import { ApiProperty, OmitType } from '@nestjs/swagger'
import { prop } from '@typegoose/typegoose'
import { Expose } from 'class-transformer'
import { ObjectId } from 'mongoose'

type PersonType =
  | 'mother'
  | 'father'
  | 'child'
  | 'siblings'
  | 'other'
  | 'organisation'
type Gender = 'male' | 'female' | 'divers'
type RelationshipStatus = 'married' | 'divorced' | 'widowed' | 'unmarried'

class Common {
  // @prop({ required: true })
  // @Expose()
  // @ApiProperty({ description: 'Id of the testament', example: 1 })
  // testamentId: number

  // isLoading: boolean // Thats only in frontend type
  @prop({ required: false })
  @Expose()
  @ApiProperty({
    description: 'Is is a Berlin Will',
    example: false,
  })
  berlinWill?: boolean

  @prop({ required: false })
  @Expose()
  @ApiProperty({
    description: 'How to handle the property',
    example: 'communityOfGain',
  })
  matrimonialProperty?: 'communityOfGain' | 'separationOfProperty'

  @prop({ required: true, default: [] })
  @Expose()
  @ApiProperty({ description: 'Progress keys', example: ['test'] })
  progressKeys: string[]
}

class Address {
  @prop({ required: false })
  @Expose()
  @ApiProperty({ description: 'Street', example: 'maxisstr.' })
  street?: string

  @prop({ required: false })
  @Expose()
  // String because house numbers could be like 20a
  @ApiProperty({ description: 'House number', example: '1' })
  houseNumber?: string

  @prop({ required: false })
  @Expose()
  @ApiProperty({ description: 'Zip code', example: '12345' })
  zipCode?: string

  @prop({ required: false })
  @Expose()
  @ApiProperty({ description: 'City', example: 'Berlin' })
  city?: string
}

class Person {
  type: PersonType
  name: string
  gender?: Gender
  birthDate?: string
  birthPlace?: string
  isHandicapped?: boolean
  isInsolvent?: boolean

  // Succession
  percentage?: number
  itemIds?: number[]

  // Heirs
  childType?: 'natural' | 'adopted' | 'step'
  id: string
  address?: Address
}

class Testator extends OmitType(Person, ['type', 'percentage', 'itemIds']) {
  relationshipStatus?: RelationshipStatus
}

class Organisation {
  name?: string
  id: string
  address?: Address
}

class Item {
  name?: string
  description?: string
  id: string
}

class FinancialAsset {
  where?: string
  amount?: number | string
  currency?: string
  id: string
}

export class LastWill {
  _id: ObjectId

  @prop({ required: true, type: Common })
  @Expose()
  @ApiProperty({
    type: Common,
    description: 'Common data for the will',
    example: {
      /* TODO */
    },
  })
  common: Common

  @prop({ required: true, type: Testator })
  @Expose()
  @ApiProperty({
    type: Testator,
    description: 'Testator data',
    example: {
      /* TODO */
    },
  })
  testator: Testator

  @prop({ required: true, type: [Person], default: [] }) // Frontend always rather haves an empty array than null objects
  @Expose()
  @ApiProperty({
    type: [Person],
    description: 'Heirs',
    example: {
      /* TODO */
    },
  })
  heirs: (Person | Organisation)[]

  @prop({ required: true, type: [Item], default: [] })
  @Expose()
  @ApiProperty({
    type: [Item],
    description: 'Items',
    example: {
      /* TODO */
    },
  })
  items: Item[]

  @prop({ required: true, type: [FinancialAsset], default: [] })
  @Expose()
  @ApiProperty({
    type: [FinancialAsset],
    description: 'Financial assets',
    example: {
      /* TODO */
    },
  })
  financialAssets: FinancialAsset[]
}
