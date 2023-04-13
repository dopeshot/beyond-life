import 'i18next'

import common from './public/locales/en/common.json'
import example from './public/locales/en/example.json'

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common'
        resources: {
            common: typeof common
            example: typeof example
        }
    }
}