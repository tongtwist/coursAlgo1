const len = 10

/**
 * for of
 * for in
 */
const m: Map<string, number> = new Map()
const array: Array<number> = []
for (let i = 0; i < len; i++) {
	m.set(i.toString(), i)
	array.push(i)
}
console.log("map:", m)
console.log("array:", array)

const entries = m.entries()
console.log(entries)
console.log(entries.next())

for (let value of m) {
	console.log("for of map:", value)
}


/*
const mapIterator = map[Symbol.iterator]()
console.log(mapIterator)
let iteration = mapIterator.next()
while (!iteration.done) {
	console.log(iteration.value)
	iteration = mapIterator.next()
}
*/

/*for (let value of array) {
	console.log("for of array:", value)
}
 */