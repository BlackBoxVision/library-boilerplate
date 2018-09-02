# Library Boilerplate

This boilerplate enables you to easily setup your own library code, and you get by default a:

- Rollup build for ESM, CommonJS, and UMD with sourceMaps
- Testing and coverage
- ESNext code transform via Babel 7
- Easy to publish via `npm run publish`
- Easy to configure your NPM registry via `publishConfig`

## ¿How do I start?

Fork this repository, or better, download the `.zip` and generate a new repository pushing all the files from here.

## Library Naming

To modify the library naming when running `npm run build` you have to go to `package.json` and modify the following lines:

```json
//package.json
{
  "name": "library-boilerplate",
  "description": "Library Boilerplate to easy bootstrap project",
  "main": "lib/library-boilerplate.cjs.js",
  "module": "lib/library-boilerplate.esm.js",
  "browser": "lib/library-boilerplate.umd.js"
}
```

## Rollup Config

The rollup configuration defined is almost generic. You only need to provide some specific things related to the library you will develop:

- `External Dependencies`
- `UMD Module name`
- `UMD Global Variables`

Those things can be provided by the following way:

```json
//package.json
{
  "umd": {
    "name": "YourLibraryName",
    "globals": {}
  },
  "external": []
}
```

## Babel Config

The babel configuration is super basic. You can extend at your own needs. The default setup is the following one:

```javascript
"use strict";

module.exports = function (api) {
    api.cache(true);
    
    return {
        presets: [
            "@babel/preset-env"
        ],
        plugins: [
            "@babel/plugin-proposal-class-properties"
        ]
    };
};
```

It comes with `preset-env` and `plugin-proposal-class-properties`. 

#### ¿Why I use babel.config.js?

Well, I was using `.babelrc` with `env` to load configuration for specific environments:

- Testing
- Production

But, `env` will get deprecated sooner or later. It's better to transition, and move to the js version of the configuration file, which gives you enough flexibility.

## Licensing

By default, this boilerplate comes with an empty MIT License. If you need to provide your own, you can replace it. I choose MIT License due to be the default when building an Open Source Library.

## Examples

To be able to use your library in your examples, you need to do the following two things:

- You need to run the command `npm run link`. This command will run a `production` build with rollup and will generate a symlink in your local NPM repository for you to be able to use your library wherever you want.
- In the example project you should run `npm link your-library-name`. That will perform an install of the symlink in your project.


## Notes

Take care that if you add some folder with content that is related to the library (For e.g. assets for logos or library documentation), add it to the `.npmignore` file. 
The `.npmignore` fill is well configured, so you only expose what's really need to the person that will use it. 

**This library boilerplate tries to solve this problem. Most of the time, library developers don't take care of what they upload to the NPM registry. You only should provide what the user needs. NOTHING ELSE MATTERS.**

## TODO 

There's more work that needs to be done for boilerplate, and that includes:

- ESLint
- Run tests with Jest
- Add travis.yml config
- Add budgets for travis and coveralls/codecov
- In travis.yml config create a job to run tests, and publish coverage to coveralls/codecov
