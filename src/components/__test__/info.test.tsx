import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

import Info from "../info"

const mockStore = configureStore([])
const initialState = {
  repo: {
    loading: false,
    info: {
      name: "testName",
      owner: "testOwner",
      stars: 100,
      ownerUrl: "http://test.com",
      repoUrl: "http://test.com/repo",
    },
  },
}
const store = mockStore(initialState)

describe("Info Component", () => {
  test("renders with repo info correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Info />
      </Provider>,
    )

    expect(getByText("TestOwner")).toBeInTheDocument()
    expect(getByText("TestName")).toBeInTheDocument()
    expect(getByText("100 stars")).toBeInTheDocument()
  })

  test("does not render when loading", () => {
    const loadingState = {
      ...initialState,
      repo: { ...initialState.repo, loading: true },
    }
    const store = mockStore(loadingState)

    const { container } = render(
      <Provider store={store}>
        <Info />
      </Provider>,
    )

    expect(container.firstChild).toBeNull()
  })

  test("does not render without repo info", () => {
    const noRepoInfoState = {
      repo: {
        loading: false,
        info: null,
      },
    }
    const store = mockStore(noRepoInfoState)

    const { container } = render(
      <Provider store={store}>
        <Info />
      </Provider>,
    )

    expect(container.firstChild).toBeNull()
  })
})
