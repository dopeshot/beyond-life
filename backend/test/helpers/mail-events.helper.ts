import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { MailEventEntity } from '../../src/db/entities/mail-event.entity'

/**
 * @description Fetch mail events by attribute
 */
export async function getMailEventsByAttribute(
  dataSource: DataSource,
  identifier?: FindOptionsWhere<MailEventEntity>,
): Promise<MailEventEntity[]> {
  if (!identifier) {
    return await getRepository<MailEventEntity>(
      dataSource,
      MailEventEntity,
    ).find()
  }
  return await getRepository<MailEventEntity>(
    dataSource,
    MailEventEntity,
  ).findBy(identifier)
}

export async function insertMailEvent(
  datasource: DataSource,
  mailEvent: Partial<MailEventEntity>,
) {
  if (!mailEvent) {
    return
  }
  const mailEventEntity = await getRepository<MailEventEntity>(
    datasource,
    MailEventEntity,
  ).create(mailEvent)
  await getRepository<MailEventEntity>(datasource, MailEventEntity).save(
    mailEventEntity,
  )
}

/**
 * @description Get Repository for Entity
 */
function getRepository<T>(dataSource, entity): Repository<T> {
  return dataSource.getRepository(entity) as Repository<T>
}
