class MinCoinChange {

	constructor(coins) {
		this.coins = coins
		this.cache = {}
	}
	// 
	makeChange(amount) {
		if (!amount) return []
		if (this.cache[amount]) {
			return this.cache[amount]
		}
		let min = [],
			newMin, newAccount
		for (let i = 0; i < this.coins.length; i++) {
			let coin = this.coins[i]
			newAccount = amount - coin
			if (newAccount >= 0) {
				newMin = this.makeChange(newAccount)
			}
			if (newAccount >= 0 &&
				(newMin.length < min.length - 1 || !min.length) &&
				(newMin.length || !newAccount)) {
				min = [coin].concat(newMin)
				console.log('new Min ' + min + ' for ' + amount)
			}
		}
		return (this.cache[amount] = min)
	}
	// 贪心算法
	greedyMakeChange(amount) {
		const change = []
		let total = 0
		this.coins.sort((a, b) => a < b).forEach(coin => {
			while(coin + total <= amount) {
				change.push(coin)
				total += coin 
			}
		})
		return change 
	}
}

const minCoin = new MinCoinChange([1, 3, 4])
minCoin.makeChange(6)
let res = minCoin.greedyMakeChange(6)
console.log(res)