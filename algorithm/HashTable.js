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
		console.log(`${position} - ${key}`)
		this.tables[position] = value
	}

	get (key) {
		return this.tables[HashTable.loseloseHashTable(key)]
	}

	remove(key) {
		this.tables[HashTable.loseloseHashTable(key)] = undefined
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