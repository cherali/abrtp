interface User {
	email?: string
	username?: string
	bio?: string
	image?: string
	token?: string
}

export const useUser = (): User => {
	const { user } = JSON.parse(localStorage.getItem('data') || '{"user":{}}')

	return user as User
}
