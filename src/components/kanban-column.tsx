import { useMemo } from "react"
import { useAppDispatch } from "../redux/hooks"

import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"

import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"

import KanbanItem from "./kanban-item"

import { type IIssue, type IColumn } from "../types"
import { updateIssuePosition } from "../redux/features/repo/repoSlice"

interface IKanbanColumnProps {
  column: IColumn
  items: IIssue[]
}

const KanbanColumn = ({ column, items }: IKanbanColumnProps) => {
  const dispatch = useAppDispatch()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const issuesIds = useMemo(() => {
    return items.map(item => item.id)
  }, [items])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <div className="w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
        <div className="text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between">
          <div className="flex gap-2">{column.title}</div>
        </div>

        <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
          <SortableContext items={issuesIds}>
            {items.map(item => (
              <KanbanItem key={item.id} item={item} />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  )

  function onDragEnd(event) {
    const { over, active } = event

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over.id)

      const newIssues = arrayMove(items, oldIndex, newIndex)

      dispatch(updateIssuePosition({ column: column.id, newIssues }))
    }
  }
}

export default KanbanColumn
