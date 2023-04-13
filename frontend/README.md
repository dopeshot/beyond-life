# Frontend BeyondLife

### Start the frontend
```sh
git clone git@github.com:dopeshot/beyond-life.git
cd frontend
npm i # Install deps
npm run dev # Run in watch
```

### Build

```sh
npm run build
npm run start # Starts that build
```
### Testing

```sh
# Open Cypress Client
npm run test 

# Run e2e tests in cli (without client)
npm run test-e2e:cli

# Run component + unit tests in cli (without client)
npm run test-components:cli
```

### Tools

- [Nextjs](https://nextjs.org/) is used as frontend framework.
- [Cypress](https://www.cypress.io/) is used as testing framework.
- [Formik](https://formik.org/) is used to handle forms.
- [Yup](https://www.npmjs.com/package/yup) is used to handle form validation.
- [TailwindCSS](https://tailwindcss.com/) is used as CSS Utility Framework
- [MUI Core - Base UI](https://mui.com/base/getting-started/overview/) is used as headless UI Component Libary
- [I18next](https://www.i18next.com/) is used for multilanguage support