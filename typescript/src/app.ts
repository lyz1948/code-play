require('../examples/index.type')
require('../examples/namespace')
require('../examples/enum')
require('../examples/mixins')

type Alias = { num: number }
interface Interface {
  num: number
}

declare function aliasd(args: Alias): Alias
declare function Interfaced(args: Interface): Interface

function Identity<T>(args: T) {}

interface GenericIdentity<T> {
  (args: T): T
}

let myGenIdentity: GenericIdentity<number>

interface Square {
  kind: 'square'
  size: number
}

interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}

interface Circle {
  kind: 'circel'
  radius: number
}

interface Trangle {
  kind: 'trangle'
  width: number
  height: number
}

type Share = Square | Rectangle | Circle | Trangle

function area(s: Share) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size
    case 'rectangle':
      return s.width * s.height
    case 'circel':
      return Math.PI * s.radius ** 2
  }
}

area({ kind: 'square', size: 20 })
console.log(area({ kind: 'trangle', width: 20, height: 30 }))
