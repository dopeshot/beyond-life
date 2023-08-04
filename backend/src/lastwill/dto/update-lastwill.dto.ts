import { LastWill } from '../../db/entities/lastwill.entity'

// It is not a partialType since we are expecting a put, so we want everything the same, we just don't update the _id and accountId
export class UpdateLastWillDto extends LastWill {}
