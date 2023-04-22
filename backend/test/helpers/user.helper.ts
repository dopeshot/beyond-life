import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import {
  DataSource,
  DeleteResult,
  Repository,
} from 'typeorm';
import { UserEntity } from '../../src/db/entities/users.entity';

/**
 * @description Create user in provided datasource. Use defaults that can be overwritten
 */
export async function createUser(
  dataSource: DataSource,
  valueOverride?: Partial<UserEntity>,
): Promise<UserEntity> {
  const user: Partial<UserEntity> = {
    username: faker.lorem.word(),
    password: faker.lorem.word(),
    email: faker.internet.email(),
  };
  Object.assign(user, valueOverride);
  user.password = await hash(user.password, 10);
  return (await getRepository<UserEntity>(dataSource, UserEntity).insert(user))
    .generatedMaps[0] as UserEntity;
}

/**
 * @description Delete user by attribute
 */
export async function deleteUserByAttribute(
  dataSource: DataSource,
  identifier: Partial<UserEntity>,
): Promise<DeleteResult> {
  return await getRepository<UserEntity>(dataSource, UserEntity).delete(
    identifier,
  );
}

/**
 * @description Fetch user by attribute
 */
export async function getUserByAttribute(
  dataSource: DataSource,
  identifier: Partial<UserEntity>,
): Promise<UserEntity> {
  return await getRepository<UserEntity>(dataSource, UserEntity).findOneBy(
    identifier,
  );
}

/**
 * @description Get Repository for Entity
 */
function getRepository<T>(dataSource, entity): Repository<T> {
  return dataSource.getRepository(entity) as Repository<T>;
}
