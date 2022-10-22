# Welcome to the contributing docs of this project

First of all, thank you for investing your time in contributing to this project. This guide includes everything you need to know to contribute.

## Goals of this project

Before you contribute, make sure you understand the goals of this project. If you're unsure if your contribution would fit these goals, please just open an issue and ask.

1. **Basically no bundle size**  
   Including this package in your project, should result in basically no added bundle size. The majority are just type shims anyway.

1. **Full compatibility with `EventTarget`**  
   Migrating from `EventTarget` should simply require swapping `EventTarget` with `TypedEventTarget`

1. **Work with all types of `Event`**  
   This package should not take any assumptions of what type of event a user wants to use. It should work with `Event` and any classes that extend `Event` (no matter if user-defined or included in ECMAScript)

## Code Styling

### Prettier

You should use [Prettier](https://prettier.io/) to format your code.

You can run Prettier by executing `npm run fmt`

### ESLint

For linting we use [ESLint](https://eslint.org/). Please make sure any code that you contribute complies with our ESLint config.

You can run ESLint by executing `npm run lint`

## Tests

This project includes some tests via [`tsd`](https://www.npmjs.com/package/tsd). These tests are mainly to ensure that future commits do not break any TS types.

You can run the tests by executing `npm run test`

## Building

This project uses [`tsup`](https://www.npmjs.com/package/tsup) as its build system.

You can build the project by executing `npm run build`
