export const Permissions = [
  'TESTAMONY_SAVE',
  'TESTAMONY_DELETE',
  'TESTAMONY_EDIT',
  'TESTAMONY_CREATE',
] as const

export type PermissionValues = (typeof Permissions)[number]
