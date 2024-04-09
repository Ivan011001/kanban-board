import KanbanItem from "./kanban-item"

import { type IIssue, type IColumn } from "../types"

interface IKanbanColumnProps {
  column: IColumn
  items: IIssue[]
}

const KanbanColumn = ({ column, items }: IKanbanColumnProps) => {
  return (
    <div>
      <h3 className="text-center p-2 font-bold text-[24px]">{column.title}</h3>
      <ul className="bg-gray-400 bg-opacity-25 h-[500px] w-[300px] overflow-auto">
        {items.map(issue => (
          <li key={issue.id}>
            <KanbanItem item={issue} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default KanbanColumn
