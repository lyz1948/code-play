class Node {
	constructor(key) {
		this.key = key
		this.left = null
		this.right = null
	}
}

class BinarySearchTree {
	constructor() {
		this.root = null
	}
	// 插入节点
	insert(key) {
		const newNode = new Node(key)
		const insertNode = (node, newNode) => {
			if(newNode.key < node.key) {
				if(node.left === null) {
					node.left = newNode
				} else {
					insertNode(node.left, newNode)
				}
			} else {
				if(node.right === null) {
					node.right = newNode
				} else {
					insertNode(node.right, newNode)
				}
			}
		}
		if(!this.root) {
			this.root = newNode
		} else {
			insertNode(this.root, newNode)
		}
	}

	// 中序遍历
	inOrderTraverse(callback) {
		const inOrderTraverseNode = (node, callback) => {
			if(node !== null) {
				inOrderTraverseNode(node.left, callback)
				callback(node.key)
				inOrderTraverseNode(node.right, callback)
			}
		}
		inOrderTraverseNode(this.root, callback)
	}
	// 先序遍历
	preOrderTraverse(callback) {
		const preOrderTraverseNode = (node, callback) => {
			if(node !== null) {
				callback(node.key)
				preOrderTraverseNode(node.left, callback)
				preOrderTraverseNode(node.right, callback)
			}
		}
		preOrderTraverseNode(this.root, callback)
	}
	// 后序遍历
	postOrderTraverse(callback) {
		const postOrderTraverseNode = (node, callback) => {
			if(node !== null) {
				postOrderTraverseNode(node.left, callback)
				postOrderTraverseNode(node.right, callback)
				callback(node.key)
			}
		}
		postOrderTraverseNode(this.root, callback)
	}
	// min
	min(node) {
		const minNode = node => {
			return node ? (node.left ? minNode(node.left) : node) : null 
		}

		return minNode(node || this.root)
	}

	max(node) {
		const maxNode = node => {
			return node ? (node.right ? node.right : node) : null
		}
		return maxNode(node || this.root)
	}

	search(key) {
		const searchNode = (node, key) => {
			if(node === null) return false 
			if(node.key === key) return node 
			return searchNode((node.key < key) ? node.left : node.right, key)
		}
		searchNode(this.root, key)
	}
}

// Use 
const tree = new BinarySearchTree()
tree.insert(13)
tree.insert(9)
tree.insert(15)
tree.insert(12)
tree.insert(6)
tree.insert(3)
tree.insert(1)
tree.insert(17)
tree.insert(18)
tree.insert(22)
tree.insert(25)
tree.insert(23)
// 中序 从最小的值到最大值访问
tree.inOrderTraverse(value => { console.log(value) }) 
// 1 3 6 9 12 13 15 17 18 22 23 25

// 前序 先访问左节点 在访问右边节点
 tree.preOrderTraverse(value => { console.log(value) }) 
// 13 9 6 3 1 12 15 17 18 22 25 23

// 后序 后序遍历则是先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目录和它的子目录中所有文件所占空间的大小
tree.postOrderTraverse(value => { console.log(value) }) 
// 1,3 6 12 9 23 25 22 18 17 15 13