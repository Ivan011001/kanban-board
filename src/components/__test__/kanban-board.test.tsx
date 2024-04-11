import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import configureMockStore from "redux-mock-store"

import KanbanBoard from "../kanban-board"

const mockStore = configureMockStore([])

const mockRepoState = {
  issues: {
    todo: [
      {
        id: 1,
        title: "Issue 1",
        number: 123,
        openedAt: "2024-04-10T23:15:59Z",
        user: "Test User",
        comments: 5,
        columnState: "todo",
      },
      {
        id: 2,
        title: "Issue 2",
        number: 124,
        openedAt: "2024-04-11T10:30:00Z",
        user: "Test User 2",
        comments: 3,
        columnState: "todo",
      },
    ],
    progress: [],
    done: [],
  },
  loading: false,
}

describe("KanbanBoard Component", () => {
  let store: any

  beforeEach(() => {
    store = mockStore({
      repo: mockRepoState,
    })
  })

  test("renders correctly", () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <KanbanBoard />
      </Provider>,
    )

    expect(getByText("ToDo")).toBeInTheDocument()
    expect(getByText("In Progress")).toBeInTheDocument()
    expect(getByText("Done")).toBeInTheDocument()
    expect(getAllByText(/Issue \d/)).toHaveLength(2)
    expect(getAllByText("#123")).toHaveLength(1)
    expect(getAllByText("#124")).toHaveLength(1)
    expect(getAllByText("Test User")).toHaveLength(1)
    expect(getAllByText("Test User 2")).toHaveLength(1)
    expect(getAllByText("Comments: 5")).toHaveLength(1)
    expect(getAllByText("Comments: 3")).toHaveLength(1)
  })

  test("renders loading spinner when loading", () => {
    const loadingStore = mockStore({
      repo: { ...mockRepoState, loading: true },
    })

    const { getByLabelText } = render(
      <Provider store={loadingStore}>
        <KanbanBoard />
      </Provider>,
    )

    expect(getByLabelText("tail-spin-loading")).toBeInTheDocument()
  })
})
