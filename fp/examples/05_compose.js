const R = require('ramda')

const compose = (f, g) => (...args) => g(f(...args))
const toUpperCase = x => x.toUpperCase()
const toLowerCase = x => x.toLowerCase()
const exclaim = x => x + '!'
const reduce = R.curry(function(f, x, xs) {
  return xs.reduce(f, x)
})
const head = x => x[0]
const reverse = () => reduce((acc, val) => {
  return [val].concat(acc)  
}, [])
const last = compose(head, reverse)

const shout = compose(exclaim, toUpperCase)

let res = shout('send in the clowns')

res = last(['jumpkick', 'roundhouse', 'uppercut'])
// 'uppercut'

console.log(res)
let lastUpper = compose(toUpperCase, head, reverse)
let loudLastUpper = compose(exclaim, toUpperCase, head, reverse)

// or
let last = compose(head, reverse)
let loudLastUpper = compose(exclaim, toUpperCase, last)

// or
let last = compose(head, reverse)
let angry = compose(exclaim, toUpperCase)
let loudLastUpper = compose(angry, last)