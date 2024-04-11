import { render, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import SearchForm from "../search-form"

const mockStore = configureStore([])

describe("SearchForm Component", () => {
  test("renders correctly", () => {
    const store = mockStore({
      repo: {
        loading: false,
        url: "",
      },
    })

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchForm />
      </Provider>,
    )

    expect(getByPlaceholderText("Enter repo URL")).toBeInTheDocument()
    expect(getByText("Load issues")).toBeInTheDocument()
  })

  test("submits form correctly", async () => {
    const store = mockStore({
      repo: {
        loading: false,
        url: "",
      },
    })

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchForm />
      </Provider>,
    )

    const input = getByPlaceholderText("Enter repo URL")
    const button = getByText("Load issues")

    fireEvent.change(input, { target: { value: "https://example.com/repo" } })
    fireEvent.click(button)
  })
})
