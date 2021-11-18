const len: number = 10000000
const numbers: number[] = Array(len)

function remplissage () {
	for (let i = 0; i < len; i++) numbers[i] = Math.round(Math.random() * 255)
}

const comparateur = (a: number, b: number): number => {
	return a - b
}

const nativeSort = () => numbers.sort(comparateur)

function bench (
	iterations: number,
	sorter: () => void
) {
	let debut = 0
	let fin = 0
	let tempsActuel = 0
	let tempsTotal = 0
	for (let i = 0; i < iterations; i++) {
		remplissage()
		debut = Date.now()
		sorter()
		fin = Date.now()
		tempsActuel = fin - debut
		console.log( tempsActuel, numbers.slice(0, 20) )
		tempsTotal += tempsActuel
	}
	console.log(`Temps moyen de tri d'un vecteur de ${len} nombre: ${Math.round(tempsTotal / iterations)} ms`)
}

function customRadixSort () {
	const nbBuckets: number = 256
	const prefixSums: Array<number> = Array(nbBuckets)
	const output: Array<number> = Array(len)
	for (let j = 0; j < nbBuckets; j++) prefixSums[j] = 0
	for (let j = 0; j < len; j++) prefixSums[ numbers[j] ]++
	for (let j = 1; j < nbBuckets; j++) prefixSums[j] += prefixSums[j - 1]
	for (let j = len - 1; j >= 0; j--) {
		const v = numbers[j]
		const outputIdx = --prefixSums[v]
		output[outputIdx] = v
	}
	for (let i = 0; i < len; i++) numbers[i] = output[i]
}

//bench(5, nativeSort)
bench(5, customRadixSort)