import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'

@Expose()
export class TestatorHeader {
  @ApiProperty({
    description: 'Full name of the testator',
    type: String,
    example: 'Kim Jong Un',
  })
  fullName: string

  @ApiProperty({
    description: 'Street where the testator resides',
    type: String,
    example: 'Jungsong-dong 1',
  })
  AddressStreet: string

  @ApiProperty({
    description: 'City where the testator resides',
    type: String,
    example: 'DPRK Pyongyang ',
  })
  AddressCity: string
}

@Expose()
export class LastWillParagraph {
  @ApiProperty({
    description: 'Paragraph title',
    example: 'Very Legal Paragraph',
    type: String,
  })
  title: string
  @ApiProperty({
    description: 'Content of the text within the paragraph.',
    example: ['Very important sentence.', 'Even more important sentence!'],
    type: String,
    isArray: true,
  })
  contents: string[]
}

@Expose()
export class GeneratedLastWillDTO {
  @ApiProperty({
    description: 'Contents for the header describing the testator',
    type: TestatorHeader,
  })
  @Type(() => TestatorHeader)
  testatorHeader: TestatorHeader

  @ApiProperty({
    description: 'Header for the location and date',
    type: String,
    example: 'Pyongyang, den 31. Juli 2023',
  })
  locationHeader: string

  @ApiProperty({
    description: 'lastwill title',
    type: String,
    example: 'Mein Testament und letzter Wille',
  })
  title: string

  @ApiProperty({
    description: 'Opening text for the last will',
    type: String,
    example:
      'Ich, Kim Jong Un, geboren am 08.01.1984 in Pyongyang, widerrufe mit diesem Testament alle bisher errichteten Verfügungen von Todes wegen und bestimme hiermit Folgendes:',
  })
  initialText: string

  @ApiProperty({
    description: 'Content of the last will',
    type: LastWillParagraph,
    isArray: true,
  })
  @Type(() => LastWillParagraph)
  paragraphs: LastWillParagraph[]

  constructor(partial: Partial<GeneratedLastWillDTO>) {
    Object.assign(this, partial)
  }
}
