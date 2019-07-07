export function omit<T extends object, K extends keyof T>(target: T, ...names: K[]): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce(
    (res, key) => {
      if (!names.includes(key)) {
        res[key] = target[key]
      }
      return res
    },
    {} as any
  )
}
