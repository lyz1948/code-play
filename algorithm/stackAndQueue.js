// 有效括号问题

const leftToRight = {
  '{': '}',
  '[': ']',
  '(': ')',
}

function isValid(str) {
  // 根据题意 如果的空字符串 返回 true
  if (!str) return true

  let stack = []
  let len = str.length

  for (let i = 0; i < len; i++) {
    let ch = str[i]
    // 判断是否左括号
    if (ch === '{' || ch === '[' || ch === '(') stack.push(leftToRight[ch])
    else {
      // 如果 stack 是空的话，说明没有匹配
      if (!stack.length || stack.pop() !== ch) {
        return false
      }
    }
  }
  // 如果 stack 是空栈，说明所有括号逗匹配成功了
  return !stack.length
}

console.log('=========有效括号=========')
console.log(isValid('{[()]}'))
console.log(isValid('{[))}]'))

// 每日温度问题

function dailyTemperatures(arr) {
  let len = arr.length
  let stack = []
  let res = Array.from(arr).fill(0)
  console.log(res)
  for (let i = 0; i < len; i++) {
    while (stack.length && arr[i] > arr[stack.length - 1]) {
      let top = stack.pop()
      res[top] = i - top
    }

    stack.push(i)
  }

  return res
}

console.log('=========每日温度递增=========')
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))

// 最小栈问题

function MinStack() {
  let items = []
  let items2 = []

  this.push = function (val) {
    items.push(val)
    // 如果当前push值进来的值比之前的小，就添加的 items2
    if (!items2.length || items2[items2.length - 1] >= val) {
      items2.push(val)
    }
  }

  this.pop = function () {
    // 出栈的时候也要检查是否是最小的值，同步更新items2

    const it = items.pop()
    if (it === items2[items2.length - 1]) {
      items2[items2.length - 1].pop()
    }
    return it
  }

  this.top = function () {
    if (!items.length) return null
    return items[items.length - 1]
  }

  // 循环数组，获取最小值，时间复杂度 O(n)
  // this.getMin = function () {
  //   let minVal = Infinity
  //   for (let i = 0; i < items.length; i++) {
  //     if (items[i] < minVal) {
  //       minVal = items[i]
  //     }
  //   }
  //   return minVal
  // }

  // 优化后的最小值获取方式
  this.getMin = function () {
    return items2[items2.length - 1]
  }
}
console.log('========min stack=======')
let s = new MinStack()
s.push(2)
s.push(3)
s.push(4)
s.push(5)
s.pop()
console.log(s.top())
console.log(s.getMin())

// 如何用栈实现队列

function MyQueue() {
  let items1 = []
  let items2 = []

  this.push = function (v) {
    items1.push(v)
  }

  this.pop = function () {
    if (!items2.length) {
      while (items1.length) {
        items2.push(items1.pop())
      }
    }
    return items2.pop()
  }

  this.peek = function () {
    if (!items2.length) {
      while (items1.length) {
        items2.push(items1.pop())
      }
    }
    const len = items2.length
    return len && items2[len - 1]
  }

  this.isEmpty = function () {
    return !items2.length && !items1.length
  }
}

console.log('=========my queue=========')
let q = new MyQueue()

q.push(1)
q.push(2)
q.push(3)

console.log(q.pop())
console.log(q.pop())
console.log(q.isEmpty())
console.log(q.pop())

// 双端队列问题

function maxSliderWindow(arr, nums) {
  if (!arr || !arr.length) return

  let res = []
  let len = arr.length
  let left = 0
  let right = nums - 1

  const getMax = (left, right) => {
    let maxVal = arr[left]
    for (let i = left; i <= right; i++) {
      if (arr[i] > maxVal) {
        maxVal = arr[i]
      }
    }
    return maxVal
  }

  while (right < len) {
    res.push(getMax(left, right))
    left++
    right++
  }

  return res
}

console.log('========滑动窗口=========')

console.log(maxSliderWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))

// 双端队列法
function maxSliderWindow2(nums, k) {
  const len = nums.length
  const res = []
  // 初始化双端队列
  const deque = []
  // 开始遍历数组
  for (let i = 0; i < len; i++) {
    // 比较前后2值的大小，保存大值
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop()
    }
    deque.push(i)

    // 当队头元素的索引已经被排除在滑动窗口之外时
    while (deque.length && deque[0] <= i - k) {
      // 将头元素出队
      deque.shift()
    }

    // 判断滑动窗口的状态，只有在被遍历的元素个数大于 k 的时候，才更新结果数组
    if (i >= k - 1) {
      res.push(nums[deque[0]])
    }
  }
  return res
}

let res = maxSliderWindow2([1, 3, -1, -3, 5, 3, 6], 3)
console.log('双端队列', res)
