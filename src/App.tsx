import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import './globals.css';

function App() {
  return (
    <main className="flex min-h-screen justify-center items-center bg-orange-300">
      <div className="flex flex-col w-11/12 md:w-2/3 xl:w-2/4 gap-3">
        <AddTodoForm />
        <TodoList />
      </div>
    </main>
  )
}

export default App