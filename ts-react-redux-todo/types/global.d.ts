declare module '*.css' {
  const styles: any
  export = styles
}

declare const module: any
declare const require: any

declare interface NodeModule {
  hot: {
    accept(path?: () => void, callback?: () => void): void
  }
}

type omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
