export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export interface TodoSliceType {
  fetchedTodos: Todo[],
  storedTodos: Todo[],
  allTodos: Todo[],
  currentPage: number,
  isEditMode: boolean
}

export interface TodosRootType {
  todos: TodoSliceType
}

export interface PaginationSliceType {
  currentPage: number
}