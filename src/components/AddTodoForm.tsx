import React, { useState } from 'react';
import { useAddNewTodoMutation } from '@/features/api/apiSlice';
import { USER_ID } from '@/globals';
import { Todo } from '@/types';
import { customAlphabet } from 'nanoid';
import { addNewTodoToStorage } from '@/features/todos/todoSlice';
import { useDispatch } from 'react-redux';

const nanoid = customAlphabet('1234567890', 5)

export default function AddTodoForm() {
  const [title, setTitle] = useState<string>('');
  const [addNewTodo, { isLoading }] = useAddNewTodoMutation();
  const dispatch = useDispatch();

  const canSave = title && !isLoading;

  async function addTodo(e: React.SyntheticEvent) {
    e.preventDefault();
    if (canSave) {
      const newTodo: Todo = {
        userId: USER_ID,
        id: Number(nanoid()),
        title: title,
        completed: false
      }
      try {
        await addNewTodo(newTodo);
        dispatch(addNewTodoToStorage(newTodo));
        setTitle('');
      } catch (error) {
        console.error('Failed to save to todo: ', error);
      }
    } else {
      alert('Please enter a valid task')
    }
  }

  return (
    <form 
      className="flex w-full justify-center gap-2"
      onSubmit={addTodo}
    >
      <input 
        className="pl-3 rounded grow" 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        className="py-2 px-4 rounded border border-black"
        type="submit"
        onSubmit={addTodo}
        value="Add"
      />
    </form>
  )
}
