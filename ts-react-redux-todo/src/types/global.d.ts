declare module '*.css' {
  const styles: any
  export = styles
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T>>
type PartialPick<T, extends keyof T> = Partial<T> & Pick<T, K>
