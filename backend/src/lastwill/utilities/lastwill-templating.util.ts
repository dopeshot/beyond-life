import { TestatorHeader } from '../dto/generated-lastwill.dto'

const PLACEHOLDERS = {
  CITY: '[Stadt]',
  HOUSE_NUMBER: '[Hausnummer]',
  ZIP_CODE: '[PLZ]',
  NAME: '[Name]',
  STREET: ['Straßenname'],
}

export function generateTestatorHeader(
  testatorName: string,
  testatorStreet: string,
  testatorhouseNumber: string,
  testatorCity: string,
  testatorZipCode: string,
): TestatorHeader {
  return {
    fullName: testatorName || PLACEHOLDERS.NAME,
    AddressStreet: `${testatorStreet || PLACEHOLDERS.STREET} ${
      testatorhouseNumber || PLACEHOLDERS.HOUSE_NUMBER
    }`,
    AddressCity: `${testatorZipCode || PLACEHOLDERS.ZIP_CODE} ${
      testatorCity || PLACEHOLDERS.CITY
    }`,
  }
}
