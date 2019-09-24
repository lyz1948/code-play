class Queue {
	constructor(items) {
		this.items = items || []
	}
	enqueue(element) {
		this.items.push(element)
	}

	dequeue() {
		return this.items.shift()
	}

	head() {
		return this.items[0]
	}

	tail() {
		return this.items[this.items.length - 1]
	}

	clear() {
		this.items = []
	}

	get size() {
		return this.items.length
	}

	get isEmpty() {
		return !this.items.length
	}

	print() {
		console.log(this.items.toString())
	}
}

module.exports = Queue

const queue = new Queue()
/*console.log(queue.isEmpty)
queue.enqueue('5')
queue.enqueue('8')
console.log(queue.size)
console.log(queue.head())
console.log(queue.tail())
queue.dequeue()
console.log(queue.size)
queue.clear()
console.log(queue.size)*/

