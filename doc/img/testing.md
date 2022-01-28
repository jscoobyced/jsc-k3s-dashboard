# How to write tests

There are 2 types of tests:
- Unit tests
- UI or E2E Tests

## Unit Tests

Unit tests are run via [Jest](https://jestjs.io/). The format used here is to put the `.spec.ts` file along with the file being tested. Do not add any business or computational logic in the `.tsx` files. It will be more difficult to test all the branches.

You can run the unit tests from within the `%lt;rootDir&gt;/code/app` folder:
```
yarn test
```
or to see coverage:
```
yarn test --coverage --coverageFrom='./src/'
```

Alternatively, if you don't have a development environment (i.e. nodejs) you can run from the root of the project:
```
make unit-tests
```


## UI Tests

UI Tests are run via [Cypress](https://www.cypress.io/). The test are added in the `%lt;rootDir&gt;/code/cypress/cypress/integration` folder. The folder structure should follow the `%lt;rootDir&gt;/code/app/pages` folder structure.

You can run the tests from the root of the project:
```
make ui-tests
```

Running directly from the `cypress` folder with the `yarn cypress` won't work unless you start the `e2e` project and update the `%lt;rootDir&gt;/code/cypress/cypress.json` file to reflect the server name running the `e2e` mock application.

## CI

If you enable the build on CI, you will need to do:
```
make ci
```
This will run all the tests.

Deployement from CI is not yet supported. I will update when I find the right way to have the `kubectl` permissions to create/delete assets from a CI.