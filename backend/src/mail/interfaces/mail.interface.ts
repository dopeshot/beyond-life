export enum MailTemplates {
  VERIFY = 'verify',
}

export interface VerifyMailData {
  verifyUrl: string
}

export interface SampleMailData {
  test: string
}

export type MailTemplateContent = VerifyMailData | SampleMailData
