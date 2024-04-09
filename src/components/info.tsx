import { useAppSelector } from "../redux/hooks"

import {
  selectRepoName,
  selectRepoOwner,
  selectRepoOwnerUrl,
  selectRepoStars,
  selectRepoUrl,
  selectRepoLoading,
} from "../redux/features/repo/repoSelectors"

import { TailSpin } from "react-loader-spinner"

import { FaRegStar } from "react-icons/fa"

import { capitalizeWord, formatStars } from "../helpers"

const Info = () => {
  const isLoading = useAppSelector(selectRepoLoading)
  const repoName = useAppSelector(selectRepoName)
  const repoUrl = useAppSelector(selectRepoUrl)
  const repoOwner = useAppSelector(selectRepoOwner)
  const repoOwnerUrl = useAppSelector(selectRepoOwnerUrl)
  const repoStars = useAppSelector(selectRepoStars)

  if (!repoName || !repoOwner) {
    return null
  }

  if (isLoading) {
    return (
      <TailSpin
        visible={true}
        height="40"
        width="40"
        color="blue"
        ariaLabel="tail-spin-loading"
      />
    )
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="flex items-center gap-x-2 text-blue-600">
        <a
          href={repoOwnerUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="hover:underline"
        >
          {capitalizeWord(repoOwner)}
        </a>
        <span className="text-black">&gt;</span>
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="hover:underline"
        >
          {capitalizeWord(repoName)}
        </a>
      </div>

      <div className="flex items-center gap-x-2">
        <FaRegStar fill="orange" color="orange" />
        <p>
          {formatStars(repoStars)} {repoStars !== 1 ? "stars" : "star"}
        </p>
      </div>
    </div>
  )
}

export default Info
