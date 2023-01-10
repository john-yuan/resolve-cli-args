export interface ResolvedCliArgs {
  /**
   * An object contains the argument and its value (including the unknown arguments).
   */
  args: Record<string, string[] | undefined>

  /**
   * A list of values that do not have a option name. For example, given
   * the following arguments:
   *
   * ```json
   * ["style.css", "style.min.css", "--compress"]
   * ```
   *
   * `style.css` and `style.min.css` will be put into `unnamedValues`.
   */
  unnamedValues: string[]
}

/**
 * Resolve cli arguments
 *
 * @param argv The argument list to resolve
 * @returns Resolved cli arguments
 */
export const resolveCliArgs = (argv: string[]): ResolvedCliArgs => {
  const args: Record<string, string[] | undefined> = {}
  const unnamedValues: string[] = []
  const list = [...argv]

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

  const isOption = (value?: string): value is string => {
    if (typeof value === 'string') {
      if (value.startsWith('--')) {
        return value.charAt(2) !== '-'
      }
      return value.startsWith('-')
    }
    return false
  }

  while (list.length > 0) {
    const option = list.shift()

    if (isOption(option)) {
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
    } else if (option) {
      unnamedValues.push(option)
    }
  }

  return { args, unnamedValues }
}
