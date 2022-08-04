import { createSlice } from '@reduxjs/toolkit'
import { Status } from '../auth/type'
import { fetchComments, fetchPosts, fetchRemovePost, fetchTags } from './asyncThunk'
import { IPostSlice } from './type'

const initialState: IPostSlice = {
	posts: {
		items: [],
		status: Status.FIRST
	},
	tags: {
		items: [],
		status: Status.FIRST
	},
	comments: {
		items: [],
		status: Status.FIRST
	},
}

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers(builder) {
		//Gettin' posts
		builder.addCase(fetchPosts.pending, (state) => {
			state.posts.items = []
			state.posts.status = Status.LOADING
		});
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.posts.items = action.payload
			state.posts.status = Status.SUCCESS
		});
		builder.addCase(fetchPosts.rejected, (state) => {
			state.posts.items = []
			state.posts.status = Status.ERROR
		});
		//Removin' post
		builder.addCase(fetchRemovePost.pending, (state, action: any) => {
			state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
			state.posts.status = Status.LOADING
		});
		builder.addCase(fetchRemovePost.fulfilled, (state) => {
			state.posts.status = Status.SUCCESS
		});
		builder.addCase(fetchRemovePost.rejected, (state) => {
			state.posts.status = Status.ERROR
		});
		//Gettin' tags
		builder.addCase(fetchTags.pending, (state) => {
			state.tags.items = []
			state.tags.status = Status.LOADING
		});
		builder.addCase(fetchTags.fulfilled, (state, action) => {
			state.tags.items = action.payload
			state.tags.status = Status.SUCCESS
		});
		builder.addCase(fetchTags.rejected, (state) => {
			state.tags.items = []
			state.tags.status = Status.ERROR
		});
		//Gettin' comments
		builder.addCase(fetchComments.pending, (state) => {
			state.comments.items = []
			state.comments.status = Status.LOADING
		});
		builder.addCase(fetchComments.fulfilled, (state, action) => {
			state.comments.items = action.payload
			state.comments.status = Status.SUCCESS
		});
		builder.addCase(fetchComments.rejected, (state) => {
			state.comments.items = []
			state.comments.status = Status.ERROR
		});
	}
})

export default postSlice.reducer