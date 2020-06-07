const Queue = require('./Queue.js')

class LoopQueue extends Queue {
	constructor(items) {
		super(items)
	}

	getIndex(index) {
		const length = this.items.length 
		return index > length ? (index % length) : index 
	}

	find(index) {
		return !this.isEmpty ? this.items[this.getIndex(index)] : null
	}
}

const lq = new LoopQueue(['贝索斯'])
lq.enqueue('张磊')
lq.enqueue('白起')
lq.enqueue('商鞅')
console.log(lq.find(9))
console.log(lq.find(3))

