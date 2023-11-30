import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: builder => ({
    getTodos: builder.query({
      query: () => '/todos'
    }),
    addNewTodo: builder.mutation({
      query: initialTodo => ({
        url: '/todos',
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(initialTodo)
      })
    }),
    editTodo: builder.mutation({
      query: todo => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(todo)
      })
    }),
    toggleStatus: builder.mutation({
      query: todo => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(todo)
      })
    }),
    deleteTodo: builder.mutation({
      query: id => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      })
    })
  })
})

export const { 
  useGetTodosQuery, 
  useAddNewTodoMutation, 
  useEditTodoMutation,
  useToggleStatusMutation,
  useDeleteTodoMutation
} = apiSlice;