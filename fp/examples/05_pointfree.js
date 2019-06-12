// 非pointfree

let snakeCase = word => word.toLowerCase().replace(/\s+/ig, '_')

// pointfree
let snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase)

// no pointfree
var initials = name => name.split(' ').map(compose(toUpperCase, head)).join('. ')

// pointfree
var initials = compose(join('. '), map(compose(toUpperCase, head)), split(' '))

// debug
const trace = curry(function(tag, x) {
  console.log(tag, x)
  return x
})

const isLastInStock = compose(head, map(reverse))
const getLastProp = compose(prop('in_stock'), isLastInStock)
getLastProp(CARS)