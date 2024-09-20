# resolve-cli-args

[![npm version](https://img.shields.io/npm/v/resolve-cli-args)](https://www.npmjs.com/package/resolve-cli-args)
[![install size](https://packagephobia.now.sh/badge?p=resolve-cli-args)](https://packagephobia.now.sh/result?p=resolve-cli-args)
[![npm downloads](https://img.shields.io/npm/dm/resolve-cli-args.svg)](https://npm-stat.com/charts.html?package=resolve-cli-args)

<!-- [![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/john-yuan/resolve-cli-args/blob/main/src/index.test.ts) -->

A simple function to resolve cli arguments.

## Install

```sh
npm i resolve-cli-args
```

## Usage

```ts
import { resolveCliArgs } from 'resolve-cli-args'

const { args } = resolveCliArgs(process.argv.slice(2))

if (args['--help'] || args['-h']) {
  // print help message
}
```

The type of the return value is:

```ts
export interface ResolvedCliArgs {
  /**
   * An object containing argument names and their values.
   */
  args: Record<string, string[] | undefined>

  /**
   * A list of values without option names.
   */
  unnamedValues: string[]
}
```

> If the option do not have any values, the value of this option will be set to an empty array.

## Examples

```ts
import { resolveCliArgs } from 'resolve-cli-args'

const print = (value: string) => {
  const argv = value.split(' ')
  const resolved = resolveCliArgs(argv)

  console.log(resolved)
}

print('--config config.json input.txt output.txt')
// {
//   args: { '--config': [ 'config.json' ] },
//   unnamedValues: [ 'input`.txt', 'output.txt' ]
// }

print('--log-level=2 --type typescript')
// {
//   args: { '--log-level': [ '2' ], '--type': [ 'typescript' ] },
//   unnamedValues: []
// }

print('--compress -q')
// { args: { '--compress': [], '-q': [] }, unnamedValues: [] }

print('--a 1 a --b 2 b --c=3 c')
// {
//   args: { '--a': [ '1' ], '--b': [ '2' ], '--c': [ '3' ] },
//   unnamedValues: [ 'a', 'b', 'c' ]
// }

print('--ext=.js --ext=.ts --ext .jsx --ext .tsx')
// {
//   args: { '--ext': [ '.js', '.ts', '.jsx', '.tsx' ] },
//   unnamedValues: []
// }

print('--var=a=b --var ---c=d')
// { args: { '--var': [ 'a=b', '---c=d' ] }, unnamedValues: [] }

print('--a=1 -- --c=d -e f')
// {
//   args: { '--a': [ '1' ], '--': [ '--c=d', '-e', 'f' ] },
//   unnamedValues: []
// }
```

> Note: The string that starts with `"--"` or `"-"` will be treated as option name (not including the string that starts with `"---"`).

## License

[MIT](https://github.com/john-yuan/resolve-cli-args/blob/main/LICENSE)
