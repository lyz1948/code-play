interface Person {
  name: string
  age: number
}

// interface PersonPartial {
//   name?: string
//   age?: number
// }

interface PersonReadonly {
  readonly name: string
  readonly age?: number
}

type TReadonly<T> = { readonly [P in keyof T]: T[P] }

type TPartial<T> = { [P in keyof T]?: T[P] }

type ReadonlyPerson = TReadonly<Person>
type PersonPartial = TPartial<Person>
// type myPartial = Partial<Person>

type Keys = 'opts1' | 'opts2'
type Flags = { [K in Keys]: boolean }
// 等同于下面
// type Flags = {
//   opts1: boolean;
//   opts2: boolean;
// }

type NullablePerson = { [P in keyof Person]: Person[P] | null }
type PartialPerson = { [P in keyof Person]?: Person[P] }

type Nullable<T> = { [P in keyof T]: T[P] }
// type Partial<T> = { [ P in keyof T]?: T[P] }

type Proxy<T> = {
  get(): T
  set(value: T): void
}

type Proxyify<T> = {
  [P in keyof T]: Proxy<T[P]>
}

function proxyify<T>(o: T): Proxyify<T> {
  // wrap proxies
}

interface IProxy {
  port: number
  host: string
}

let proxyProps = proxyify(<IProxy>{port: 300, host: 'localhost'})

function unproxy<T>(t: Proxyify<T>): T {
  let result = {} as T
  for (let k in t) {
    result[k] = t[k].get()
  }
  return result
}

type T00 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'd' | 'e'>

// Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
// Extract<T, U> -- 提取T中可以赋值给U的类型。
// NonNullable<T> -- 从T中剔除null和undefined。
// ReturnType<T> -- 获取函数返回值类型。
// InstanceType<T> -- 获取构造函数类型的实例类型。