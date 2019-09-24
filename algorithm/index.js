function ArrayList() {
  let array = []

  this.insert = function(item) {
    array.push(item)
  }

  this.toString = function() {
    return array.join()
  }

  this.bubbleSort = function() {
    let len = array.length

    for(let i = 0; i < len; i++) {
      for(let j = 0; j < len-1; j++) {
        if(array[j] > array[j+1]) {
          swap(j, j+1)
        }
      }
    }
  }

  const swap = function(index1, index2) {
    let aux = array[index1]
    array[index1] = array[index2]
    array[index2] = aux
  }
}

const createArrayNode = function(num) {
  let arr = new ArrayList()
  for(let i = num; i > 0; i--) {
    arr.insert(i)
  }
  return arr
}

let arr = createArrayNode(8)
console.log(arr.toString())
arr.bubbleSort()
console.log(arr.toString())
