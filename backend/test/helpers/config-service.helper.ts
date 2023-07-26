/**
 * @description Mock of the configservice. Returns preset values
 */
export class MockConfigService {
  public values = {
    JWT_EXPIRE_TIME: '15m',
    JWT_REFRESH_EXPIRE_TIME: '10h',
    JWT_REFRESH_SECRET: 'verysecret',
    JWT_VERIFY_SECRET: 'alsoverysecret',
    JWT_VERIFY_EXPIRE_TIME: '1d',
    JWT_SECRET: 'secret',
    DB_USER_NAME: 'admin',
    DB_USER_PW: 'admin',
    DB_DB: 'siebtesleben',
    DB_HOST: 'localhost',
    DB_PORT: '27018',
    JWT_PASSWORD_RESET_SECRET: 'evensecretersecret',
    JWT_PASSWORD_RESET_EXPIRE_TIME: '4h',
    // Actually it would be the Stripe id smth like price_... but for testing we skip Stripe
    STRIPE_ITEM_SINGLE: 4900,
    STRIPE_ITEM_FAMILY: 14900,
    STRIPE_ITEM_SINGLE_TO_FAMILY: 10000,
  }

  /**
   * @description Return value if existant in predetermined object
   */
  get(key: string) {
    return this.values[key]
  }
}
