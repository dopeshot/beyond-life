import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './src/app.module';
import * as yaml from 'yaml';
import * as fs from 'fs';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { setupDataSource } from './test/helpers/db.helper';
import {promisify} from 'util';

const exec = promisify(require('node:child_process').exec);

async function main() {
  const dataSource = await setupDataSource();
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DataSource)
    .useValue(dataSource)
    .compile();

  const app = moduleFixture.createNestApplication();
  const config = new DocumentBuilder().build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });

  const yamlString = yaml.stringify(document, {});
  fs.writeFileSync('./api.yaml', yamlString);

  const { stdout, stderr } = await exec('npx openapi-typescript api.yaml --output schema.ts');
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);

  fs.rmSync('./api.yaml');
}

main();
