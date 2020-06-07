const root = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D',
    },
    right: {
      val: 'E',
    },
  },
  right: {
    val: 'C',
    right: {
      val: 'F',
    },
  },
}

function preOrderTraverse(root) {
  if (!root) {
    return
  }

  console.log('current node is: ' + root.val)
  preOrderTraverse(root.left)
  preOrderTraverse(root.right)
}

preOrderTraverse(root)
// current node is: A
// current node is: B
// current node is: D
// current node is: E
// current node is: C
// current node is: F
