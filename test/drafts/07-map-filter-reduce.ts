/**
 * map
 */
const a: Array<string> = ["a", "b", "c", "d", "e"]
console.log(a)
function majuscule (txt: string) {
	return txt.toUpperCase()
}
const A: Array<string> = a.map(majuscule)
console.log(A)
const B: Array<string> = A.map((txt: string, i: number) => txt.repeat(i + 1))
console.log(B)

/**
 * filter
 */
function estDeTaillePaire (txt: string): boolean {
	return (txt.length & 1) === 0
}
const C: Array<string> = B.filter(estDeTaillePaire)
console.log(C)

/**
 * reduce
 */
