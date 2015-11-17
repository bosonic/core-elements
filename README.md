# Bosonic core elements

## Description

This repository hosts Bosonic core elements, a collection of basic UI atoms like tabs, dropdowns, collapsible, etc.

## Develop

Important: all PRs must be made against `dev` branch.
```
cd core-elements
git checkout dev
npm install
grunt demo
```
In order to work with the latest version of Bosonic's runtime, you should clone [bosonic's repo](https://github.com/bosonic/bosonic) too, checkout its `dev` branch, and npm link it:

```
cd ../bosonic
git checkout dev
npm install
npm link
cd ../core-elements
npm link bosonic
```

## Run tests

Tests are written for [web-component-tester](https://github.com/Polymer/web-component-tester), you'll need to install it globally to run tests:

```
wct
```
