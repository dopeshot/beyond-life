import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PickType,
} from '@nestjs/swagger'
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

const sampleHumanHeir: Person = {
  id: '987654321',
  type: PersonType.CHILD,
  name: 'Heir Name',
  gender: Gender.MALE,
  birthDate: '1995-03-15',
  birthPlace: 'City',
  isHandicapped: false,
  isInsolvent: false,
  percentage: 50,
  itemIds: [1, 2, 3],
  child: {
    type: ChildType.NATURAL,
    relationship: ChildRelationShip.CHILD_TOGETHER,
  },
  address: {
    street: 'Sample Street',
    houseNumber: '1a',
    zipCode: '12345',
    city: 'Berlin',
  },
}

const sampleOrganisationHeir: Organisation = {
  id: 'jeffsId',
  name: 'Strongpong e.V.',
  address: {
    street: 'Sample Street',
    houseNumber: '1a',
    zipCode: '12345',
    city: 'Berlin',
  },
}

const sampleObject: LastWill = {
  _id: '6175f1906be245001e352a0e',
  accountId: 'aaaaaaaaaaaaaaaaaaaaaaaa',
  common: {
    isBerlinWill: false,
    isPartnerGermanCitizenship: false,
    matrimonialProperty: MatrimonialProperty.COMMUNITY_OF_GAIN,
  },
  testator: {
    name: 'Mary Testator',
    gender: Gender.FEMALE,
    birthDate: '1990-01-01',
    birthPlace: 'Berlin',
    isHandicapped: false,
    isInsolvent: false,
    relationshipStatus: RelationshipStatus.MARRIED,
  },
  heirs: [sampleHumanHeir, sampleOrganisationHeir],
  items: [
    { id: '11111111', name: 'Item 1', description: 'Description 1' },
    { id: '22222222', name: 'Item 2', description: 'Description 2' },
  ],
  financialAssets: [
    { id: '33333333', where: 'PayPal', amount: 420.69, currency: 'EUR' },
    { id: '44444444', where: 'Bank', amount: 1234.56, currency: 'USD' },
  ],
  progressKeys: [SidebarPages.TESTATOR, SidebarPages.HEIRS, SidebarPages.FINAL],
}

@Expose()
class ChildInfo {
  @prop({ required: false, enum: ChildType, type: String })
  @ApiPropertyOptional({
    description: 'Child type',
    example: sampleHumanHeir.child.type,
    enum: ChildType,
    type: String,
  })
  type?: ChildType

  @prop({ required: false, enum: ChildRelationShip, type: String })
  @ApiPropertyOptional({
    description: 'Child relationship',
    example: sampleHumanHeir.child.relationship,
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
    example: sampleObject.common.isBerlinWill,
    type: Boolean,
  })
  isBerlinWill?: boolean

  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Does the partner have a german citizenship',
    example: sampleObject.common.isPartnerGermanCitizenship,
    type: Boolean,
  })
  isPartnerGermanCitizenship?: boolean

  @prop({ required: false, enum: MatrimonialProperty, type: String })
  @ApiPropertyOptional({
    description: 'How to handle the property',
    example: sampleObject.common.matrimonialProperty,
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
    example: sampleHumanHeir.address.street,
    type: String,
  })
  street?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'House number',
    example: sampleHumanHeir.address.houseNumber,
    type: String,
  })
  houseNumber?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Zip code',
    example: sampleHumanHeir.address.zipCode,
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
  @ApiProperty({ description: 'Id', example: sampleHumanHeir.id, type: String })
  id: string

  @prop({ required: true, enum: PersonType, type: String })
  @ApiProperty({
    description: 'Persontype',
    example: sampleHumanHeir.type,
    enum: PersonType,
    type: String,
  })
  type: PersonType

  @prop({ required: true, type: String })
  @ApiProperty({
    description: 'Name',
    example: sampleHumanHeir.name,
    type: String,
  })
  name: string

  @prop({ required: false, enum: Gender, type: String })
  @ApiPropertyOptional({
    required: false,
    enum: Gender,
    example: sampleHumanHeir.gender,
    type: String,
  })
  gender?: Gender

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Birthdate',
    example: sampleHumanHeir.birthDate,
    type: String,
  })
  birthDate?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Birthplace',
    example: sampleHumanHeir.birthPlace,
    type: String,
  })
  birthPlace?: string

  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Is handicapped',
    example: sampleHumanHeir.isHandicapped,
    type: Boolean,
  })
  isHandicapped?: boolean

  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Is insolvent',
    example: sampleHumanHeir.isInsolvent,
    type: Boolean,
  })
  isInsolvent?: boolean

  // Succession
  @prop({ required: false, type: Number })
  @ApiPropertyOptional({
    description: 'Percentage',
    example: sampleHumanHeir.percentage,
    type: Number,
  })
  percentage?: number

  @prop({ required: false, type: [Number], default: [] })
  @ApiPropertyOptional({
    description: 'Item ids',
    example: sampleHumanHeir.itemIds,
    type: [Number],
    isArray: true,
  })
  itemIds?: number[]

  // Heirs
  @prop({ required: false, type: ChildInfo })
  @ApiPropertyOptional({
    description: 'Child Info',
    type: ChildInfo,
    example: sampleHumanHeir.child,
  })
  child?: ChildInfo

  @prop({ required: false, type: Address })
  @ApiPropertyOptional({
    description: 'Address',
    type: Address,
    example: sampleHumanHeir.address,
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
    example: sampleObject.testator.relationshipStatus,
    enum: RelationshipStatus,
    type: String,
  })
  relationshipStatus?: RelationshipStatus
}

@Expose()
class Organisation {
  @prop({ required: true, type: String })
  @ApiProperty({
    description: 'Id',
    example: sampleOrganisationHeir.id,
    type: String,
  })
  id: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Name',
    example: sampleOrganisationHeir.name,
    type: String,
  })
  name?: string

  @prop({ required: false, type: Address })
  @ApiPropertyOptional({
    description: 'Address',
    type: Address,
    example: sampleOrganisationHeir.address,
  })
  address?: Address
}

@Expose()
class Item {
  @prop({ required: true, type: String })
  @ApiProperty({
    description: 'Id',
    example: sampleObject.items[0].id,
    type: String,
  })
  id: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Name',
    example: sampleObject.items[0].name,
    type: String,
  })
  name?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Description',
    example: sampleObject.items[0].description,
    type: String,
  })
  description?: string
}

@Expose()
class FinancialAsset {
  @prop({ required: true, type: String })
  @ApiProperty({
    description: 'Id',
    example: sampleObject.financialAssets[0].id,
    type: String,
  })
  id: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Where',
    example: sampleObject.financialAssets[0].where,
    type: String,
  })
  where?: string

  @prop({ required: false, type: Number })
  @ApiPropertyOptional({
    description: 'Amount',
    example: sampleObject.financialAssets[0].amount,
    type: Number,
  })
  amount?: number

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Currency',
    example: sampleObject.financialAssets[0].currency,
    type: String,
  })
  currency?: string
}

@Expose()
export class LastWill {
  @ApiProperty({
    description: 'Id',
    example: sampleObject._id,
  })
  _id: ObjectId | string

  @prop({ required: true, type: String, ref: () => User })
  @ApiProperty({
    description: 'Account id',
    example: sampleObject.accountId,
    type: String,
  })
  accountId: string

  @prop({ required: true, type: Common })
  @ApiProperty({
    type: Common,
    description: 'Common data for the will',
    example: sampleObject.common,
  })
  common: Common

  @prop({ required: true, type: Testator })
  @ApiProperty({
    type: Testator,
    description: 'Testator data',
    example: sampleObject.testator,
  })
  testator: Testator

  // TODO: figure out union array
  @prop({ required: true, /*type: [any],*/ default: [] })
  @ApiProperty({
    //type: [Person | Organisation],
    description: 'Heirs',
    isArray: true,
    //anyOf: [Person, Organisation],
    example: sampleObject.heirs,
  })
  heirs: (Person | Organisation)[]

  @prop({ required: true, type: [Item], default: [] })
  @ApiProperty({
    type: [Item],
    description: 'Items',
    isArray: true,
    example: sampleObject.items,
  })
  items: Item[]

  @prop({
    required: true,
    type: [FinancialAsset],
    default: [],
  })
  @ApiProperty({
    type: FinancialAsset,
    description: 'Financial assets',
    isArray: true,
    example: sampleObject.financialAssets,
  })
  financialAssets: FinancialAsset[]

  @prop({ required: true, default: [] })
  @ApiProperty({
    description: 'Progress keys',
    example: sampleObject.progressKeys,
    enum: SidebarPages,
    type: String,
    isArray: true,
  })
  progressKeys: SidebarPages[]

  constructor(partial: Partial<LastWill>) {
    Object.assign(this, partial)
  }
}

@Expose()
export class LastWillMetadata extends PickType(LastWill, ['progressKeys']) {
  @ApiProperty({
    description: 'Testator',
    example: 'jeff',
    type: String,
  })
  testator: string
}
