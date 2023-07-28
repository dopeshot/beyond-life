import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import { prop } from '@typegoose/typegoose'
import { Expose } from 'class-transformer'
import { ObjectId } from 'mongoose'
import { User } from './users.entity'

enum PersonType {
  MOTHER = 'mother',
  FATHER = 'father',
  CHILD = 'child',
  SIBLING = 'siblings',
  OTHER = 'other',
  ORGANISATION = 'organisation',
}

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  DIVERS = 'divers',
}

enum RelationshipStatus {
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
  UNMARRIED = 'unmarried',
}

enum MatrimonialProperty {
  COMMUNITY_OF_GAIN = 'communityOfGain',
  SEPARATION_OF_PROPERTY = 'separationOfProperty',
}

enum SidebarPages {
  TESTATOR = 'testator',
  MARRIAGE = 'marriage',
  HEIRS = 'heirs',
  INHERITANCE = 'inheritance',
  SUCCESSION = 'succession',
  FINAL = 'final',
}

enum ChildType {
  NATURAL = 'natural',
  ADOPTED = 'adopted',
  STEP = 'step',
}

enum ChildRelationShip {
  CHILD_TOGETHER = 'childTogether',
  CHILD_FROM_PARTNER = 'childFromPartner',
  CHILD_FROM_OTHER = 'childFromOther',
}

@Expose()
class ChildInfo {
  @prop({ required: false, enum: ChildType, type: String })
  @ApiPropertyOptional({
    description: 'Child type',
    example: ChildType[0],
    enum: ChildType,
    type: String,
  })
  type?: ChildType

  @prop({ required: false, enum: ChildRelationShip, type: String })
  @ApiPropertyOptional({
    description: 'Child relationship',
    example: ChildRelationShip[0],
    enum: ChildRelationShip,
    type: String,
  })
  relationship?: ChildRelationShip
}
@Expose()
export class Common {
  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Is it a Berlin Will',
    example: false,
    type: Boolean,
  })
  isBerlinWill?: boolean

  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Does the partner have a german citizenship',
    example: false,
    type: Boolean,
  })
  isPartnerGermanCitizenship?: boolean

  @prop({ required: false, enum: MatrimonialProperty, type: String })
  @ApiPropertyOptional({
    description: 'How to handle the property',
    example: MatrimonialProperty[0],
    enum: MatrimonialProperty,
    type: String,
  })
  matrimonialProperty?: MatrimonialProperty
}

@Expose()
class Address {
  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Street',
    example: 'firebasestr.',
    type: String,
  })
  street?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'House number',
    example: '1a',
    type: String,
  })
  houseNumber?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Zip code',
    example: '12345',
    type: String,
  })
  zipCode?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({ description: 'City', example: 'Berlin', type: String })
  city?: string
}

@Expose()
class Person {
  @prop({ required: true, type: String })
  @ApiProperty({ description: 'Id', example: '123456789', type: String })
  id: string

  @prop({ required: true, enum: PersonType, type: String })
  @ApiProperty({
    description: 'Persontype',
    example: PersonType[0],
    enum: PersonType,
    type: String,
  })
  type: PersonType

  @prop({ required: true, type: String })
  @ApiProperty({ description: 'Name', example: 'Max Gert', type: String })
  name: string

  @prop({ required: false, enum: Gender, type: String })
  @ApiPropertyOptional({ required: false, enum: Gender, example: Gender[0] })
  gender?: Gender

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Birthdate',
    example: '01.01.01',
    type: String,
  })
  birthDate?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Birthplace',
    example: 'Berlin',
    type: String,
  })
  birthPlace?: string

  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Is handicapped',
    example: false,
    type: Boolean,
  })
  isHandicapped?: boolean

  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Is insolvent',
    example: false,
    type: Boolean,
  })
  isInsolvent?: boolean

  // Succession
  @prop({ required: false, type: Number })
  @ApiPropertyOptional({ description: 'Percentage', example: 50, type: Number })
  percentage?: number

  @prop({ required: false, type: [Number], default: [] })
  @ApiPropertyOptional({
    description: 'Item ids',
    example: [1, 2, 3],
    type: [Number],
    isArray: true,
  })
  itemIds?: number[]

  // Heirs
  @prop({ required: false, type: ChildInfo })
  @ApiPropertyOptional({
    description: 'Child Info',
    type: ChildInfo,
  })
  child?: ChildInfo

  @prop({ required: false, type: Address })
  @ApiPropertyOptional({
    description: 'Address',
    type: Address,
  })
  address?: Address
}

@Expose()
// TODO: check if OmitType is working
class Testator extends OmitType(Person, [
  'type',
  'percentage',
  'itemIds',
  'id',
  'child',
]) {
  @prop({ required: false, enum: RelationshipStatus, type: String })
  @ApiPropertyOptional({
    description: 'Relationship status',
    example: RelationshipStatus[0],
    enum: RelationshipStatus,
    type: String,
  })
  relationshipStatus?: RelationshipStatus
}

@Expose()
class Organisation {
  @prop({ required: true, type: String })
  @ApiProperty({ description: 'Id', example: '123456789', type: String })
  id: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Name',
    example: 'Max GmbH',
    type: String,
  })
  name?: string

  @prop({ required: false, type: Address })
  @ApiPropertyOptional({
    description: 'Address',
    type: Address,
  })
  address?: Address
}

@Expose()
class Item {
  @prop({ required: true, type: String })
  @ApiProperty({ description: 'Id', example: '123456789', type: String })
  id: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Name',
    example: 'Max Puppe',
    type: String,
  })
  name?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Description',
    example: 'Eine Hundepuppe',
    type: String,
  })
  description?: string
}

@Expose()
class FinancialAsset {
  @prop({ required: true, type: String })
  @ApiProperty({ description: 'Id', example: '123456789', type: String })
  id: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Where',
    example: 'PayPal',
    type: String,
  })
  where?: string

  @prop({ required: false, type: Number })
  @ApiPropertyOptional({ description: 'Amount', example: 420.69, type: Number })
  amount?: number

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Currency',
    example: 'EUR',
    type: String,
  })
  currency?: string
}

@Expose()
export class LastWill {
  _id: ObjectId

  @prop({ required: true, type: String, ref: () => User })
  @ApiProperty({
    description: 'Account id',
    example: 'aaaaaaaaaaaaaaaaaaaaaaaa',
    type: String,
  })
  accountId: string

  @prop({ required: true, type: Common })
  @ApiProperty({
    type: Common,
    description: 'Common data for the will',
  })
  common: Common

  @prop({ required: true, type: Testator })
  @ApiProperty({
    type: Testator,
    description: 'Testator data',
  })
  testator: Testator

  // TODO: figure out union array
  @prop({ required: true, /*type: [any],*/ default: [] })
  @ApiProperty({
    //type: [Person | Organisation],
    description: 'Heirs',
    isArray: true,
    //anyOf: [Person, Organisation],
  })
  heirs: (Person | Organisation)[]

  @prop({ required: true, type: [Item], default: [] })
  @ApiProperty({
    type: [Item],
    description: 'Items',
    isArray: true,
  })
  items: Item[]

  @prop({ required: true, type: [FinancialAsset], default: [] })
  @ApiProperty({
    type: [FinancialAsset],
    description: 'Financial assets',
    isArray: true,
  })
  financialAssets: FinancialAsset[]

  @prop({ required: true, default: [] })
  @ApiProperty({
    description: 'Progress keys',
    example: SidebarPages[0],
    enum: SidebarPages,
    type: String,
    isArray: true,
  })
  progressKeys: SidebarPages[]

  constructor(partial: Partial<LastWill>) {
    Object.assign(this, partial)
  }
}
