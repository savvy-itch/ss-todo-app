import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import './globals.css';

// update page amount on task creation/deletion
// add Enter and Escape controls
// responsiveness
// add comments

function App() {
  return (
    <main className="flex min-h-screen justify-center items-center bg-neutral-200">
      <div className="flex flex-col w-2/3 gap-3">
        <AddTodoForm />
        <TodoList />
      </div>
    </main>
  )
}

export default App