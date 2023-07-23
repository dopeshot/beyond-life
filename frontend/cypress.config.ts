import { defineConfig } from 'cypress'

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {},
		baseUrl: 'http://localhost:3000',
	},
	component: {
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
		CYPRESS_API_BASE_URL: 'http://localhost:3001',
	},
})
