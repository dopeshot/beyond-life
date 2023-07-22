export enum MailTemplates {
  VERIFY = 'verify',
  PASSWORD_RESET = 'password_reset',
  PASSWORD_RESET_SUPPORT = 'password_reset_support',
}

export interface VerifyMailData {
  verifyUrl: string
}

export interface PasswordResetMailData {
  resetUrl: string
}

// disable for eslint to allow for empty content. This ensures the MailTemplateContent type is complete
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PasswordResetContactSupportMailData {}

export type MailTemplateContent =
  | VerifyMailData
  | PasswordResetMailData
  | PasswordResetContactSupportMailData
