const R = require('ramda')

export const match = R.curry((what, str) => {
  return str.match(what)
})

export const replace = R.curry(function(what, replacement, str) {
  return str.replace(what, replacement)
})

export const filter = R.curry(function(f, arr) {
  return arr.filter(f)
})

var map = R.curry(function(f, arr) {
  return arr.map(f)
})

var res = match(/\s+/g, 'hello world')
// [ ' ' ]
var res = match(/\s+/g, 'hello World')
// [ ' ' ]

var hasSpace = match(/\s+/g)
var res = hasSpace('hello world')
// [ ' ' ]

var res = filter(hasSpace, ['my_name', 'my name is tony'])
// [ 'my name is tony' ]
console.log(res)