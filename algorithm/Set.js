class Set {
	constructor() {
		this.items = {}
	}

	has(value) {
		return this.items.hasOwnProperty(value)
	}

	add(value) {
		if(!this.has(value)) {
			this.items[value] = value 
			return true
		}
		return false 
	}

	remove(value) {
		if(this.has(value)) {
			delete this.items[value]
			return true
		}
		return false
	}

	get size() {
		return Object.keys(this.items).length 
	}

	get values() {
		return Object.keys(this.items)
	}

	// 并集 意思是x（元素）存在于A中，或x存在于B中
	union(otherSet) {
		const unionSet = new Set()
		this.values.forEach((v, i) => unionSet.add(this.values[i]))		
		otherSet.values.forEach((v, i) => unionSet.add(otherSet.values[i]))
		return unionSet
	}

	// 交集 意思是x（元素）存在于A中，且x存在于B中
	intersection(otherSet) {
		const intersectionSet = new Set()
		this.values.forEach((v, i) => {
			if(otherSet.has(v)) {
				intersectionSet.add(v)
			}
		})
		return intersectionSet
	}

	// 差集 意思是x（元素）存在于A中，且不x存在于B中
	difference(otherSet) {
		const differenceSet = new Set()
		this.values.forEach((v, i) => {
			if(!otherSet.has(v)) {
				differenceSet.add(v)
			}
		})
		return differenceSet
	}

	// 子集 子集的数学概念：集合A是B的子集，或者说集合B包含了集合A
	subset(otherSet) {
		if(this.size > otherSet.size) {
			return false 
		} else {
			return !this.values.some(v => !otherSet.has(v))
		}
	}
}

// Use Set 
let set = new Set()
set.add(2)
set.add(3)
set.add(8)
set.add(112)
set.add(5)
set.remove(5)
console.log(set.size)
console.log(set.has(2))
console.log(set.values)

let set2 = new Set()
set2.add(2)
set2.add(3)

let unionRes = set.union(set2)
let itsRes = set2.intersection(set)
let diffRes = set2.difference(set)
let subRes = set2.subset(set)
console.log('union result:', unionRes)
console.log('itersection result:', itsRes)
console.log('difference result:', diffRes)
console.log('sub result:', subRes)











