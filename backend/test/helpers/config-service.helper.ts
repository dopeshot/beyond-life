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
    DB_PORT: '27017',
    JWT_PASSWORD_RESET_SECRET: 'evensecretersecret',
    JWT_PASSWORD_RESET_EXPIRE_TIME: '4h',
  }

  /**
   * @description Return value if existant in predetermined object
   */
  get(key: string) {
    return this.values[key]
  }
}
