// 糟糕的代码
var Flock = function(n) {
  this.seagulls = n;
};

Flock.prototype.conjoin = function(other) {
  this.seagulls += other.seagulls;
  return this;
};

Flock.prototype.breed = function(other) {
  this.seagulls = this.seagulls * other.seagulls;
  return this;
};

var flock_a = new Flock(4);
var flock_b = new Flock(2);
var flock_c = new Flock(0);

var result = flock_a.conjoin(flock_c).breed(flock_b).conjoin(flock_a.breed(flock_b)).seagulls;

console.log(result) // 32 错误的答案

// 函数式的写法

var conjoin = function(flock_x, flock_y) { return flock_x + flock_y }
var breed = function(flock_x, flock_y) { return flock_x * flock_y }

var flock_a = 4
var flock_b = 2
var flock_c = 0

var result = conjoin(
  breed(flock_b, conjoin(flock_a, flock_c)), 
  breed(flock_a, flock_b)
)
console.log(result) // 16

// 重命名参数
var add = function(x, y) { return x + y }
var mutiply = function(x, y) { return x * y }

var flock_a = 4
var flock_b = 2
var flock_c = 0

var result = add(
  mutiply(flock_b, add(flock_a, flock_c)),
  mutiply(flock_a, flock_b)
)
console.log(result) // 16

var x = 1
var y = 2
var z = 3

// 结合律
console.log(add(add(x, y), z) == add(x, add(y, z))) // true

// 交换律
console.log(add(x, y) == add(y, x)) // true

// 同一律
console.log(add(x, 0) == x) // true

// 分配律
console.log(mutiply(x, add(y, z)) == add(mutiply(x, y), mutiply(x, z))) // true