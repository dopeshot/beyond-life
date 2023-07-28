import { hash } from 'bcrypt'
/**
 * @description Sample user for testing
 */
export const SAMPLE_USER = {
  password: 'StarWarsIsAVeryNiceMovie',
  email: 'r2d2@jedi.temple',
  createdAt: new Date(Date.now()),
  paymentPlan: 'free',
  stripeCustomerId: 'cus_test',
  checkoutInformation: { status: 'free', lastInformationTime: 0 },
}

export const SAMPLE_USER_PW_HASH = async () =>
  await hash(SAMPLE_USER.password, 10)

const sampleHumanHeir = {
  id: '987654321',
  type: 'child',
  name: 'Heir Name',
  gender: 'male',
  birthDate: '1995-03-15',
  birthPlace: 'City',
  isHandicapped: false,
  isInsolvent: false,
  percentage: 50,
  itemIds: [1, 2, 3],
  child: {
    type: 'natural',
    relationship: 'childTogether',
  },
  address: {
    street: 'Sample Street',
    houseNumber: '1a',
    zipCode: '12345',
    city: 'Berlin',
  },
}

const sampleOrganisationHeir = {
  id: 'jeffsId',
  type: 'organisation',
  name: 'Strongpong e.V.',
  address: {
    street: 'Sample Street',
    houseNumber: '1a',
    zipCode: '12345',
    city: 'Berlin',
  },
}

export const sampleObject = {
  _id: 'aaaaaaaaaaaaaaaaaaaaaaa1',
  accountId: 'aaaaaaaaaaaaaaaaaaaaaaaa',
  common: {
    isBerlinWill: false,
    isPartnerGermanCitizenship: false,
    matrimonialProperty: 'communityOfGain',
  },
  testator: {
    name: 'Mary Testator',
    gender: 'female',
    birthDate: '1990-01-01',
    birthPlace: 'Berlin',
    isHandicapped: false,
    isInsolvent: false,
    relationshipStatus: 'unmarried',
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
  progressKeys: ['testator', 'marriage', 'heirs'],
}
