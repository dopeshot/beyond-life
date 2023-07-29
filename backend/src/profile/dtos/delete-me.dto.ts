import { IsString } from 'class-validator'

export class DeleteMeDTO {
  @IsString()
  password: string
}
