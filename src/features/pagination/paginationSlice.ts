import { PaginationSliceType } from "@/types"
import { createSlice } from "@reduxjs/toolkit"

const initialState: PaginationSliceType = {
  currentPage: 1,
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    onNextPage(state) {
      return {...state, currentPage: state.currentPage + 1} 
    },
    onPrevPage(state) {
      return {...state, currentPage: state.currentPage - 1} 
    },
    onPageChange(state, action) {
      return {...state, currentPage: action.payload.currentPage}
    }
  }
})

export const { onNextPage, onPrevPage, onPageChange } = paginationSlice.actions;
export default paginationSlice.reducer;