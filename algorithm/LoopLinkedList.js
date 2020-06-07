
function LoopLinkedList() {

  var Node = function(element) {
    this.element = element
    this.next = null
  }

  var length = 0
  var head = null
  var tail = null

  // 链表尾部添加元素
  this.append = function(element) {
    var node = new Node(element)
    var current

    if(!head) {
      head = node
      tail = node
      head.next = null
      tail.next = null
    } else {
      tail.next = node
      node.next = head
    }
    length++
  }

  this.insert = function(position, element) {
    if(position > -1 && position < length) {
      var node = new Node(element),
          current = head
          previous,
          index = 0
      if(position === 0) {
        current = node.next
        tail.next = node
      } else {
        while(index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      length++
      return true
    } else {
      return false
    }
  }

  // 链表中删除元素
  this.removeAt = function(position) {
    // 检查越界

  }

  // 删除元素，参数为要删除的元素
  this.remove = function(element) {
    var index = this.indexOf(element)
    return this.removeAt(index)
  }

  // 查找元素下标
  this.indexOf = function(element) {
    var current = head,
        index = 0

    while(current) {
      if(current.element === element) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }
  // 第一个元素
  this.head = function() {
    return head
  }
  // 最后一个元素
  this.tail = function() {
    return tail
  }
  // 是否为空
  this.isEmpty = function() {
    return length === 0
  }
  // 链表长度
  this.size = function() {
    return length
  }
  // toString
  this.toString = function() {
    var current = head,
        string = ''

    while(current) {
      string += current.element
      current = current.next
    }
    return string
  }
  // 打印链表
  this.print = function() {
    console.log(this.toString())
  }
}

var loopLink = new LoopLinkedList()
loopLink.append(5)
loopLink.append(4)


console.log(loopLink.toString())
