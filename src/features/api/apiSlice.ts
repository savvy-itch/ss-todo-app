import { Todo } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*
  Provided 'POST', 'DELETE', 'PATCH/PUT' requests DO NOT update the server
  as JSONPlaceholder API mocks requests. Current implementation only serves 
  as a demonstration of performing them and fakes persisted changes by
  using local storage (see todoSlice.ts)
*/
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: builder => ({
    getTodos: builder.query<Todo[], void>({
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