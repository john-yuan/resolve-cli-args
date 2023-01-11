import { resolveCliArgs } from './index'

it('should put unnamed values into `unnamedValues`', () => {
  expect(
    resolveCliArgs(['--config', 'config.json', 'input.txt', 'output.txt'])
  ).toEqual({
    args: { '--config': ['config.json'] },
    unnamedValues: ['input.txt', 'output.txt']
  })
})

it('should resolve the value with "=" or <space>', () => {
  expect(resolveCliArgs(['--log-level=2', '--type', 'typescript'])).toEqual({
    args: { '--log-level': ['2'], '--type': ['typescript'] },
    unnamedValues: []
  })
})

it('should resolve the option with no value to empty array', () => {
  expect(resolveCliArgs(['--compress', '-q'])).toEqual({
    args: { '--compress': [], '-q': [] },
    unnamedValues: []
  })
})

it('should resolve all unnamed values correctly', () => {
  expect(
    resolveCliArgs(['--a', '1', 'a', '--b', '2', 'b', '--c=3', 'c'])
  ).toEqual({
    args: { '--a': ['1'], '--b': ['2'], '--c': ['3'] },
    unnamedValues: ['a', 'b', 'c']
  })
})

it('should resolve multiple options', () => {
  expect(
    resolveCliArgs(['--ext=.js', '--ext=.ts', '--ext', '.jsx', '--ext', '.tsx'])
  ).toEqual({
    args: { '--ext': ['.js', '.ts', '.jsx', '.tsx'] },
    unnamedValues: []
  })
})

it('should handle the values containing `---` or `=` correctly', () => {
  expect(resolveCliArgs(['--var=a=b', '--var', '---c=d'])).toEqual({
    args: { '--var': ['a=b', '---c=d'] },
    unnamedValues: []
  })
})
