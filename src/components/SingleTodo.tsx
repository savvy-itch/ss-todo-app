import React, {useState} from 'react';
import { Todo, TodosRootType } from '@/types';
import { useDeleteTodoMutation, useEditTodoMutation, useToggleStatusMutation } from '@/features/api/apiSlice';
import { deleteTodoFromStorage, editTodoInStorage, toggleEditMode, toggleStatusInStorage } from '@/features/todos/todoSlice';
import { useDispatch, useSelector } from 'react-redux';

import { FileEdit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SingleTodo({ todo }: { todo: Todo }) {
  const [isCompleted, setIsComplited] = useState<boolean>(todo.completed);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(todo.title);
  const [updateTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleStatus] = useToggleStatusMutation();
  const { isEditMode } = useSelector((state: TodosRootType) => state.todos);
  const dispatch = useDispatch();

  async function handleEdit(e: React.SyntheticEvent) {
    e.preventDefault();
    //  if title is empty
    if (newTitle) {
      try {
        setIsEdit(false);
        dispatch(editTodoInStorage({...todo, title: newTitle}));
        await updateTodo({ ...todo, title: newTitle });
        setNewTitle(todo.title);
      } catch (error) {
        console.error('Failed to update the todo: ', error);
      }
    } else {
      alert('Please enter a valid task');
    }
  }

  async function handleDeleteTodo() {
    try {
      dispatch(deleteTodoFromStorage(todo.id));
      await deleteTodo(todo.id);
    } catch (error) {
      console.error('Failed to delete the todo: ', error);
    }
  }

  async function handleStatusToggle() {
    try {
      const currStatus: boolean = isCompleted;
      setIsComplited(!currStatus);
      dispatch(toggleStatusInStorage(todo.id));
      await toggleStatus({...todo, completed: !currStatus});
    } catch (error) {
      console.error('Failed to update status: ', error);
    }
  }

  function exitEditMode() {
    setIsEdit(false);
    dispatch(toggleEditMode());
    setNewTitle(todo.title);
  }

  function checkForEditAbort(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      exitEditMode();
    }
  }

  // prevent editing more than 1 task at once
  function checkForSingleEdit() {
    if (isEditMode) {
      alert("Please finish editing the other field first");
    } else {
      setIsEdit(true);
      dispatch(toggleEditMode());
    }
  }

  if (isEdit) {
    return (
      <form className="flex px-3 justify-between items-center gap-2 py-2">
        <input 
          className="text-lg px-2 border border-neutral-500 rounded w-2/3" 
          type="text" 
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={checkForEditAbort}
          autoFocus
        />
        <div className="flex items-center gap-2">
          <button 
            className="py-2 px-3 bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-600 text-white rounded transition-colors"
            onClick={handleEdit}
          >
            Save
          </button>
          <button 
            className="py-2 px-3 bg-rose-600 hover:bg-rose-700 focus:bg-rose-700 text-white rounded transition-colors"
            onClick={exitEditMode}
          >
            Cancel
          </button>
        </div>
      </form>
    )
  }

  return (
    <article className="flex justify-between items-center gap-2 py-2 px-3 rounded hover:bg-neutral-100 transition-colors">
      <p className={`${isCompleted && 'text-gray-500 line-through'} text-sm sm:text-lg text-left`}>{todo.title}</p>
      <div className="flex items-center gap-2 py-2">
        <input 
          className="hover:cursor-pointer w-4 h-4"
          type="checkbox" 
          onChange={handleStatusToggle} 
          checked={isCompleted} 
        />
        <button onClick={checkForSingleEdit} disabled={isCompleted}>
          <FileEdit className={`${isCompleted ? 'text-gray-500' : 'hover:text-gray-700'} w-5 h-5`} />
        </button>
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash2 className="w-5 hover:text-gray-700 hover:cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this task?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteTodo}>Ok</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </article>
  )
}