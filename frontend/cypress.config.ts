const codeCoverageTask = require('@bahmutov/cypress-code-coverage/plugin')
import { defineConfig } from 'cypress'

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			require('@cypress/code-coverage/task')(on, config)
			return config
		},
		baseUrl: 'http://localhost:3000',
	},
	component: {
		setupNodeEvents(on, config) {
			return Object.assign({}, config, codeCoverageTask(on, config))
		},
		specPattern: '**/*.{cy,unit}.{js,jsx,ts,tsx}',
		devServer: {
			framework: 'next',
			bundler: 'webpack',
		},
	},
	viewportWidth: 1920,
	viewportHeight: 1080,
	env: {
		CYPRESS_BASE_URL: 'http://localhost:3000',
	},
})
