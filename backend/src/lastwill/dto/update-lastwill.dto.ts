import { CreateLastWillDto } from './create-lastwill.dto'

// It is not a partialType since we are expecting a put, so we want everything the same, we just don't update the _id and accountId
export class UpdateLastWillDto extends CreateLastWillDto {}
