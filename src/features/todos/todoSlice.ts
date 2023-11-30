import { Todo, TodoSliceType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TodoSliceType = {
  fetchedTodos: [],
  storedTodos: [],
  allTodos: [],
  currentPage: 1,
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFetchedTodos(state, action) {
      const storedTodos = localStorage.getItem('todos');
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
      if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        const updatedTodos = [action.payload, ...todos];
        localStorage.removeItem('todos');
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return {...state, 
          allTodos: [...updatedTodos, ...state.fetchedTodos],
          storedTodos: updatedTodos
        };
      } else {
        localStorage.setItem('todos', JSON.stringify([action.payload]));
        return {...state,
          allTodos: [action.payload, ...state.fetchedTodos],
          storedTodos: [action.payload]
        };
      }
    },
    editTodoInStorage(state, action) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);

        // if it's a custom todo
        if (todos.some(t => t.id === action.payload.id)) {
          const updatedTodos = todos.filter(t => t.id !== action.payload.id);
          updatedTodos.push(action.payload);
          localStorage.removeItem('todos');
          localStorage.setItem('todos', JSON.stringify(updatedTodos));
          return {...state, 
            allTodos: [...updatedTodos, ...state.fetchedTodos],
            storedTodos: updatedTodos
          };
        } else {
          // if it's an API todo
          const updatedTodos = [action.payload, ...todos];
          localStorage.removeItem('todos');
          localStorage.setItem('todos', JSON.stringify(updatedTodos));
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
        localStorage.removeItem('todos');
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return {...state, 
          allTodos: [...updatedTodos, ...state.fetchedTodos],
          storedTodos: updatedTodos
        };
      }
    },
    toggleStatusInStorage(state, action) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);

        if (todos.some(t => t.id === action.payload)) {
          const todoIdx = todos.findIndex(t => t.id === action.payload);
          if (todoIdx !== -1) {
            todos[todoIdx].completed = !todos[todoIdx].completed;
            localStorage.removeItem('todos');
            localStorage.setItem('todos', JSON.stringify(todos));
            return {...state, 
              allTodos: [...todos, ...state.fetchedTodos],
              storedTodos: todos
            };
          }
        }
      }
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
  toggleStatusInStorage
} = todoSlice.actions;
export default todoSlice.reducer;