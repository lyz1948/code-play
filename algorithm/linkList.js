var LinkedList = function () {
  var Node = function (element) {
    this.element = element
    this.next = null
  }

  var length = 0
  var head = null

  this.append = function (element) {
    var node = new Node(element)
    var current

    if (head === null) {
      head = node
    } else {
      current = head
      // 找到链表最后一项
      while (current.next) {
        current = current.next
      }
      // 将新插入的值作为当前节点的下一个节点
      current.next = node
    }
    // 更新链表长度
    length++
  }

  // 任意位置插入元素
  this.insert = function (position, element) {
    if (position >= 0 && position <= length) {
      var node = new Node(element)
      var current = head
      var previous
      var index = 0

      if (position === 0) {
        node.next = current
        head = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      length++
      return true
    }

    return false
  }

  this.remove = function (element) {}

  // 移除元素
  this.removeAt = function (position) {
    // 检查越界
    if (position > -1 && position < length) {
      var current = head
      var previous
      var index = 0

      // 删除头部，指针移到下一个元素
      if (position === 0) {
        head = current.next
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
      }

      length--

      return current.element
    }
    return null
  }

  this.indexOf = function (element) {}
  this.isEmpty = function () {}
  this.size = function () {}

  this.toString = function () {
    var current = head
    var string = ''
    while (current) {
      string += current.element
      current = current.next
    }
    return string
  }

  this.print = function () {}

  // 删除链表重复元素
  this.removeDuplicates = function () {
    var current = head

    while (current != null && current.next != null) {
      if (current.element === current.next.element) {
        current.next = current.next.next
      } else {
        current = current.next
      }
    }
    return head
  }

  // 合并链表
  this.mergeTwoLists = function (l1, l2) {
    let head = new Node()
    let cur = head

    while (l1 && l2) {
      if (l1.element < l2.element) {
        cur.next = l1
        l1 = l1.next
      } else {
        cur.next = l2
        l2 = l2.next
      }
      cur = cur.next
    }

    cur.next = l1 !== null ? l1 : l2

    head = head.next
  }

  // 删除相同节点（只保留一个）
  this.removeOneSame = function () {
    let cur = head
    while (cur != null && cur.next != null) {
      if (cur.element === cur.next.element) {
        cur.next = cur.next.next
      } else {
        cur = cur.next
      }
    }
    return head
  }

  // 删除多个重复节点
  this.removeAllSame = function () {
    let dummy = new Node()
    dummy.next = head
    let cur = dummy

    // 因为当前节点是新建的空节点，所以后面必须有2个以上节点
    while (cur.next && cur.next.next) {
      // 如果2个节点的值相等的话
      if (cur.next.element === cur.next.next.element) {
        // 记录当前的值
        let val = cur.next.element
        // 判断是否有多个相等的值
        while (cur.next && cur.next.next.element === val) {
          cur.next = cur.next.next
        }
      } else {
        // 正常的遍历
        cur = cur.next
      }
    }

    return dummy.next
  }

  // 快慢指针，从链表的倒数第n个元素
  this.removeNthFromEnd = function (n) {
    let dummy = new Node()
    dummy.next = head
    let fast = dummy
    let slow = dummy

    while (n != 0) {
      fast = fast.next
      n--
    }

    while (fast.next) {
      fast = fast.next
      slow = slow.next
    }

    slow.next = slow.next.next

    return dummy.next
  }

  // 链表反转（多指针）
  this.reverseLinkList = function () {
    let prev = null
    let cur = head

    while (cur !== null) {
      // 记录下一个节点
      let next = cur.next
      // 反转 next 元素
      cur.next = prev
      // prev 元素指针向前移动一步
      prev = cur
      // cur 元素指针向前移动一步
      cur = next
    }
    return prev
  }

  // 局部反转一个列表
  this.reverseBetween = function (m, n) {
    let pre, cur, leftHead

    const dummy = new Node()
    dummy.next = head
    // 游标
    let p = dummy

    // 游标往前走 m-1 步，走到整个区间第前驱结点处
    for (let i = 0; i < m - 1; i++) {
      p = p.next
    }

    // 记录前驱结点
    leftHead = p

    let start = leftHead.next

    pre = start

    cur = pre.next

    // 开始反转动作
    for (let i = m; i < n; i++) {
      let next = cur.next
      cur.next = pre
      pre = cur
      cur = next
    }

    // leftHead 的后续结点此时为反转后区间的第一个结点
    leftHead.next = pre

    // 将区间反转后的最后一个结点
    start.next = cur

    return dummy.next
  }
}

var l1 = new LinkedList()

l1.append(1)
l1.append(2)
l1.append(4)
console.log(l1.toString())

var l2 = new LinkedList()

l2.append(1)
l2.append(3)
l2.append(4)
l2.append(4)
console.log(l2.toString())
l2.removeDuplicates()
console.log(l2.toString())
