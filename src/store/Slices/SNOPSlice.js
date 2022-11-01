import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loader: true,
  errorMsg: '',
  ErrorCode: '',
  snop: [],
}

export const SnopSlice = createSlice({
  name: 'snop',
  initialState: initialState,
  reducers: {
    getAllSnopSlice: (state, action) => {
      state.snop = action.payload
      state.loader = false
      return state
    },
    editSnopSlice: (state, action) => {
      state.snop = state.snop.map((i) =>
        i.snop_id === action.payload.snop_id ? action.payload : i,
      )
      return state
    },
    createSnopSlice: (state, action) => {
      state.snop = state.snop.push(action.payload)
      return state
    },
    deleteSnopSlice: (state, action) => {
      state.snop = state.snop.filter((i) =>
        i.snop_id !== action.payload ? i.snop_id : i,
      )
      console.log(state.snop, 'nae')
      return state
    },
  },
})

export const {
  getAllSnopSlice,
  deleteSnopSlice,
  createSnopSlice,
  editSnopSlice,
} = SnopSlice.actions

export default SnopSlice.reducer
