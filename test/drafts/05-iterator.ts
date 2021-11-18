/**
 * Iterator
 */

//type IteratorResult<TypeValue, TypeReturn = any>
//	= { value: TypeValue | undefined, done?: false }
//	| { value?: TypeReturn | undefined, done: true }

interface IIterator<TypeValue = any, TypeReturn = any> {
	next (): IteratorResult<number, number>
}

/*const iterator: { [k: string]: any } & IIterator<number> = {
	i: 0,
	log: function (...args: any[]) {
		console.log(Date.now(), ...args)
	},
	next: function () {
		return { value: this.i++, done: this.i > 10 }
	}
}

let ret: IteratorResult<number> = iterator.next()
while (!ret.done) {
	console.log(ret.value)
	ret = iterator.next()
}*/


/**
 * Iterable
 */
interface IIterable<TValue = any, TReturn = any> {
	[Symbol.iterator] (): IIterator<TValue, TReturn>
}

const iterable: { [k: string]: any } & IIterable = {
	values: [9,8,7,6,5,4,3,2,1,0],
	[Symbol.iterator] () {
		let i = 0
		const values = this.values
		return {
			next () {
				const done: boolean = i >= values.length
				return {
					value: done ? undefined : values[i++],
					done
				}
			}
		}
	}
}

/*const iterator2: IIterator<number> = iterable[Symbol.iterator]()
let ret2: IteratorResult<number> = iterator2.next()
while (!ret2.done) {
	console.log(ret2.value)
	ret2 = iterator2.next()
}
*/
for (const value of iterable) {
	console.log(value)
}
console.log(...iterable)