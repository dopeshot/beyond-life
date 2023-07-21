import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Test, TestingModule } from '@nestjs/testing'
import * as fs from 'fs'
import { DataSource } from 'typeorm'
import { promisify } from 'util'
import * as yaml from 'yaml'
import { AppModule } from './src/app.module'
import { MockConfigService } from './test/helpers/config-service.helper'
import { setupDataSource } from './test/helpers/db.helper'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = promisify(require('node:child_process').exec)

async function main() {
  const dataSource = await setupDataSource()
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DataSource)
    .useValue(dataSource)
    .overrideProvider(ConfigService)
    .useClass(MockConfigService)
    .compile()

  const app = moduleFixture.createNestApplication()
  const config = new DocumentBuilder().build()

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  })

  const yamlString = yaml.stringify(document, {})
  fs.writeFileSync('./api.yaml', yamlString)

  const { stdout, stderr } = await exec(
    'npx --yes @openapitools/openapi-generator-cli generate -i ./api.yaml -o ../frontend/src/generated -g typescript-fetch',
  )
  console.log('stdout:', stdout)
  console.error('stderr:', stderr)

  fs.rmSync('./api.yaml')
}

main()
