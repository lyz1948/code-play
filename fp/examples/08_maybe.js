const R = require('ramda')

const match = R.curry((what, str) => {
  return str.match(what)
})

var Maybe = function(x) {
  this.__value = x
}

Maybe.of = function(x) {
  return new Maybe(x)
}

Maybe.prototype.isNonthing = function() {
  return (this.__value === null || this.__value === undefined)
}

Maybe.prototype.map = function(f) {
  return this.isNonthing() ? Maybe.of(null) : Maybe.of(f(this.__value))
}

let res 
res = Maybe.of('Hahahah').map(match(/a/ig))

res = Maybe.of(null).map(match(/a/ig))

res = Maybe.of({name: 'Marry'}).map(R.prop('age')).map(R.add(10))

res = Maybe.of({name: 'Dinah', age: 14 }).map(R.prop('age')).map(R.add(10))

console.log(res)