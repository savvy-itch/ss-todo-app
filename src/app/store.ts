import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../features/todos/todoSlice';
import { apiSlice } from "@/features/api/apiSlice";

export default configureStore({
  reducer: {
    todos: todoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware)
})