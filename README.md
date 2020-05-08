
# mango-loader

The `mango-loader` resolves `require()` on a file into a url and emits the file into the output directory.

## Getting Started

To begin, you'll need to install `mango-loader`:

```console
$ npm install mango-loader --save-dev
```

`require` the target file(s) in one of the bundle's files:

**file.js**

```js
require('!mango-loader!./file.png';
```

 This will emit `file.png` as a file
in the output `mango` directory and returns the public URI of the file.
