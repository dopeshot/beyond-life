import { ConfigurableModuleBuilder } from '@nestjs/common'
import { MailModuleConfig } from '../interfaces/mail-module.interface'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<MailModuleConfig>()
    .setClassMethodName('forRoot')
    .build()
