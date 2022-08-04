import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { myAxios } from '../../axios.js'

export const fetchPosts = createAsyncThunk('post/fetchPosts', async ({paramId, activeTag}) => {
	const {data} = await myAxios.get(`/posts/sortedBy/${paramId}/activeTag/${activeTag}`) 
	return data
})

export const fetchRemovePost = createAsyncThunk('post/fetchRemovePost', async (_id) => {
	myAxios.delete(`/posts/${_id}`)
})

export const fetchTags = createAsyncThunk('post/fetchTags', async () => {
	const {data} = await myAxios.get('/posts/tags')
	return data
})

export const fetchComments = createAsyncThunk('post/fetchComments', async () => {
	const {data} = await myAxios.get('/comments')
	return data
})


const initialState = {
	posts: {
		items: [],
		status: 'pre-loading'
	},
	tags: {
		items: [],
		status: 'pre-loading'
	},
	comments: {
		items: [],
		status: 'pre-loading'
	},
}

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers: {
		//Gettin' posts
		[fetchPosts.pending]: (state) => {
			state.posts.items = []
			state.posts.status = 'loading'
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'loaded'
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.items = []
			state.posts.status = 'error'
		},
		//Gettin' tags
		[fetchTags.pending]: (state) => {
			state.tags.items = []
			state.tags.status = 'loading'
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload
			state.tags.status = 'loaded'
		},
		[fetchTags.rejected]: (state) => {
			state.tags.items = []
			state.tags.status = 'error'
		},
		//Gettin' comments
		[fetchComments.pending]: (state) => {
			state.comments.items = []
			state.comments.status = 'loading'
		},
		[fetchComments.fulfilled]: (state, action) => {
			state.comments.items = action.payload
			state.comments.status = 'loaded'
		},
		[fetchComments.rejected]: (state) => {
			state.comments.items = []
			state.comments.status = 'error'
		},
		//Removin' post
		[fetchRemovePost.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
			state.posts.status = 'deleting post'
		},
		[fetchRemovePost.fulfilled]: (state) => {
			state.posts.status = 'post has been deleted'
		},
		[fetchRemovePost.rejected]: (state) => {
			state.posts.status = 'did not delete the post'
		},
	}
})

// export const {  } = postSlice.actions

export default postSlice.reducer