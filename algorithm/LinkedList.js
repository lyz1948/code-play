class Node {
	constructor(element) {
		this.element = element
		this.next = null 
	}
}

class LinkedList {
	constructor() {
		this.head = null 
		this.length = 0
	}

	// 追加元素
	append(element) {
		const node = new Node(element)
		let current = null 
		// 链表为空，第一次添加
		if(this.head === null) {
			this.head = node 
		} else {
			// 第二次添加
			current = this.head 
			// 当前元素后面还有元素
			while(current.next) {
				current = current.next 
			}
			// 将当前元素的下一个元素指向 => 后面添加的元素
			current.next = node 
		}
		this.length++ 
	}

	// 任意位置插入 position: 元素插入的位置  element: 插入的元素
	insert(position, element) {
		// 插入的位置必须不能小于0且不能大于元素的长度
		if (position >= 0 && position <= this.length) {
			const node = new Node(element)
			let current = this.head 
			let previous = null 
			let index = 0 

			if(position === 0) {
				this.head = node 
			} else {
				while(index++ < position) {
					previous = current 
					current = current.next 
				}
				// while循环跳出来的时候，current 是当前元素的下一个
				node.next = current
				// 上一个元素的next 指向 当前元素
				previous.next = node 
			}
			this.length++
			return true 
		}
		return false 
	}

	// 移除指定位置的元素
	removeAt(position) {
		if(position > -1 && position < this.length) {
			let current = this.head 
			let previous = null
			let index = 0 
			// 如果是第一个
			if(position === 0) {
				// 把第二个的作为第一个
				this.head = current.next 
			} else {
				while(index++ < position) {
					previous = current 
					current = current.next 
				}
				// 假设position = 3  previous= 2 current = 3 current.next = 4 
				// 2 => 4
				previous.next = current.next 
			}
			this.length--
			return current.element 
		}
		return null 
	}
	// 查找元素的下标
	findIndex(element) {
		let current = this.head 
		let index = -1 
		while(current) {
			if(element === current.element) {
				return index + 1
			}
			index++
			current = current.next 
		}
		return -1
	}
	// 删除指定元素
	remove(element) {
		const index = this.findIndex(element)

		return this.removeAt(index)
	}

	get isEmpty() {
		return !this.length 
	}
 	
 	size () {
 		return this.length 
 	}

 	toString() {
 		let current = this.head 
 		let string = '' 
 		while(current) {
 			string += ` ${current.element}`
 			current = current.next
 		}
 		return string 
 	}
}

module.exports = LinkedList


// Use LinkedList 
const linkedList = new LinkedList()
console.log(linkedList)
linkedList.append(5)
linkedList.append(8)
linkedList.append(125)
linkedList.append(138)
linkedList.insert(3, 38)
console.log(linkedList)
// linkedList.remove(125)
console.log(linkedList.toString())
console.log(linkedList.isEmpty())