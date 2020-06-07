// 线性嗅探
const LinkedList = require('./LinkedList')

class HashTable {
	constructor() {
		this.tables = []
	}

	static loseloseHashTable(key) {
		let hash = 0 
		for (let keycode of key) {
			hash += keycode.charCodeAt()
		}
		return hash % 37
	}

	set(key, value) {
		const position = HashTable.loseloseHashTable(key)
		if(this.tables[position] === undefined) {
			this.tables[position] = { key, value }
		} else {
			let index = ++position
			while(this.tables[index] !== undefined) {
				index++
			}
			this.tables[index] = { key, value }
		}
		this.tables[position].append({ key, value })
	}

	get(key) {
		const position = this.tables[HashTable.loseloseHashTable(key)]
		const getElementValue = index => {
			if(this.tables[index] === undefined) return undefined
			if(Object.is(this.talbes[index].key, key)) {
				return this.talbes[index].value
			} else {
				return getElementValue(index + 1)
			}
		}
		return getElementValue(position)
	}

	remove(key) {
		const position = this.talbes[HashTable.loseloseHashTable(key)]
		const removeElementValue = index => {
			if(this.tables[index] === undefined) return false 
			if(Object.is(this.tables[index].key, key)) {
				this.tables[index] = undefined
				return true
			} else {
				return removeElementValue(index + 1)
			}
		}
		return removeElementValue(position)
	}
}