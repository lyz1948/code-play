class Stack {
	constructor() {
		this.items = []
	}

	// 入栈
	push (element) {
		this.items.push(element)
	}

	// 出栈
	pop() {
		return this.items.pop()
	}

	get size() {
		return this.items.length
	}

	get tail() {
		return this.items[this.items.length - 1]
	}

	get isEmpty() {
		return !this.items.length
	}
	// 清空
	clear() {
		this.items = []
	}

	print() {
		console.log(this.items.toString())
	}
}

module.exports = Stack
// Use Stack 
const stack = new Stack()
console.log(stack.isEmpty)
stack.push(5)
stack.push(6)
stack.push(7)
console.log(stack.size)
stack.pop()
stack.pop()
console.log(`now size ${stack.size}`)
console.log(`last item ${stack.tail}`)
stack.print()