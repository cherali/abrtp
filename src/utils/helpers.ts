export const convertToUrlString = (data: object) => {
	return Object.entries(data)
		.map(item => `${item[0]}=${item[1]}`)
		.join('&')
}
