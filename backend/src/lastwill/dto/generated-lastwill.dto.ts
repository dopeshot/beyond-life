export class TestatorHeader {
  fullName: string
  AddressStreet: string
  AddressCity: string
}

export class LastWillParagraph {
  title: string
  contents: string[]
}

export class GeneratedLastWillDTO {
  testatorHeader: TestatorHeader
  locationHeader: string
  title: string
  initialText: string
  paragraphs: LastWillParagraph[]
}
