export const getDescendantProp = <T>(obj: object, path: string | number | symbol): T => {
	const newPath = path.toString().split('.')
	let newObj = { ...obj }

	for (let i = 0; i < newPath.length; i++) {
		newObj = newObj[newPath[i] as keyof typeof obj]
	}
	return newObj as T
}
