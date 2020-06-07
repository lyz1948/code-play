// tslint:disable-next-line: array-type
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}

interface Person {
  name: string
  age: number
  job: string
}

const person: Person = {
  name: 'joe',
  age: 20,
  job: 'development',
}

let strings: string[] = pluck(person, ['job'])
let personProps: keyof Person;
console.log(strings)

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}

let named: string = getProperty(person, 'name')
let aged: number = getProperty(person, 'age')
// let unknow = getProperty(person, 'breed') // '"breed"' is not assignable to parameter of type '"job" | "name" | "age"'
