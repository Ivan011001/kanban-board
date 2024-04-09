import SearchForm from "./components/search-form"
import Info from "./components/info"

const App = () => {
  return (
    <main className="px-10 py-10 flex flex-col gap-y-5">
      <SearchForm />
      <Info />
    </main>
  )
}

export default App
