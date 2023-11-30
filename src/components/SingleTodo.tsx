import {useState} from 'react';
import { Todo } from '@/types';
import { FileEdit, Trash2 } from 'lucide-react';
import { useDeleteTodoMutation, useEditTodoMutation, useToggleStatusMutation } from '@/features/api/apiSlice';
import { deleteTodoFromStorage, editTodoInStorage, toggleStatusInStorage } from '@/features/todos/todoSlice';
import { useDispatch } from 'react-redux';

export default function SingleTodo({ todo }: { todo: Todo }) {
  const [isCompleted, setIsComplited] = useState<boolean>(todo.completed);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(todo.title);
  const [updateTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleStatus] = useToggleStatusMutation();
  const dispatch = useDispatch();

  async function handleEdit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (newTitle) {
      try {
        dispatch(editTodoInStorage({...todo, title: newTitle}));
        await updateTodo({ ...todo, title: newTitle });
        setIsEdit(false);
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
      await toggleStatus({...todo, completed: !isCompleted});
      setIsComplited(!isCompleted);
      dispatch(toggleStatusInStorage(todo.id));
    } catch (error) {
      console.error('Failed to update status: ', error);
    }
  }

  function exitEditMode() {
    setIsEdit(false);
    setNewTitle(todo.title);
  }

  if (isEdit) {
    return (
      <form className="flex justify-between py-2">
        <input 
          className="text-lg border border-black rounded" 
          type="text" 
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          autoFocus
        />
        <div className="flex items-center gap-2">
          <button 
            className="py-2 px-3 border border-black"
            onClick={handleEdit}
          >
            Save
          </button>
          <button 
            className="py-2 px-3 border border-black"
            onClick={exitEditMode}
          >
            Cancel
          </button>
        </div>
      </form>
    )
  }

  return (
    <article className="flex justify-between py-2">
      <p className={`${isCompleted && 'text-gray-500 line-through'} text-lg text-left`}>{todo.title}</p>
      <div className="flex items-center gap-2">
        <input 
          className="hover:cursor-pointer w-4 h-4"
          type="checkbox" 
          onChange={handleStatusToggle} 
          checked={isCompleted} 
        />
        <button onClick={() => setIsEdit(true)} disabled={isCompleted}>
          <FileEdit className={`${isCompleted && 'text-gray-500'} w-5 h-5`} />
        </button>
        <button onClick={handleDeleteTodo}>
          <Trash2 className="w-5 hover:cursor-pointer" />
        </button>
      </div>
    </article>
  )
}