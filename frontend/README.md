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
npm run te:cli

# Run component + unit tests in cli (without client)
npm run tc:cli
```

### Design Guidelines

Entwurf 1: https://xd.adobe.com/view/2ab1e96c-ee16-4089-b7a6-39cb1e78a9d8-7fe2/

Entwurf 2: https://xd.adobe.com/view/59069299-3ece-4bf1-b5b1-45dd53a5bab8-0c55/

### Development Guidelines

- Naming Conventions i18n keys with snake_case, e.g.: `back_to_home`, `settings`, `settings_display_username`

### Tools

- [Nextjs](https://nextjs.org/) is used as frontend framework.
- [Cypress](https://www.cypress.io/) is used as testing framework.
- [Formik](https://formik.org/) is used to handle forms.
- [Yup](https://www.npmjs.com/package/yup) is used to handle form validation.
- [TailwindCSS](https://tailwindcss.com/) is used as CSS Utility Framework
- [MUI Core - Base UI](https://mui.com/base/getting-started/overview/) is used as headless UI Component Libary
- [I18next](https://www.i18next.com/) is used for multilanguage support
