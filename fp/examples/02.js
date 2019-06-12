const hi = name => `Hi ${name}`
// const greeting = name => hi(name)
const greeting = hi

console.log(hi)
console.log(hi('jonas'))
console.log(greeting('times'))

// 垃圾代码
// const getServerStuff = cb => ajaxCall(json => cb(json))

// good
const getServerStuff = ajaxCall

// 只对当前项目
const validArticles = articles =>
  articles.filter(article => article !== null && article !== undefined)

// 更友好的命名
const compact = xs => xs.filter(x => x !== null && x !== undefined)

// 小心`this`

var fs = require('fs')

// 不同环境可能就出问题了
fs.readFile('test.txt', Db.save)

// 更好的方式
fs.readFile('test.txt', Db.save.bind(Db))