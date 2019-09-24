class Node {
	constructor(element) {
		this.element = element 
		this.prev = null 
		this.next = null 
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null 
		this.tail = null 
		this.length = 0
	}
	// 头部插入
	insert(position, element) {
		if(position >= 0 && position <= this.length) {
			const node = new Node(element)
			let current = this.head 
			let index = 0 
			// 在链表第一个元素位置前插入
			if(position === 0) {
				// 链表为空
				if(!head) { 
					this.head = node 
					this.tail = node 
				} else {
					// 链表有值
					node.next = current 
					this.head = node 
					current.prev = node 
				}
			} 
			// 尾部插入
			else if (position === this.length) {
				current = this.tail  // 指针指向最后一个元素
				current.next = node  // 当前元素的下一个元素为新插入的元
				node.prev = current  // 当前元素设置为新插入元素的上一个元素
				this.tail = node  // 设置新插入的元素为最后一个元素
			// 非头部与尾部
			} else {
				while(index++ < position) {
					previous = current 
					current = current.next 
				}
				node.next = current 
				previous.next = node 
				current.prev = noe 
				node.prev = previous 
			}
			this.length++ 
			return true
		} else {
			return false 
		}
	}

	remove(position) {
		if(position > -1 && position < this.length) {
			let current = this.head 
			let previous = null 
			let index = 0

			// 头部
			if(position === 0) {
				this.head = this.head.next 
				this.head.prev = null 
				if(this.length === 1) {
					this.tail = null
				}
			} else if(position === this.length - 1) {
				this.tail = this.tail.prev 
				this.tail.next = null
			} else {
				while(index++ < position) {
					previous = current 
					current = current.next 
				}
				previous.next = current.next 
				current.next.prev = previous 
			}
			this.length--
			return current.element
		} else {
			return null
		}
	}

	isEmpty() {
		return !this.length 
	}

	size() {
		return this.length 
	}
}