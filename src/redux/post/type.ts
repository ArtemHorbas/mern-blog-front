import { Status, User } from "../auth/type"


export type PostsItemsType = {
		_id?: string,
		title?: string,
		text?:  string,
		tags?: string[],
		viewsCount?: number,
		user?: User,
		comments?: any[],
		imageUrl?: string,
		createdAt?: string,
		updatedAt?: string,
		__v?: number
}


export type CommentsItemsType = {
	_id: string,
	user: User,
	post: PostsItemsType,
	text: string,
	createdAt: string,
	updatedAt: string,
	__v: number
}

export interface IPostSlice{
	posts: {
		items: PostsItemsType[],
		status: Status
	},
	tags: {
		items: string[],
		status: Status
	},
	comments: {
		items: CommentsItemsType[],
		status: Status
	}
}