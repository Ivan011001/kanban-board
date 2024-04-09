import { useSortable } from "@dnd-kit/sortable"

import { SortableContext } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import KanbanItem from "./kanban-item"

import { type IIssue, type IColumn } from "../types"

interface IKanbanColumnProps {
  column: IColumn
  items: IIssue[]
}

const KanbanColumn = ({ column, items }: IKanbanColumnProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-40 border-2 border-pink-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className="text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">{column.title}</div>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={items}>
          {items.map(item => (
            <KanbanItem key={item.id} item={item} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default KanbanColumn
