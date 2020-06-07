// 反转字符串
const str = 'helloworld'
const res = str.split('').reverse().join('')
console.log(res)

// 判断回文
function isPalindrome(str) {
  const reverseStr = str.split('').reverse().join('')
  return str === reverseStr
}

console.log(isPalindrome('hello world')) // false
console.log(isPalindrome('abcba')) // true

// 根据对称性，将字符串从中间劈开
function isPalindrome(str) {
  let len = str.length

  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false
    }
  }
  return true
}

// 真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串
/**
 * 示例 1: 输入: "aba"
 * 输出: True
 * 示例 2:
 * 输入: "abca"
 * 输出: True
 * 解释: 你可以删除c字符。
 * 注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。
 */

function validatePalindrome(str) {
  let i = 0
  let j = str.length - 1

  // 往中间移动
  while (i < j && str[i] === str[j]) {
    i++
    j--
  }

  const isPalindrome = function (left, right) {
    while (left < right) {
      if (str[left] !== str[right]) {
        return false
      }
      left++
      right--
    }
    return true
  }

  if (isPalindrome(i + 1, j)) return true

  if (isPalindrome(i, j - 1)) return true

  return false
}

console.log(validatePalindrome('abcdecba'))
console.log(validatePalindrome('abb'))

// 字符串匹配问题
/**
 * 真题描述： 设计一个支持以下两种操作的数据结构：
 * void addWord(word)
 * bool search(word)
 * search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
 * . 可以表示任何一个字母
 */

/**
 * 示例: addWord("bad")
 * addWord("dad")
 * addWord("mad")
 * search("pad") -> false
 * search("bad") -> true
 * search(".ad") -> true
 * search("b..") -> true
 * 说明:
 * 你可以假设所有单词都是由小写字母 a-z 组成的。
 */

function WordDirection() {
  // 保存添加的字符串
  this.words = {}
}

WordDirection.prototype = {
  constructor: WordDirection,

  // 添加
  add: function (str) {
    if (this.words[str.length]) {
      this.words[str.length].push(str)
    } else {
      this.words[str.length] = [str]
    }
  },

  // 查找
  search: function (str) {
    // 先判断map对象中是否有字符串长度的数组
    if (!this.words[str.length]) {
      return false
    }

    // 普通字符串
    const len = str.length
    if (!str.includes('.')) {
      return this.words[len].includes(str)
    }

    const reg = new RegExp(str)

    return this.words[str.length].some((word) => reg.test(word))
  },
}

const wd = new WordDirection()
wd.add('abc')
wd.add('abb')
wd.add('abd')

console.log('是否包含字符串？abc', wd.search('abc'))
console.log('是否包含字符串？abf', wd.search('abf'))
console.log('是否包含字符串？a.d', wd.search('a.d'))
console.log('是否包含字符串？a..', wd.search('a..'))

function myAtoi(str) {
  str = str.trim()
  const reg = /\s*([-\+]?[0-9]*).*/
  const MAX_VAL = Math.pow(2, 31) - 1
  const MIN_VAL = -MAX_VAL - 1
  const groups = str.match(reg)
  let targetNum = 0

  // 如果匹配上了
  if (groups) {
    targetNum = +groups[1]
    if (isNaN(targetNum)) {
      return 0
    }
  }

  targetNum = Math.max(Math.min(MAX_VAL, targetNum), MIN_VAL)
  return targetNum
}
