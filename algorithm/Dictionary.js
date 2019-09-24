class Dictionary {
	constructor() {
		this.items = {}
	}

	set(key, value) {
		this.items[key] = value 
	}

	get(key) {
		return this.items[key]
	}

	remove(key) {
		delete this.items[key]
	}

	get keys() {
		return Object.keys(this.items)
	}

	get values() {
		return Object.keys(this.items).reduce((acc, val, idx) => {
			acc.push(this.items[val])
			return acc 
		}, [])
	}
}

module.exports = Dictionary

// Use Dictionary 
let dct = new Dictionary()
dct.set('age', 20)
dct.set('sex', 'male')
dct.set('job', 'teacher')

// console.log(dct)
// console.log(dct.get('sex'))
// console.log(dct.remove('age'))
// console.log(dct.values)
