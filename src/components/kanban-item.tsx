import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { type IIssue } from "../types"

import { formatDate } from "../helpers"

import { cn } from "../lib/utils"

interface IKanbanItemProps {
  item: IIssue
}

const KanbanItem = ({ item }: IKanbanItemProps) => {
  const { title, number, created_at, user, comments } = item

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: "Issue",
      item,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative select-none",
        isDragging && "opacity-30",
      )}
    >
      <div className="overflow-hidden">
        <h3 className="font-bold overflow-hidden whitespace-nowrap w-full truncate">
          {title}
        </h3>

        <div className="flex items-center gap-x-1 text-gray-500">
          <p>#{number}</p>
          <p>opened {formatDate(created_at)}</p>
        </div>

        <div className="flex items-center gap-x-1 text-gray-500">
          <p>{user}</p>
          <span>|</span>
          <p>Comments: {comments}</p>
        </div>
      </div>
    </div>
  )
}

export default KanbanItem
