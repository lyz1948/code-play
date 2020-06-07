// 环形链表

// 是否是环形链表
function hasCycle(head) {
  // 只要结点存在
  while (head) {
    // 如果已经立过 flag，说明是环形
    if (head.flag) {
      return true
    } else {
      // 如果 flag 没有立过，就立一个 flag 再往下走
      head.flag = true
      head = head.next
    }
  }
  return false
}
