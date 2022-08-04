import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilterSlice } from './type'


const initialState: IFilterSlice = {
	paramId: "0",
	activeTag: 'null',
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setParamId(state, action: PayloadAction<number>) {
			state.paramId = action.payload
		},
		setActiveTag(state, action: PayloadAction<string>){
			state.activeTag = action.payload
		},
		setFilters(state, action: PayloadAction<IFilterSlice>) {
			state.paramId = Number(action.payload.paramId)
			state.activeTag = action.payload.activeTag
		}
	},
})

export const { setFilters, setParamId, setActiveTag } = filterSlice.actions

export default filterSlice.reducer