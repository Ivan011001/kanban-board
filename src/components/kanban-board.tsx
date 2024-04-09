import { useAppSelector } from "../redux/hooks"

import {
  selectRepoIssues,
  selectRepoLoading,
} from "../redux/features/repo/repoSelectors"

import { COLUMNS } from "../constants"

import KanbanColumn from "./kanban-column"

import { TailSpin } from "react-loader-spinner"

const KanbanBoard = () => {
  const isLoading = useAppSelector(selectRepoLoading)
  const issues = useAppSelector(selectRepoIssues)

  console.log(issues)

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
    <div className="w-full flex items-center justify-center">
      <ul className="flex gap-x-20">
        {COLUMNS.map(column => (
          <li key={column.id}>
            <KanbanColumn items={issues[column.id]} column={column} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default KanbanBoard
