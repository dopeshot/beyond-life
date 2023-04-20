import { Permissions, PermissionValues } from './permissions'

export type PermissionGroups = {
  permissions: PermissionValues[]
  denies: PermissionValues[]
}

export const HasAccount: PermissionGroups = {
  permissions: ['TESTAMONY_SAVE', 'TESTAMONY_DELETE', 'TESTAMONY_EDIT'],
  denies: [],
}
export const ADMIN: PermissionGroups = {
  permissions: [...Permissions],
  denies: [],
}
