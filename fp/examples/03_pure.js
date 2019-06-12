var xs = [1, 2, 3, 4, 5]

// 纯函数
xs.slice(0, 3) // [1, 2, 3]
xs.slice(0, 3) // [1, 2, 3]
xs.slice(0, 3) // [1, 2, 3]

// 不纯的
xs.splice(0, 3) // [1, 2, 3]
xs.splice(0, 3) // [4, 5]
xs.splice(0, 3) // []

// 不纯的
var minimum = 10
var checkAge = function(age) {
  return age > minimum
}

// 纯净的
var checkAge = function(age) {
  var minimum = 10
  return age > minimum
}

// 可缓存性

var memoize = function(f) {
  var cache = {}
  return function() {
    var arg_str = JSON.stringify(arguments)
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments)
    return cache[arg_str]
  }
}

var square = x => x * x
var squareNumber = memoize(square)

var res = squareNumber(3)

// 从缓存读取
var res = squareNumber(3)
console.log(res)

var pureHttpCall = memoize(function(url, params) {
  return function() {
    return $.getJSON(url, params)
  }
})

// 不纯的
var signUp = function(attrs) {
  var user = saveUser(attrs)
  welcomeUser(user)
}

var saveUser = function(attrs) {
  var user = Db.save(attrs)
}

var welcomeUser = function(user) {
  Email(user)
}

// 纯的
var signUp = function(Db, Email, attrs) {
  return function() {
    var user = saveUser(Db, attrs)
    welcomeUser(Email, user)
  }
}

var saveUser = function(Db, attrs) {}
var welcomeUser = function(Email, user) {}