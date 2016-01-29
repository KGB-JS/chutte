# Chutte.com #

---

Table of Contents
-----------------
1. [Requirements](#requirements)
2. [About](#about)
3. [Demo](#demo)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Structure](#structure)
7. [Webpack](#webpack)
8. [Troubleshooting](#troubleshooting)

Requirements
------------
    bcrypt: ^0.8.5,
    body-parser: ^1.14.2,
    bootstrap: ^3.3.6,
    chai: ^3.4.1,
    chai-http: ^1.0.0,
    es6-promise: ^3.0.2,
    express: ^4.13.3,
    express-partials: ^0.3.0,
    history: ^1.17.0,
    http: 0.0.0,
    isomorphic-fetch: ^2.2.1,
    jwt-simple: ^0.4.1,
    mocha: ^2.3.4,
    moment: ^2.11.1,
    mongoose: ^4.3.5,
    morgan: ^1.6.1,
    q: ^1.4.1,
    react: ^0.14.6,
    react-datepicker: ^0.18.0,
    react-dom: ^0.14.6,
    react-redux: ^4.0.6,
    react-router: ^1.0.3,
    redux: ^3.0.5,
    redux-logger: ^2.3.2,
    redux-simple-router: ^1.0.2,
    redux-thunk: ^1.0.3,
    request: ^2.67.0,
    sendgrid: ^2.0.0,
    socket.io: ^1.4.4,
    socket.io-client: ^1.4.4,
    webpack: ^1.12.11,
    babel-core: ^6.4.0,
    babel-loader: ^6.2.1,
    babel-preset-es2015: ^6.3.13,
    babel-preset-react: ^6.3.13,
    babel-preset-stage-1: ^6.3.13,
    eslint: ^1.10.3,
    eslint-config-airbnb: ^3.1.0,
    eslint-plugin-react: ^3.15.0,
    react-hot-loader: ^1.3.0,
    redux-devtools: ^3.0.1,
    redux-devtools-dock-monitor: ^1.0.1,
    redux-devtools-log-monitor: ^1.0.2,
    webpack-dev-middleware: ^1.4.0,
    webpack-dev-server: ^1.14.1,
    webpack-hot-middleware: ^2.6.0


About
--------

Chutte.com is a reverse auction web app.
*[Reverse Auction](https://en.wikipedia.org/wiki/Reverse_auction)
Some technologies we used:
  * [React](https://facebook.github.io/react/) for unidirectional data flow and performant UI
  * [Redux](https://github.com/rackt/redux) architecture for predictable app state, with [react-redux](https://github.com/rackt/react-redux) bindings
  * [react-router](https://github.com/rackt/react-router) and [redux-router](https://github.com/rackt/redux-router) for routing
  * [redux-devtools](https://github.com/gaearon/redux-devtools) for time travel debugging
  * [Babel](https://babeljs.io/) to transpile ES6/7 syntax
  * [Webpack](https://webpack.github.io/) for builds/automation, with [eslint](http://eslint.org/) linting and [mocha](https://mochajs.org/)/[chai](http://chaijs.com/) testing
  * [BootStrap](http://getbootstrap.com/) React components implementing BootStrap's Material Design
  * [MongoDB](https://www.mongodb.org/) database with [Sequelize](http://docs.sequelizejs.com/en/latest/) ORM
  * [bcrypt](https://www.npmjs.com/package/bcrypt-nodejs) for user authentication
  * [Node](https://nodejs.org/en/)/[Express](http://expressjs.com/en/index.html) server with [redux-thunk](https://github.com/gaearon/redux-thunk) middleware

Demo
----

Check out [chutte.com](http://www.chutte.com/). 
Also check out [our quick demo video](http://bit.ly/chutte).


Getting Started
---------------

Clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/KGB-JS/chutte.git
$ cd fear-the-repo
$ npm install                   # Install Node modules listed in ./package.json (this will be a while)
```

Usage
-----

#### `npm run build`
Runs the webpack build system with webpack-dev-server (by default found at `localhost:3000`).


Structure
---------


```

   |-client
   |---public
   |-----dist
   |---src                   # Application source code
   |-----actions             # Redux action creators
   |-----Components          # Generic React Components
   |-----containers          # Components that provide context
   |-----core-layout         # Components that dictate major page structure
   |-----reducers            # Redux reducers
   |-----socket
   |-----store               # Redux store configuration
   |-server
   |---config
   |---items
   |-----itemHelpers
   |---priceSchedule
   |---socket
   |---user
   |-test                    
```


Using Redux DevTools
--------------------

In development, Redux Devtools are enabled by default. You can toggle visibility and move the dock around using the following keyboard shortcuts:

- <kbd>Ctrl+H</kbd> Toggle DevTools Dock
- <kbd>Ctrl+Q</kbd> Move Dock Position
- see [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detail information.

Webpack
-------

The webpack compiler configuration is located in `~/build/webpack`. Here you'll find configurations for each environment; `development`, `production`, and `development_hot`. These configurations are selected based on your current `NODE_ENV`, with the exception of `development_hot` which will _always_ be used by webpack dev server.

**Note**: There has been a conscious decision to keep development-specific configuration (such as hot-reloading) out of `.babelrc`. By doing this, it's possible to create cleaner development builds (such as for teams that have a `dev` -> `stage` -> `production` workflow) that don't, for example, constantly poll for HMR updates.

So why not just disable HMR? Well, as a further explanation, enabling `react-transform-hmr` in `.babelrc` but building the project without HMR enabled (think of running tests with `NODE_ENV=development` but without a dev server) causes errors to be thrown, so this decision also alleviates that issue.




Troubleshooting
---------------

Having an issue? Please let us know! Report it and we'll get to it as soon as possible.


Contributing
------------

If you would like to submit a pull request, please make an effort to follow the guide in [CONTRIBUTING.md](CONTRIBUTING.md).


Thanks for checking this out.

– KGB-JS / chutte (Peter, Sean, Mick and Tim)
