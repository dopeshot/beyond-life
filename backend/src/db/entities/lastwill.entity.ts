import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Severity, prop } from '@typegoose/typegoose'
import { Expose, Transform, Type, plainToClass } from 'class-transformer'
import {
  Equals,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
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
  itemIds: ['11111111', '22222222'],
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
  type: PersonType.ORGANISATION,
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

// This is used as a standalone to prevent usage of mixins, Person and Organisation implement this on their own
class Discriminator {
  @IsEnum(PersonType)
  type: PersonType
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
  @IsOptional()
  @IsEnum(ChildType)
  type?: ChildType

  @prop({ required: false, enum: ChildRelationShip, type: String })
  @ApiPropertyOptional({
    description: 'Child relationship',
    example: sampleHumanHeir.child.relationship,
    enum: ChildRelationShip,
    type: String,
  })
  @IsOptional()
  @IsEnum(ChildRelationShip)
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
  @IsOptional()
  @IsBoolean()
  isBerlinWill?: boolean

  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Does the partner have a german citizenship',
    example: sampleObject.common.isPartnerGermanCitizenship,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isPartnerGermanCitizenship?: boolean

  @prop({ required: false, enum: MatrimonialProperty, type: String })
  @ApiPropertyOptional({
    description: 'How to handle the property',
    example: sampleObject.common.matrimonialProperty,
    enum: MatrimonialProperty,
    type: String,
  })
  @IsOptional()
  @IsEnum(MatrimonialProperty)
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
  @IsOptional()
  @IsString()
  street?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'House number',
    example: sampleHumanHeir.address.houseNumber,
    type: String,
  })
  @IsOptional()
  @IsString()
  houseNumber?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Zip code',
    example: sampleHumanHeir.address.zipCode,
    type: String,
  })
  @IsOptional()
  @IsString()
  zipCode?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({ description: 'City', example: 'Berlin', type: String })
  @IsOptional()
  @IsString()
  city?: string
}

@Expose()
class PersonBase {
  @prop({ required: true, type: String })
  @ApiProperty({
    description: 'Name',
    example: sampleHumanHeir.name,
    type: String,
  })
  @IsString()
  name: string

  @prop({ required: false, enum: Gender, type: String })
  @ApiPropertyOptional({
    required: false,
    enum: Gender,
    example: sampleHumanHeir.gender,
    type: String,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Birthdate',
    example: sampleHumanHeir.birthDate,
    type: String,
  })
  @IsOptional()
  @IsString()
  birthDate?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Birthplace',
    example: sampleHumanHeir.birthPlace,
    type: String,
  })
  @IsOptional()
  @IsString()
  birthPlace?: string

  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Is handicapped',
    example: sampleHumanHeir.isHandicapped,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isHandicapped?: boolean

  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Is insolvent',
    example: sampleHumanHeir.isInsolvent,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isInsolvent?: boolean

  @prop({ required: false, type: Address, _id: false })
  @ApiPropertyOptional({
    description: 'Address',
    type: Address,
    example: sampleHumanHeir.address,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address?: Address
}

@Expose()
class Person extends PersonBase {
  @prop({ required: true, type: String })
  @ApiProperty({ description: 'Id', example: sampleHumanHeir.id, type: String })
  @IsString()
  id: string

  @prop({ required: true, enum: PersonType, type: String })
  @ApiProperty({
    description: 'Persontype',
    example: sampleHumanHeir.type,
    enum: PersonType,
    type: String,
  })
  @IsEnum(PersonType)
  type: PersonType

  // Succession
  @prop({ required: false, type: Number })
  @ApiPropertyOptional({
    description: 'Percentage',
    example: sampleHumanHeir.percentage,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  percentage?: number

  @prop({ required: false, type: [Number], default: [] })
  @ApiPropertyOptional({
    description: 'Item ids',
    example: sampleHumanHeir.itemIds,
    type: [Number],
    isArray: true,
  })
  @IsString({ each: true })
  @IsOptional()
  itemIds?: string[]

  // Heirs
  @prop({ required: false, type: ChildInfo, _id: false })
  @ApiPropertyOptional({
    description: 'Child Info',
    type: ChildInfo,
    example: sampleHumanHeir.child,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ChildInfo)
  child?: ChildInfo
}

@Expose()
class Testator extends PersonBase {
  @prop({ required: false, enum: RelationshipStatus, type: String })
  @ApiPropertyOptional({
    description: 'Relationship status',
    example: sampleObject.testator.relationshipStatus,
    enum: RelationshipStatus,
    type: String,
  })
  @IsOptional()
  @IsEnum(RelationshipStatus)
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
  @IsString()
  id: string

  @prop({ required: true, enum: PersonType, type: String })
  @ApiProperty({
    description: 'Persontype',
    example: sampleHumanHeir.type,
    enum: PersonType,
    type: String,
  })
  @Equals(PersonType.ORGANISATION)
  type: PersonType.ORGANISATION

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Name',
    example: sampleOrganisationHeir.name,
    type: String,
  })
  @IsString()
  @IsOptional()
  name?: string

  @prop({ required: false, type: Address })
  @ApiPropertyOptional({
    description: 'Address',
    type: Address,
    example: sampleOrganisationHeir.address,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
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
  @IsString()
  id: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Name',
    example: sampleObject.items[0].name,
    type: String,
  })
  @IsString()
  @IsOptional()
  name?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Description',
    example: sampleObject.items[0].description,
    type: String,
  })
  @IsString()
  @IsOptional()
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
  @IsString()
  id: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Where',
    example: sampleObject.financialAssets[0].where,
    type: String,
  })
  @IsString()
  @IsOptional()
  where?: string

  @prop({ required: false, type: Number })
  @ApiPropertyOptional({
    description: 'Amount',
    example: sampleObject.financialAssets[0].amount,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  amount?: number

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Currency',
    example: sampleObject.financialAssets[0].currency,
    type: String,
  })
  @IsString()
  @IsOptional()
  currency?: string
}

export class LastWill {
  @ApiProperty({
    description: 'Id',
    example: sampleObject._id,
  })
  @Type(() => String)
  @Expose()
  _id: ObjectId | string

  @prop({
    required: true,
    type: String,
    ref: () => User,
    index: true,
    unique: false,
  })
  @ApiProperty({
    description: 'Account id',
    example: sampleObject.accountId,
    type: String,
  })
  @IsString()
  @Expose()
  accountId: string

  @prop({ required: true, type: Common, _id: false })
  @ApiProperty({
    type: Common,
    description: 'Common data for the will',
    example: sampleObject.common,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => Common)
  @Expose()
  common: Common

  @prop({ required: true, type: Testator, _id: false })
  @ApiProperty({
    type: Testator,
    description: 'Testator data',
    example: sampleObject.testator,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => Testator)
  @Expose()
  testator: Testator

  @prop({
    required: true,
    default: [],
    allowMixed: Severity.ALLOW,
    _id: false,
  })
  @ApiProperty({
    description: 'Heirs',
    isArray: true,
    example: sampleObject.heirs,
  })
  @ValidateNested({ each: true })
  /*We know how it works, but not why it works, the Type and Transform are both from the transformer class.
    The Type is needed for the validation
    The Transform is needed for the Serialization
    But the Type also says that it transforms with the subTypes and creates Instanzes, so we are uncertain why this doesn't fix both
    The Transform is performed after the Type, but in Serialization it seems the Type is not enough transformation
  */
  @Type(() => Discriminator, {
    discriminator: {
      property: 'type',
      subTypes: [
        // TODO: check if name is the value which is discriminated on, do I have to have all options here?
        { value: Person, name: PersonType.OTHER },
        { value: Person, name: PersonType.CHILD },
        { value: Person, name: PersonType.FATHER },
        { value: Person, name: PersonType.MOTHER },
        { value: Person, name: PersonType.SIBLING },
        { value: Organisation, name: PersonType.ORGANISATION },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  @Expose()
  @Transform(({ value }) =>
    value?.map((o: Person | Organisation) => {
      if (o.type === PersonType.ORGANISATION) {
        return plainToClass(Organisation, o)
      }
      return plainToClass(Person, o)
    }),
  )
  heirs: (Person | Organisation)[]

  @prop({ required: true, type: [Item], default: [], _id: false })
  @ApiProperty({
    type: [Item],
    description: 'Items',
    isArray: true,
    example: sampleObject.items,
  })
  @ValidateNested({ each: true })
  @Type(() => Item)
  @Expose()
  items: Item[]

  @prop({
    required: true,
    type: [FinancialAsset],
    default: [],
    _id: false,
  })
  @ApiProperty({
    type: FinancialAsset,
    description: 'Financial assets',
    isArray: true,
    example: sampleObject.financialAssets,
  })
  @ValidateNested({ each: true })
  @Type(() => FinancialAsset)
  @Expose()
  financialAssets: FinancialAsset[]

  @prop({ required: true, default: [], allowMixed: Severity.ALLOW })
  @ApiProperty({
    description: 'Progress keys',
    example: sampleObject.progressKeys,
    enum: SidebarPages,
    type: String,
    isArray: true,
  })
  @IsEnum(SidebarPages, { each: true })
  @Expose()
  progressKeys: SidebarPages[]

  constructor(partial: Partial<LastWill>) {
    Object.assign(this, partial)
  }
}

// PickTypes don't work with class-transformer, so we have to create a new class
export class LastWillMetadata {
  @ApiProperty({
    description: 'Progress keys',
    example: sampleObject.progressKeys,
    enum: SidebarPages,
    type: String,
    isArray: true,
  })
  @Expose()
  progressKeys: SidebarPages[]

  @ApiProperty({
    description: 'Testator',
    example: 'jeff',
    type: String,
  })
  @Expose()
  testator: string

  constructor(partial: Partial<LastWillMetadata>) {
    Object.assign(this, partial)
  }
}
