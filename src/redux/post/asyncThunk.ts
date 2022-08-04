import { createAsyncThunk } from '@reduxjs/toolkit'
import { myAxios } from '../../axios.js'
import { PostsItemsType } from './type.js'

export interface urlParams{
	paramId: string | number, 
	activeTag: string
}

export const fetchPosts = createAsyncThunk<PostsItemsType[], urlParams>('post/fetchPosts', async ({paramId, activeTag}) => {
	const {data} = await myAxios.get<PostsItemsType[]>(`/posts/sortedBy/${paramId}/activeTag/${activeTag}`) 
	return data
})

export const fetchRemovePost = createAsyncThunk('post/fetchRemovePost', async (_id: string) => {
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
