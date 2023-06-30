import { ConfigurableModuleBuilder } from '@nestjs/common'
import { MailModuleConfig } from '../types/mail-module.type'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<MailModuleConfig>()
    .setClassMethodName('forRoot')
    .build()
