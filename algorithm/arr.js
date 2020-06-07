// 求2数之和
// 示例: 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]

function sum(arr, target) {
  let diff = {}

  for (let i = 0; i < arr.length; i++) {
    if (diff[target - arr[i]] !== undefined) {
      return [diff[target - arr[i]], i]
    }
    diff[arr[i]] = i
  }
}

console.log(sum([2, 7, 11, 14], 9)) // [ 0, 1 ]

// 双指针法
function merge(arr1, n, arr2, m) {
  let i = n - 1
  let j = m - 1
  let k = n + m - 1

  while (i >= 0 && j >= 0) {
    if (arr1[i] >= arr2[j]) {
      arr1[k] = arr1[i]
      i++
      k--
    } else {
      arr[k] = arr2[j]
      j--
      k--
    }
  }

  while (j >= 0) {
    arr1[k] = arr2[j]
    j--
    k--
  }
}

// 三数求和
function threeSum(arr) {
  let res = []
  arr = arr.sort((a, b) => a - b)

  const len = arr.length
  for (let i = 0; i < len - 2; i++) {
    let j = i + 1
    let k = len - 1

    if (i > 0 && arr[i] === arr[i - 1]) {
      continue
    }

    while (j < k) {
      if (arr[i] + arr[j] + arr[k] < 0) {
        j++
        while (j < k && arr[j] === arr[j - 1]) {
          j++
        }
      } else if (arr[i] + arr[j] + arr[k] > 0) {
        k--
        while (j < k && arr[k] === arr[k + 1]) {
          k--
        }
      } else {
        res.push([arr[i], arr[j], arr[k]])
        j++
        k--
        while (j < k && arr[j] === arr[j - 1]) {
          j++
        }

        while (j < k && arr[k] === arr[k + 1]) {
          k--
        }
      }
    }
  }
  return res
}

console.log(threeSum([-1, 0, 1, 2, -1, -4])) // [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]
