import { Todo, TodoSliceType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TodoSliceType = {
  fetchedTodos: [],
  storedTodos: [],
  allTodos: [],
  currentPage: 1,
  isEditMode: false,
}

function updateStorageData(data: Todo[]) {
  localStorage.removeItem('todos');
  localStorage.setItem('todos', JSON.stringify(data));
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFetchedTodos(state, action) {
      const storedTodos = localStorage.getItem('todos');
      // if there's existing todos in storage
      if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        return {...state, 
          fetchedTodos: action.payload.fetchedTodos, 
          storedTodos: todos,
          allTodos: [...todos, ...action.payload.fetchedTodos]
        };
      } else {
        return {...state, 
          fetchedTodos: action.payload.fetchedTodos, 
          allTodos: [...state.storedTodos, ...action.payload.fetchedTodos]
        }
      }
    },
    onNextPage(state) {
      return {...state, currentPage: state.currentPage + 1} 
    },
    onPrevPage(state) {
      return {...state, currentPage: state.currentPage - 1} 
    },
    onPageChange(state, action) {
      return {...state, currentPage: action.payload.currentPage}
    },
    addNewTodoToStorage(state, action) {
      const storedTodos = localStorage.getItem('todos');
      // if there's existing todos in storage
      if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        const updatedTodos = [action.payload, ...todos];
        updateStorageData(updatedTodos);
        return {...state, 
          allTodos: [...updatedTodos, ...state.fetchedTodos],
          storedTodos: updatedTodos
        };
      } else {
        // if it's the first todo to be stored
        localStorage.setItem('todos', JSON.stringify([action.payload]));
        return {...state,
          allTodos: [action.payload, ...state.fetchedTodos],
          storedTodos: [action.payload]
        };
      }
    },
    editTodoInStorage(state, action) {
      const storedTodos = localStorage.getItem('todos');
      // if there's existing todos in storage
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);

        // if it's a custom todo
        if (todos.some(t => t.id === action.payload.id)) {
          const updatedTodos = todos.map(t => (t.id === action.payload.id ? action.payload : t));
          updateStorageData(updatedTodos);
          return {...state, 
            allTodos: [...updatedTodos, ...state.fetchedTodos],
            storedTodos: updatedTodos
          };
        } else {
          // if it's an API todo
          const updatedTodos = [action.payload, ...todos];
          updateStorageData(updatedTodos);
          return {...state, 
            allTodos: [...updatedTodos, ...state.fetchedTodos],
            storedTodos: updatedTodos
          };
        }
      } else {
        localStorage.setItem('todos', JSON.stringify([action.payload]));
        return {...state,
          allTodos: [action.payload, ...state.fetchedTodos],
          storedTodos: [action.payload]
        };
      }
    },
    deleteTodoFromStorage(state, action) {
      // if it's an API todo (won't persist)
      if (state.fetchedTodos.some(t => t.id === action.payload)) {
        const updatedTodos = state.fetchedTodos.filter(t => t.id !== action.payload);
        return {...state, 
          fetchedTodos: updatedTodos,
          allTodos: [...state.storedTodos, ...updatedTodos]
        };
      }
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);
        const updatedTodos = todos.filter(t => t.id !== action.payload);
        updateStorageData(updatedTodos);
        return {...state, 
          allTodos: [...updatedTodos, ...state.fetchedTodos],
          storedTodos: updatedTodos
        };
      }
    },
    toggleStatusInStorage(state, action) {
      const storedTodos = localStorage.getItem('todos');
      // if there's existing todos in storage
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);

        if (todos.some(t => t.id === action.payload)) {
          const todoIdx = todos.findIndex(t => t.id === action.payload);
          todos[todoIdx].completed = !todos[todoIdx].completed;
          updateStorageData(todos);
          return {...state, 
            allTodos: [...todos, ...state.fetchedTodos],
            storedTodos: todos
          };
        } else { 
          return state;
        }
      }
    },
    toggleEditMode(state) {
      return {...state, isEditMode: !state.isEditMode}
    }
  }
})

export const { 
  setFetchedTodos, 
  onNextPage, 
  onPageChange, 
  onPrevPage,
  addNewTodoToStorage,
  editTodoInStorage,
  deleteTodoFromStorage,
  toggleStatusInStorage,
  toggleEditMode
} = todoSlice.actions;
export default todoSlice.reducer;