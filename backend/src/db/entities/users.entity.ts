import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { prop } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'
import { ObjectId } from 'mongoose'

/**
 * @description Entity with all user information
 */
export class User {
  _id: ObjectId

  @Expose({ groups: ['self'] })
  @prop({ required: true, unique: true })
  @ApiProperty({
    description: 'Email of the user. Only exposed to self',
    example: 'test@test.test',
  })
  email: string

  @Exclude()
  @prop({ required: true })
  password: string

  @Expose({ groups: ['self'] })
  @prop()
  @ApiPropertyOptional({
    description: 'Last login for the user. Only exposed to self',
    example: Date.now(),
  })
  lastLogin: Date | null

  @Expose()
  @prop()
  @ApiPropertyOptional({
    description: 'Creation date of user',
    example: Date.now(),
  })
  createdAt: Date

  @Expose()
  @prop({ required: true, default: false })
  @ApiProperty({
    description: 'Has the users mail been verified?',
  })
  hasVerifiedEmail: boolean
}

export type UserModel = User & Document
