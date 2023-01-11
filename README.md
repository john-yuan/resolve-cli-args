# resolve-cli-args

[![npm version](https://img.shields.io/npm/v/resolve-cli-args)](https://www.npmjs.com/package/resolve-cli-args)
[![install size](https://packagephobia.now.sh/badge?p=resolve-cli-args)](https://packagephobia.now.sh/result?p=resolve-cli-args)

<!-- [![npm downloads](https://img.shields.io/npm/dm/resolve-cli-args.svg)](http://npm-stat.com/charts.html?package=resolve-cli-args) -->
<!-- [![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/john-yuan/resolve-cli-args/blob/main/src/index.test.ts) -->

A simple function to resolve cli arguments.

## Install

```sh
npm i resolve-cli-args
```

## Examples

```ts
import { resolveCliArgs } from './index'

console.log(resolveCliArgs([
  '--config', 'config.json', 'input.txt', 'output.txt'
]))
// {
//   args: { '--config': [ 'config.json' ] },
//   unnamedValues: [ 'input.txt', 'output.txt' ]
// }

console.log(resolveCliArgs([
  '--log-level=2', '--type', 'typescript'
]))
// {
//   args: { '--log-level': [ '2' ], '--type': [ 'typescript' ] },
//   unnamedValues: []
// }

console.log(resolveCliArgs([
  '--compress', '-q'
]))
// { args: { '--compress': [], '-q': [] }, unnamedValues: [] }

console.log(resolveCliArgs([
  '--a', '1', 'a', '--b', '2', 'b', '--c=3', 'c'
]))
// {
//   args: { '--a': [ '1' ], '--b': [ '2' ], '--c': [ '3' ] },
//   unnamedValues: [ 'a', 'b', 'c' ]
// }

console.log(resolveCliArgs([
  '--ext=.js', '--ext=.ts', '--ext', '.jsx', '--ext', '.tsx'
]))
// {
//   args: { '--ext': [ '.js', '.ts', '.jsx', '.tsx' ] },
//   unnamedValues: []
// }

console.log(resolveCliArgs([
  '--var=a=b', '--var', '---c=d'
]))
// { args: { '--var': [ 'a=b', '---c=d' ] }, unnamedValues: [] }
```

> Note: The string that starts with `"--"` or `"-"` will be treated as option name (not including the string that starts with `"---"`).

## License

[MIT](https://github.com/john-yuan/resolve-cli-args/blob/main/LICENSE)
