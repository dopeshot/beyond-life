import { hash } from 'bcrypt'
/**
 * @description Sample user for testing
 */
export const SAMPLE_USER = {
  password: 'StarWarsIsAVeryNiceMovie',
  email: 'r2d2@jedi.temple',
  createdAt: new Date(Date.now()),
}

export const SAMPLE_USER_PW_HASH = async () =>
  await hash(SAMPLE_USER.password, 10)
