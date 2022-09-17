export const getDescendantProp = (obj: any, path: string | number | symbol) => {
	const arr = path.toString().split(/[.[]['"]?/)
	let newObj = obj
	while (arr.length && newObj) {
		newObj = newObj[(arr.shift() as string).replace(/['"]?]$/, '')]
	}

	return newObj
}
