import { Todo, TodosRootType } from '@/types';
import {useState, useEffect} from 'react';
import SingleTodo from './SingleTodo';
import { useGetTodosQuery } from '@/features/api/apiSlice';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setFetchedTodos } from '@/features/todos/todoSlice';
import { pageSize } from '@/globals';

export default function TodoList() {
  const dispatch = useDispatch();
  const {
    fetchedTodos,
    allTodos,
    storedTodos,
    currentPage
  } = useSelector((state: TodosRootType) => state.todos);
  const [todosOnPage, setTodosOnPage] = useState<Todo[]>([]);

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  function paginateTodos() {
    let todosForCurrentPage;
    // if it's the 1st page
    if (currentPage === 1) {
      todosForCurrentPage = allTodos.slice(0, pageSize);
    } else {
      // subsequent pages
      todosForCurrentPage = allTodos.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }
    setTodosOnPage(todosForCurrentPage);
  }

  useEffect(() => {
    if (todos && todos.length > 0) {
      dispatch(setFetchedTodos({ fetchedTodos: todos}));
    }
  }, [todos, dispatch]);

  useEffect(() => {
    paginateTodos();
  }, [currentPage, fetchedTodos, storedTodos]);

  let content;
  if (isLoading) {
    content = <p className="text-2xl text-center">Loading...</p>
  } else if (isSuccess) {
    content = todosOnPage.map((todo: Todo) => {
      return (
        <SingleTodo key={todo.id} todo={todo} />
      )
    })
  } else if (isError) {
    content = <p>{error.toString()}</p>
  }

  return (
    <div>
      <section className="bg-white border border-slate-700 rounded-lg p-3">
        {content}
      </section>
      {isSuccess && <Pagination pages={Math.ceil(allTodos.length / pageSize)} />}
    </div>
  )
}