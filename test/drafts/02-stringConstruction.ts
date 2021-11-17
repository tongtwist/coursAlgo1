const problemesFaciles: { [objectifs: string]: Array<string> } = {
	"":					["bla", "bl", "a"],	// true
	"abcdef":			["ab", "abc", "cd", "def", "abcd"],	// true
	"skateboard":		["bo", "rd", "ate", "t", "ska", "sk", "boar"],	// false
	"enterapotentpot":	["a", "p", "ent", "enter", "ot", "o", "t"],	// true
}
const problemeDifficile: { [objectifs: string]: Array<string> } = {
	"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef": [
		"e",
		"ee",
		"eee",
		"eeee",
		"eeeee",
		"eeeeee"
	] // false
}

function constructionPossible (
	objectif: string,
	alphabet: Array<string>,
	memo: { [objectifs: string]: boolean } = {}
): boolean {
	if (objectif in memo) return memo[objectif]
	if (objectif === "") return true
	for (let piece of alphabet) {
		if (objectif.indexOf(piece) === 0) {
			const reste = objectif.slice(piece.length)
			if (constructionPossible(reste, alphabet, memo)) {
				memo[objectif] = true
				return true
			}
		}
	}
	memo[objectif] = false
	return false
}

function bench (problemes: { [p: string]: Array<string> }) {
	for (const objectif in problemes) {
		const alphabet = problemes[objectif]
		console.log(`"${objectif}" -> ${constructionPossible(objectif, alphabet)}`)
	}
}

bench(problemesFaciles)
//bench(problemeDifficile)