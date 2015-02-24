# yggdrasil-seed

Seed project for the new version of Famo.us, a.k.a. Yggdrasil.

## Quick start

After cloning the repo, run:

    $ npm install
    $ npm run start-dev

Then open [localhost:1337](http:localhost:1337) in your browser. You should see a "Hello World!" demo.

The entrypoint for your new project is located at `src/index.js`.

## Development

You may want to work against a local version of Yggdrasil, rather than the code that NPM pulled down.

First, clone the Yggdrasil repo and use `npm link` to link the project as your local `"famous"` package:

    $ git clone git@github.famo.us:platform/yggdrasil.git
    $ cd yggdrasil
    $ npm link

When you clone this seed project, remember to link to the locally installed version of Yggdrasil:

    $ git@github.famo.us:platform/yggdrasil-seed.git
    $ cd yggdrasil-seed
    $ npm install
    $ npm link famous

This will symlink your local Yggdrasil repository to the seed project. You can now make changes to both your code and the Famo.us library itself. Changes will automatically trigger rebuilds of the seed project.

### Linting

A basic linting harness is set up for you. Lint your project according to the Famo.us style conventions with:

    $ npm run lint

### Building

To create a complete, minified build of your project, run:

    $ npm run build

The compiled bundle will be located at `public/bundle.js`.
