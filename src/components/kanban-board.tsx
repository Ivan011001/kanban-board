import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../redux/hooks"

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { createPortal } from "react-dom"

import {
  loadIssues,
  updateIssuePosition,
} from "../redux/features/repo/repoSlice"

import {
  selectRepoIssues,
  selectRepoLoading,
  selectRepoUrl,
} from "../redux/features/repo/repoSelectors"

import { TailSpin } from "react-loader-spinner"
import KanbanColumn from "./kanban-column"
import KanbanItem from "./kanban-item"

import { COLUMNS } from "../constants"

import type { ColumnState, IColumn, IIssue } from "../types"
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core"

import { arrayMove } from "@dnd-kit/sortable"
import Greeting from "./greeting"

const KanbanBoard = () => {
  const dispatch = useAppDispatch()

  const repoUrl = useAppSelector(selectRepoUrl)
  const issues = useAppSelector(selectRepoIssues)
  const isLoading = useAppSelector(selectRepoLoading)

  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null)
  const [activeIssue, setActiveIssue] = useState<IIssue | null>(null)

  useEffect(() => {
    dispatch(loadIssues())
  }, [dispatch])

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

  if (!repoUrl) return <Greeting />

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

    if (active.id === over.id) return

    let overIssue: IIssue | null = null
    if (typeof over.id === "number") {
      overIssue = getOverIssue(over, over.id)
    }

    if (
      typeof over.id === "string" &&
      issues[over.id as ColumnState].length === 0
    ) {
      const updatedIssue = {
        ...currentIssue,
        columnState: over.id as ColumnState,
      }

      dispatch(
        updateIssuePosition({
          column: over.id as ColumnState,
          newIssues: [updatedIssue],
        }),
      )

      dispatch(
        updateIssuePosition({
          column: currentIssue.columnState,
          newIssues: [
            ...issues[currentIssue.columnState].filter(
              issue => issue.id !== currentIssue.id,
            ),
          ],
        }),
      )

      return
    } else if (
      typeof over.id === "string" &&
      issues[over.id as ColumnState].length !== 0 &&
      over.id !== currentIssue.columnState
    ) {
      const newIssues = [
        ...issues[over.id as ColumnState],
        {
          ...currentIssue,
          columnState: over.id as ColumnState,
        },
      ]

      dispatch(
        updateIssuePosition({
          column: over.id as ColumnState,
          newIssues,
        }),
      )

      dispatch(
        updateIssuePosition({
          column: currentIssue.columnState,
          newIssues: [
            ...issues[currentIssue.columnState].filter(
              issue => issue.id !== currentIssue.id,
            ),
          ],
        }),
      )

      return
    } else if (
      typeof over.id === "number" &&
      overIssue &&
      (overIssue as IIssue).columnState !== currentIssue.columnState
    ) {
      const newIndex = issues[
        (overIssue as IIssue).columnState as ColumnState
      ].findIndex(item => item.id === over.id)

      const modifiedIssues =
        issues[(overIssue as IIssue).columnState as ColumnState].slice()
      modifiedIssues.splice(newIndex, 0, {
        ...currentIssue,
        columnState: (overIssue as IIssue).columnState as ColumnState,
      })

      const newIssues = [...modifiedIssues]

      dispatch(
        updateIssuePosition({
          column: (overIssue as IIssue).columnState as ColumnState,
          newIssues,
        }),
      )

      dispatch(
        updateIssuePosition({
          column: currentIssue.columnState,
          newIssues: [
            ...issues[currentIssue.columnState].filter(
              issue => issue.id !== currentIssue.id,
            ),
          ],
        }),
      )

      return
    }

    const oldIndex = issues[columnState].findIndex(
      item => item.id === active.id,
    )
    const newIndex = issues[columnState].findIndex(item => item.id === over.id)
    const newIssues = arrayMove(issues[columnState], oldIndex, newIndex)
    dispatch(updateIssuePosition({ column: columnState, newIssues }))
  }

  function getOverIssue(over: any, id: number) {
    let overIssue: IIssue | null = null

    Object.keys(issues).forEach(status => {
      const items = issues[status as ColumnState]

      const foundItem = items.find(item => item.id === over!.id)

      if (foundItem) {
        overIssue = foundItem
        return
      }
    })

    return overIssue
  }
}

export default KanbanBoard
