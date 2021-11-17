const len = 10

/**
 * for
 */
for (let i = 0; i < len; console.log("for - i:", i), i++) ;



/**
 * while
 */
let i = len
while (i < len) {
	console.log("while - i:", i)
	i++
}


/**
 * do while
 */

i = len
do {
	console.log("do while - i:", i)
	i++
} while(i < len)
