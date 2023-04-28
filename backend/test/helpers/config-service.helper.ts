/**
 * @description Mock of the configservice. Returns preset values
 */
export class MockConfigService {
  values = {
    JWT_EXPIRE_TIME: '15m',
    JWT_REFRESH_EXPIRE_TIME: '10h',
    JWT_REFRESH_SECRET: 'verysecret',
    JWT_SECRET: 'secret',
  }

  /**
   * @description Return value if existant in predetermined object
   */
  get(key: string) {
    return this.values[key]
  }
}
