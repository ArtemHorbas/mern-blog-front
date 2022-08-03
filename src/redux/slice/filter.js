import { createSlice } from '@reduxjs/toolkit'


const initialState = {
	paramId: "0",
	activeTag: 'null',
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setParamId(state, action) {
			state.paramId = action.payload
		},
		setActiveTag(state, action){
			state.activeTag = action.payload
		},
		setFilters(state, action) {
			state.paramId = Number(action.payload.paramId)
			state.activeTag = action.payload.activeTag
		}
	},
})

export const { setFilters, setParamId, setActiveTag } = filterSlice.actions

export default filterSlice.reducer