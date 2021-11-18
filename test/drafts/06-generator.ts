function* g () {
	let n: number = 1
	for (; n % 10 !== 0; n = Math.round(Math.random() * 100)) {
		yield n
	}
	return n
}

for (const value of g()) {
	console.log(value)
}
