var add = function(x) {
  return function(y) {
    return x + y
  }
}

var increment = add(1)
var addTen = add(10)

console.log(increment(1))
console.log(addTen(2))
console.log(addTen(3))

const R = require('ramda')

const match = R.curry((what, str) => {
  return str.match(what)
})

const replace = R.curry(function(what, replacement, str) {
  return str.replace(what, replacement)
})

const filter = R.curry(function(f, arr) {
  return arr.filter(f)
})

const map = R.curry(function(f, arr) {
  return arr.map(f)
})

const split = R.curry(function(str, match) {
  return str.split(match)
})

var res = match(/\s+/g, 'hello world')
// [ ' ' ]
var res = match(/\s+/g, 'hello World')
// [ ' ' ]

var hasSpaces = match(/\s+/g)
var res = hasSpaces('hello world')
// [ ' ' ]

var res = filter(hasSpaces, ['my_name', 'my name is tony'])
// [ 'my name is tony' ]

var findSpaces = filter(hasSpaces)
var res = findSpaces(['my_name', 'my name is tony'])

// 将3个参数分开来传递，这样更灵活
var noVowels = replace(/[aeiou]/ig) // what

var censored = noVowels('*') // replacement

var res = censored('Chocolate Rain') // str

// 练习1
var words = split(' ')
console.log(words('hello world'))

// 练习2
var myMatch = match(/q/i)
var filterMatch = filter(myMatch)
var myFilter = filterMatch(['quott', 'query', 'abc'])
console.log(myFilter)