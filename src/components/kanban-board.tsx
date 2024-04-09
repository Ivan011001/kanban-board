import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../redux/hooks"

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { createPortal } from "react-dom"

import { updateIssuePosition } from "../redux/features/repo/repoSlice"

import {
  selectRepoIssues,
  selectRepoLoading,
} from "../redux/features/repo/repoSelectors"

import { TailSpin } from "react-loader-spinner"
import KanbanColumn from "./kanban-column"
import KanbanItem from "./kanban-item"

import { COLUMNS } from "../constants"

import type { IColumn, IIssue } from "../types"
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

const KanbanBoard = () => {
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(selectRepoLoading)
  const issues = useAppSelector(selectRepoIssues)

  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null)
  const [activeIssue, setActiveIssue] = useState<IIssue | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  if (isLoading) {
    return (
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="blue"
        ariaLabel="tail-spin-loading"
        wrapperClass="w-full h-full flex items-center justify-center"
      />
    )
  }

  return (
    <div className="m-auto flex w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            {COLUMNS.map(col => (
              <KanbanColumn key={col.id} column={col} items={issues[col.id]} />
            ))}
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanColumn
                column={activeColumn}
                items={issues[activeColumn.id]}
              />
            )}
            {activeIssue && <KanbanItem item={activeIssue} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  )

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column)
      return
    }

    if (event.active.data.current?.type === "Issue") {
      setActiveIssue(event.active.data.current.issue)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const currentIssue: IIssue = active.data.current?.issue

    if (!currentIssue) return

    const { columnState } = currentIssue

    if (active.id !== over.id) {
      const oldIndex = issues[columnState].findIndex(
        item => item.id === active.id,
      )
      const newIndex = issues[columnState].findIndex(
        item => item.id === over.id,
      )

      const newIssues = arrayMove(issues[columnState], oldIndex, newIndex)

      dispatch(updateIssuePosition({ column: columnState, newIssues }))
    }
  }
}

export default KanbanBoard
