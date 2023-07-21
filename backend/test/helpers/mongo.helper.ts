// Testing these is not necessary
/* istanbul ignore file */

import {
  TypegooseModule,
  TypegooseModuleAsyncOptions,
} from '@m8a/nestjs-typegoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongod: MongoMemoryServer

export const rootTypegooseTestModule = (
  options: TypegooseModuleAsyncOptions = {},
) =>
  TypegooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create()
      const mongoUri = await mongod.getUri()
      return {
        uri: mongoUri,
        ...options,
      }
    },
  })

export const closeInMongodConnection = async () => {
  if (mongod) await mongod.stop()
}
