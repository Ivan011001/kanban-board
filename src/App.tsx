import SearchForm from "./components/search-form"
import Info from "./components/info"
import KanbanBoard from "./components/kanban-board"

const App = () => {
  return (
    <main className="px-10 py-10 flex flex-col gap-y-5 h-full">
      <SearchForm />
      <Info />
      <KanbanBoard />
    </main>
  )
}

export default App
