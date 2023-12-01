import {useState, useEffect} from 'react';
import { Todo, TodosRootType } from '@/types';
import { useGetTodosQuery } from '@/features/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setFetchedTodos } from '@/features/todos/todoSlice';
import { pageSize } from '@/globals';

import Loading from './Loading';
import SingleTodo from './SingleTodo';
import Pagination from './Pagination';

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

  // fetch API todos initially
  useEffect(() => {
    if (todos && todos.length > 0) {
      dispatch(setFetchedTodos({ fetchedTodos: todos}));
    }
  }, [todos, dispatch]);

  // update pagination on todo creation/deletion
  useEffect(() => {
    paginateTodos();
  }, [currentPage, fetchedTodos, storedTodos]);

  let content;
  if (isLoading) {
    content = <Loading />
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
      <section className="bg-white border border-neutral-500 rounded-lg py-3">
        {content}
      </section>
      {isSuccess && <Pagination pages={Math.ceil(allTodos.length / pageSize)} />}
    </div>
  )
}