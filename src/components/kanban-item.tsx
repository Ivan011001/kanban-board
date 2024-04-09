import { type IIssue } from "../types"

import { formatDate } from "../helpers"

interface IKanbanItemProps {
  item: IIssue
}

const KanbanItem = ({ item }: IKanbanItemProps) => {
  const { title, number, created_at, user, comments } = item

  return (
    <div className="p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl cursor-grab relative">
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
