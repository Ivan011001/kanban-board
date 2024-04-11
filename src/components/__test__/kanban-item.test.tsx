import { render } from "@testing-library/react"

import KanbanItem from "../kanban-item"
import type { IIssue } from "../../types"
import { formatDate } from "../../helpers"

describe("KanbanItem Component", () => {
  const mockIssue: IIssue = {
    id: 1,
    title: "Test Issue",
    number: 123,
    openedAt: "2024-04-10T23:15:59Z",
    user: "Test User",
    comments: 5,
    columnState: "todo",
  }

  test("renders correctly", () => {
    const { getByText } = render(<KanbanItem item={mockIssue} />)

    expect(getByText("Test Issue")).toBeInTheDocument()
    expect(getByText("#123")).toBeInTheDocument()
    expect(
      getByText(`opened ${formatDate("2024-04-10T23:15:59Z")}`),
    ).toBeInTheDocument()
    expect(getByText("Test User")).toBeInTheDocument()
    expect(getByText("Comments: 5")).toBeInTheDocument()
  })
})
