// djb2 HashCode
const LinkedList = require('./LinkedList')

class HashTable {
	constructor() {
		this.tables = []
	}

	static djb2HashCode(key) {
		let hash = 5381
		for(let codePoint of key) {
			hash += hash * 33 + codePoint.charCodeAt()
		}
		return hash % 1013
	}

	set(key, value) {

	}

	get(key) {

	}

	remove(key) {
		
	}
}