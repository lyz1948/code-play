class ArrayList {
  constructor() {
    this.array = []
  }

  insert(item) {
    this.array.push(item)
  }

  toString() {
    return this.array.join('')
  }

  swap (index1, index2) {
    let aux = this.array[index1]
    this.array[index1] = this.array[index2]
    this.array[index2] = aux
  }

  bubbleSort() {
    const len = this.array.length
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (this.array[j] > this.array[j + 1]) {
          this.swap(j, j + 1)
        }
      }
    }
  }
  midifiedBubbleSort() {
    const len = this.array.length
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        this.swap(j, j + 1)
      }
    }
  }
  // select sort
  selectionSort() {
    const len = this.array.length
    let minIndex
    for (let i = 0; i < len - 1; i++) {
      minIndex = i
      // find min values
      for (let j = i; j < len - 1; j++) {
        if (this.array[minIndex] > j) {
          minIndex = j
        }
      }
      if (i !== minIndex) {
        this.swap(i, minIndex)
      }
    }
  }

  // insert sort
  insertionSort() {
    const len = this.array.length
    let j
    let temp
    for (let i = 1; i < len; i++) {
      j = i
      temp = this.array[i]
      while (j > 0 && this.array[j - 1] > temp) {
        this.array[j] = this.array[j - 1]
        j--
      }
      this.array[j] = temp
    }
  }


  // merge sort
  mergeSort() {
    const merge = (left, right) => {
      const res = []
      let l = 0
      let r = 0
      while (l < left.length && r < right.length) {
        if (left[l] < right[r]) {
          res.push(left[l++])
        } else {
          res.push(right[r++])
        }
      }
      while (l < left.length) {
        res.push(left[l++])
      }
      while (r < right.length) {
        res.push(right[r++])
      }
      return res
    }
    const mergeSortRes = arr => {
      const len = arr.length
      if (len == 1) {
        return arr
      }
      let mid = len / 2
      let left = arr.slice(0, mid)
      let right = arr.slice(mid, len)
      return merge(mergeSortRes(left), mergeSortRes(right))
    }
    mergeSortRes(this.array)
  }

  quickSort() {
    const swapQuickSort = (array, index1, index2) => {
      const aux = array[index1]
      array[index1] = array[index2]
      array[index2] = aux 
    }
    const partion = (arr, left, right) => {
      let piovt = arr[Math.floor((left + right) / 2)]
      let i = left
      let j = right
      while (i <= j) {
        while (arr[i] < piovt) {
          i++
        }
        while (arr[j] > piovt) {
          j--
        }
        if (i <= j) {
          swapQuickSort(arr, i, j)
          i++
          j--
        }
      }
      return i
    }
    const quick = (arr, left, right) => {
      let index
      if (arr.length > 1) {
        index = partion(arr, left, right)
        if (left < index - 1) {
          quick(arr, left, index - 1)
        }
        if (index < right) {
          quick(arr, index, right)
        }
      }
    }
    quick(this.array, 0, this.array.length - 1)
  }

  sequentionSearch(item) {
    for(let i = 0; i < this.array.length; i++) {
      let it = this.array[i]
      if(it === item) {
        return i
      }
    }
    return -1
  }

  binarySearch(item) {
    this.quickSort()
    let low = 0
    let high = this.array.length
    let mid
    let element 
    while(low <= high) {
      mid = Math.floor((low + high) / 2)
      element = this.array[mid]
      if(element < item) {
        low = mid + 1
      } else if(element > item) {
        high = mid - 1
      } else {
        return mid 
      }
    }
    return - 1
  }
}

const createNodeSortedArray = (size) => {
  var arr = new ArrayList()
  for (let i = size; i > 0; i--) {
    arr.insert(i)
  }
  return arr
}

const arr = createNodeSortedArray(9)
console.log(arr.toString())
// arr.bubbleSort() // 0.4s
// arr.midifiedBubbleSort() // 0.3s
// arr.selectionSort() // 0.3s
// arr.insertionSort() // 0.3s
// arr.mergeSort() // 0.1s
// arr.quickSort() // 0.1s
const res = arr.binarySearch(5) // 0.1s
console.log(arr.toString())
console.log(res)