import { useMemo } from "react"

import { SortableContext, useSortable } from "@dnd-kit/sortable"

import KanbanItem from "./kanban-item"

import { type IIssue, type IColumn } from "../types"

interface IKanbanColumnProps {
  column: IColumn
  items: IIssue[]
}

const KanbanColumn = ({ column, items }: IKanbanColumnProps) => {
  const issuesIds = useMemo(() => {
    return items.map(item => item.id)
  }, [items])

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  })

  return (
    <div
      ref={setNodeRef}
      className="w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div className="text-md h-[60px] rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-center">
        <p className="outline-none text-center">{column.title}</p>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={issuesIds}>
          {items.map(issue => (
            <KanbanItem key={issue.id} item={issue} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default KanbanColumn
