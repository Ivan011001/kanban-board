import { useAppSelector } from "../redux/hooks"

import {
  selectRepoInfo,
  selectRepoUrl,
  selectRepoLoading,
} from "../redux/features/repo/repoSelectors"

import { FaRegStar } from "react-icons/fa"

import { capitalizeWord, formatStars } from "../helpers"

const Info = () => {
  const isLoading = useAppSelector(selectRepoLoading)
  const repoInfo = useAppSelector(selectRepoInfo)
  const repoUrl = useAppSelector(selectRepoUrl)

  const { name, owner, stars, ownerUrl } = repoInfo ?? ""

  if (!name || !owner || isLoading) {
    return null
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="flex items-center gap-x-2 text-blue-600">
        <a
          href={ownerUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="hover:underline"
        >
          {capitalizeWord(owner)}
        </a>
        <span className="text-black">&gt;</span>
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="hover:underline"
        >
          {capitalizeWord(name)}
        </a>
      </div>

      <div className="flex items-center gap-x-2">
        <FaRegStar fill="orange" color="orange" />
        <p>{formatStars(stars)}</p>
      </div>
    </div>
  )
}

export default Info
