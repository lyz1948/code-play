class PriorityQueue {
	constructor() {
		this.items = []
	}

	enqueue(element, priority) {
		const queueElement = { element, priority }
		if(this.isEmpty) {
			this.items.push(queueElement)
		} else {
			const preIndex = this.items.findIndex((item) => queueElement.priority < item.priority)
			if(preIndex > -1) {
				this.items.splice(preIndex, 0, queueElement)
			} else {
				this.items.push(queueElement)
			}
		}
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
		console.log(this.items)
	}
}

// Use PriorityQueue
const pq = new PriorityQueue()

pq.enqueue('马化腾', '2')
pq.enqueue('马Yun', '2')
pq.enqueue('jobs', '1')
pq.enqueue('雷军', '3')
console.log(pq.size)
pq.print()
console.log(pq.isEmpty)

