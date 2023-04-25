import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './src/app.module';
import * as yaml from 'yaml';
import * as fs from 'fs';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { setupDataSource } from './test/helpers/db.helper';
import { exec } from 'child_process';

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

  exec('npx openapi-typescript schema.yaml --output schema.ts');
  fs.rmSync('./api.yaml');
}

main();
