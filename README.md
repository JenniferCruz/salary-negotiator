# salary-negotiator-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your functional tests (Cypress)
__Note__: `npx` (used below) is included with npm > v5.2 or can be installed separately.

__Note__: Prior to running Cypress:
* Start a web server 
* Update the `baseUrl` property on`cypress.json` to match the port at which the app is running on your local.

Then, you can run the tests on the command line with the following command:

```
npx cypress run
```

Alternatively, you can see the tests running on the browser by opening Cypress.

#####Opening Cypress
```
npx cypress open
```
Next, run the tests by clicking on the `negotiator_app_spec.js` file or on the `Run all specs` button.

Check [Cypress Getting Started Guide](https://docs.cypress.io/guides/getting-started/installing-cypress.html#Opening-Cypress) for other options.


### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
