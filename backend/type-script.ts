import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './src/app.module'
import * as yaml from 'yaml'
import * as fs from 'fs'
import { Test, TestingModule } from '@nestjs/testing'
import { setupDataSource } from './test/helpers/db.helper'
import { promisify } from 'util'
import { ConfigService } from '@nestjs/config'
import { MockConfigService } from './test/helpers/config-service.helper'

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
    'npx openapi-typescript api.yaml --output schema.ts',
  )
  console.log('stdout:', stdout)
  console.error('stderr:', stderr)

  fs.rmSync('./api.yaml')
}

main()
