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

/**
 * Resolve cli arguments
 *
 * @param argv The argument list to resolve
 * @returns Resolved cli arguments
 */
export function resolveCliArgs(argv: string[]): ResolvedCliArgs {
  const args: Record<string, string[] | undefined> = {}
  const unnamedValues: string[] = []
  const list = argv.slice(0)

  const setArg = (name: string, value?: string) => {
    let values = args[name]

    if (!values) {
      values = []
      args[name] = values
    }

    if (value) {
      values.push(value)
    }
  }

  const isOption = (value: string): value is string => {
    if (value.startsWith('--')) {
      return value.charAt(2) !== '-'
    }
    return value.startsWith('-')
  }

  while (list.length > 0) {
    const option = list.shift()

    if (option) {
      if (option === '--') {
        args['--'] = list
        break
      } else if (isOption(option)) {
        if (option.includes('=')) {
          const [name, ...values] = option.split('=')
          setArg(name, values.join('='))
        } else {
          const value = list.shift()

          if (value) {
            if (isOption(value)) {
              list.unshift(value)
              setArg(option)
            } else {
              setArg(option, value)
            }
          } else {
            setArg(option)
          }
        }
      } else {
        unnamedValues.push(option)
      }
    }
  }

  return { args, unnamedValues }
}
