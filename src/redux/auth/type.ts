export const enum Status {
	FIRST = 'pre-loading',
	LOADING = 'loading',
	SUCCESS = 'loaded',
	ERROR = 'error'
}

export interface User {
	_id: string,
	fullName: string,
	email: string,
	passwordHash?: string,
	createdAt: string,
	updatedAt: string,
	avatarUrl?: string,
	__v: number,
	token?: string
}


export interface IAuthSlice {
	data: null | User
	status: Status
}