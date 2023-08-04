import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ModelOptions, Severity, prop } from '@typegoose/typegoose'
import { Expose, Transform, Type, plainToClass } from 'class-transformer'
import {
  Equals,
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator'
import { ObjectId } from 'mongoose'
import { User } from './users.entity'

export enum PersonType {
  MOTHER = 'mother',
  FATHER = 'father',
  CHILD = 'child',
  SIBLING = 'siblings',
  OTHER = 'other',
  ORGANISATION = 'organisation',
  PARTNER = 'partner',
}

export enum Gender {
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

const swaggerExamplePersonHeir: Person = {
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

const swaggerExampleOrgaHeir: Organisation = {
  id: 'jeffsId',
  type: PersonType.ORGANISATION,
  name: 'Strongpong e.V.',
  address: {
    street: 'Sample Street',
    houseNumber: '1a',
    zipCode: '12345',
    city: 'Berlin',
  },
  percentage: 50,
  itemIds: ['33333333', '44444444'],
}

const swaggerExampleObject: LastWill = {
  _id: '6175f1906be245001e352a0e',
  accountId: 'aaaaaaaaaaaaaaaaaaaaaaaa',
  createdAt: new Date(),
  updatedAt: new Date(),
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
  heirs: [swaggerExamplePersonHeir, swaggerExampleOrgaHeir],
  items: [
    { id: '11111111', name: 'Item 1', description: 'Description 1' },
    { id: '22222222', name: 'Item 2', description: 'Description 2' },
  ],
  financialAssets: [
    { id: '33333333', where: 'PayPal', amount: 420.69, currency: 'EUR' },
    { id: '44444444', where: 'Bank', amount: 1234.56, currency: 'USD' },
  ],
  progressKeys: [
    SidebarPages.TESTATOR,
    SidebarPages.MARRIAGE,
    SidebarPages.HEIRS,
    SidebarPages.INHERITANCE,
    SidebarPages.SUCCESSION,
    SidebarPages.FINAL,
  ],
}

@Expose()
class ChildInfo {
  @prop({ required: false, enum: ChildType, type: String })
  @ApiPropertyOptional({
    description: 'Child type',
    example: swaggerExamplePersonHeir.child.type,
    enum: ChildType,
    type: String,
  })
  @IsOptional()
  @IsEnum(ChildType)
  type?: ChildType

  @prop({ required: false, enum: ChildRelationShip, type: String })
  @ApiPropertyOptional({
    description: 'Child relationship',
    example: swaggerExamplePersonHeir.child.relationship,
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
    example: swaggerExampleObject.common.isBerlinWill,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isBerlinWill?: boolean

  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Does the partner have a german citizenship',
    example: swaggerExampleObject.common.isPartnerGermanCitizenship,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isPartnerGermanCitizenship?: boolean

  @prop({ required: false, enum: MatrimonialProperty, type: String })
  @ApiPropertyOptional({
    description: 'How to handle the property',
    example: swaggerExampleObject.common.matrimonialProperty,
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
    example: swaggerExamplePersonHeir.address.street,
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(0, 256)
  street?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'House number',
    example: swaggerExamplePersonHeir.address.houseNumber,
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  houseNumber?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Zip code',
    example: swaggerExamplePersonHeir.address.zipCode,
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(5, 5)
  zipCode?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({ description: 'City', example: 'Berlin', type: String })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  city?: string
}

@Expose()
class PersonBase {
  @prop({ required: false, type: String })
  @ApiProperty({
    description: 'Full name',
    example: swaggerExamplePersonHeir.name,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Length(0, 100)
  name?: string

  @prop({ required: false, enum: Gender, type: String })
  @ApiPropertyOptional({
    required: false,
    enum: Gender,
    example: swaggerExamplePersonHeir.gender,
    type: String,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Birthdate',
    example: swaggerExamplePersonHeir.birthDate,
    type: String,
  })
  @IsOptional()
  @ValidateIf((e) => e.birthDate !== '')
  @IsString()
  @IsISO8601()
  birthDate?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Birthplace',
    example: swaggerExamplePersonHeir.birthPlace,
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(0, 256)
  birthPlace?: string

  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Is handicapped',
    example: swaggerExamplePersonHeir.isHandicapped,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isHandicapped?: boolean

  @prop({ required: false, type: Boolean })
  @ApiPropertyOptional({
    description: 'Is insolvent',
    example: swaggerExamplePersonHeir.isInsolvent,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isInsolvent?: boolean

  @prop({ required: false, type: Address, _id: false })
  @ApiPropertyOptional({
    description: 'Address',
    type: Address,
    example: swaggerExamplePersonHeir.address,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address?: Address
}

@Expose()
export class Person extends PersonBase {
  @prop({ required: true, type: String })
  @ApiProperty({
    description: 'Id',
    example: swaggerExamplePersonHeir.id,
    type: String,
  })
  @IsString()
  @Length(21, 21)
  id: string

  @prop({ required: true, enum: PersonType, type: String })
  @ApiProperty({
    description: 'Persontype',
    example: swaggerExamplePersonHeir.type,
    enum: PersonType,
    type: String,
  })
  @IsEnum(PersonType)
  type: PersonType

  // Succession
  @prop({ required: false, type: Number })
  @ApiPropertyOptional({
    description: 'Percentage',
    example: swaggerExamplePersonHeir.percentage,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  percentage?: number

  @prop({ required: false, type: [String], default: [] })
  @ApiPropertyOptional({
    description: 'Item ids',
    example: swaggerExamplePersonHeir.itemIds,
    type: String,
    isArray: true,
  })
  @IsString({ each: true })
  @IsOptional()
  @Length(21, 21, { each: true })
  itemIds?: string[]

  // Heirs
  @prop({ required: false, type: ChildInfo, _id: false })
  @ApiPropertyOptional({
    description: 'Child Info',
    type: ChildInfo,
    example: swaggerExamplePersonHeir.child,
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
    example: swaggerExampleObject.testator.relationshipStatus,
    enum: RelationshipStatus,
    type: String,
  })
  @IsOptional()
  @IsEnum(RelationshipStatus)
  relationshipStatus?: RelationshipStatus
}

@Expose()
export class Organisation {
  @prop({ required: true, type: String })
  @ApiProperty({
    description: 'Id',
    example: swaggerExampleOrgaHeir.id,
    type: String,
  })
  @IsString()
  @Length(21, 21)
  id: string

  @prop({ required: true, enum: PersonType, type: String })
  @ApiProperty({
    description: 'Persontype',
    example: swaggerExamplePersonHeir.type,
    enum: PersonType,
    type: String,
  })
  @Equals(PersonType.ORGANISATION)
  type: PersonType.ORGANISATION

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Name',
    example: swaggerExampleOrgaHeir.name,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Length(0, 256)
  name?: string

  @prop({ required: false, type: Address })
  @ApiPropertyOptional({
    description: 'Address',
    type: Address,
    example: swaggerExampleOrgaHeir.address,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address?: Address

  // Succession
  @prop({ required: false, type: Number })
  @ApiPropertyOptional({
    description: 'Percentage',
    example: swaggerExamplePersonHeir.percentage,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  percentage?: number

  @prop({ required: false, type: [String], default: [] })
  @ApiPropertyOptional({
    description: 'Item ids',
    example: swaggerExamplePersonHeir.itemIds,
    type: String,
    isArray: true,
  })
  @IsString({ each: true })
  @IsOptional()
  @Length(21, 21, { each: true })
  itemIds?: string[]
}

@Expose()
export class Item {
  @prop({ required: true, type: String })
  @ApiProperty({
    description: 'Id',
    example: swaggerExampleObject.items[0].id,
    type: String,
  })
  @IsString()
  @Length(21, 21)
  id: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Name',
    example: swaggerExampleObject.items[0].name,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Length(0, 256)
  name?: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Description',
    example: swaggerExampleObject.items[0].description,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Length(0, 1024)
  description?: string
}

@Expose()
export class FinancialAsset {
  @prop({ required: true, type: String })
  @ApiProperty({
    description: 'Id',
    example: swaggerExampleObject.financialAssets[0].id,
    type: String,
  })
  @IsString()
  @Length(21, 21)
  id: string

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Where',
    example: swaggerExampleObject.financialAssets[0].where,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Length(0, 256)
  where?: string

  @prop({ required: false, type: Number, min: 0 })
  @ApiPropertyOptional({
    description: 'Amount',
    example: swaggerExampleObject.financialAssets[0].amount,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  amount?: number

  @prop({ required: false, type: String })
  @ApiPropertyOptional({
    description: 'Currency',
    example: swaggerExampleObject.financialAssets[0].currency,
    type: String,
  })
  @IsString()
  @IsOptional()
  // @IsISO4217CurrencyCode() We decide against this to allow for custom currencies
  @Length(0, 100)
  currency?: string
}

export class MongooseBaseEntity {
  @Expose()
  @ApiProperty({
    description: 'Creation date of user',
    example: swaggerExampleObject.createdAt,
  })
  createdAt: Date

  @Expose()
  @ApiProperty({
    description: 'Last Update date of user',
    example: swaggerExampleObject.updatedAt,
  })
  updatedAt: Date

  @Expose()
  @ApiProperty({
    description: 'Id',
    example: swaggerExampleObject._id,
  })
  @Type(() => String)
  _id: ObjectId | string
}

@ModelOptions({ schemaOptions: { timestamps: true, minimize: false } })
export class LastWill extends MongooseBaseEntity {
  @prop({
    required: true,
    type: String,
    ref: () => User,
    index: true,
    unique: false,
  })
  @ApiProperty({
    description: 'Account id',
    example: swaggerExampleObject.accountId,
    type: String,
  })
  accountId: string

  @prop({ required: true, type: Common, _id: false, default: {} })
  @ApiProperty({
    type: Common,
    description: 'Common data for the will',
    example: swaggerExampleObject.common,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => Common)
  @Expose()
  common: Common

  @prop({ required: true, type: Testator, _id: false, default: {} })
  @ApiProperty({
    type: Testator,
    description: 'Testator data',
    example: swaggerExampleObject.testator,
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
    example: swaggerExampleObject.heirs,
  })
  @ValidateNested({ each: true })
  /*We know how it works, but not why it works, the Type and Transform are both from the transformer class.
    The Type is needed for the validation
    The Transform is needed for the Serialization
    But the Type also says that it transforms with the subTypes and creates instances, so we are uncertain why this doesn't fix both
    The Transform is performed after the Type, but in Serialization it seems the Type is not enough transformation
    This is only needed if lastwillModel returns flattenMaps (for example not on .create)
  */
  @Type((value) =>
    value.object.type === PersonType.ORGANISATION ? Organisation : Person,
  )
  @Expose()
  @Transform(
    ({ value }) =>
      value?.map((object: Person | Organisation) =>
        object.type === PersonType.ORGANISATION
          ? plainToClass(Organisation, object)
          : plainToClass(Person, object),
      ),
  )
  heirs: (Person | Organisation)[]

  @prop({ required: true, type: [Item], default: [], _id: false })
  @ApiProperty({
    type: [Item],
    description: 'Items',
    isArray: true,
    example: swaggerExampleObject.items,
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
    example: swaggerExampleObject.financialAssets,
  })
  @ValidateNested({ each: true })
  @Type(() => FinancialAsset)
  @Expose()
  financialAssets: FinancialAsset[]

  @prop({ required: true, default: [], allowMixed: Severity.ALLOW })
  @ApiProperty({
    description: 'Progress keys',
    example: swaggerExampleObject.progressKeys,
    enum: SidebarPages,
    type: String,
    isArray: true,
  })
  @IsEnum(SidebarPages, { each: true })
  @Expose()
  progressKeys: SidebarPages[]

  constructor(partial: Partial<LastWill>) {
    super()
    Object.assign(this, partial)
  }
}

// PickTypes don't work with class-transformer, so we have to create a new class
export class LastWillMetadata extends MongooseBaseEntity {
  @ApiProperty({
    description: 'Progress keys',
    example: swaggerExampleObject.progressKeys,
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
    super()
    Object.assign(this, partial)
  }
}
