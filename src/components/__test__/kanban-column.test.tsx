import { render } from "@testing-library/react"
import KanbanColumn from "../kanban-column"
import type { IIssue, IColumn } from "../../types"

describe("KanbanColumn Component", () => {
  const mockColumn: IColumn = {
    id: "todo",
    title: "To Do",
  }

  const mockItems: IIssue[] = [
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
  ]

  test("renders correctly", () => {
    const { getByText, getAllByText } = render(
      <KanbanColumn column={mockColumn} items={mockItems} />,
    )

    expect(getByText("To Do")).toBeInTheDocument()
    expect(getAllByText(/Issue \d/)).toHaveLength(2)
    expect(getAllByText("#123")).toHaveLength(1)
    expect(getAllByText("#124")).toHaveLength(1)
    expect(getAllByText("Test User")).toHaveLength(1)
    expect(getAllByText("Test User 2")).toHaveLength(1)
    expect(getAllByText("Comments: 5")).toHaveLength(1)
    expect(getAllByText("Comments: 3")).toHaveLength(1)
  })
})
