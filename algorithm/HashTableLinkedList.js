const LinkedList = require('./LinkedList')

class HashTable {
	constructor() {
		this.tables = []
	}

	static loseloseHashTable(key) {
		let hash = 0
		for(let keycode of key) {
			hash += keycode.charCodeAt()
		}
		return hash % 37
	}

	set(key, value) {
		let position = HashTable.loseloseHashTable(key)
		if(this.tables[position] === undefined) {
			this.tables[position] = new LinkedList()
		}
		this.tables[position].append({key, value})
	}

	get (key) {
		const position = this.tables[HashTable.loseloseHashTable(key)]
		if(this.tables[position] === undefined) return undefined
		const getElemnetValue = node => {
			if(!node && !node.element) return undefined
			if(Object.is(node.element.key, key)) {
				return node.element.value
			} else {
				return getElemnetValue(node.next)
			}
		}
		return getElemnetValue(this.tables[position].head)
	}

	remove(key) {
		const position = this.tables[HashTable.loseloseHashTable(key)]
		if(this.tables[position] === undefined) return undefined
		const getElemnetValue = node => {
			if(!node && !node.element) return false 
			if(Object.is(node.element.key, key)) {
				this.tables[position].remove(node.element)
				if(this.tables[position].isEmpty) {
					this.tables[position] = undefined
				}
				return true
			} else {
				return getElemnetValue(node.next) 
			}
		}
		return getElemnetValue(this.tables[position].head)
	}
}

// Use hashTable 
let hashtable = new HashTable()
console.log(hashtable)
hashtable.set('helloman', 'helloman@vip.com')
hashtable.set('john', 'john@vip.com')
hashtable.remove('john')
console.log(hashtable.get('helloman'))
console.log(hashtable)