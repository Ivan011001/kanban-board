import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

import {
  selectRepoLoading,
  selectRepoUrl,
} from "../redux/features/repo/repoSelectors"

import { zodResolver } from "@hookform/resolvers/zod"
import { searchSchema } from "../schemas"

import { Input } from "antd"

import {
  getRepoInfo,
  getRepoIssues,
} from "../redux/features/repo/repoOperations"

const { Search } = Input

type Inputs = {
  repoUrl: string
}

const SearchForm = () => {
  const dispatch = useAppDispatch()

  const storedRepoUrl = useAppSelector(selectRepoUrl)
  const isLoading = useAppSelector(selectRepoLoading)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(searchSchema),
  })

  const onSubmit: SubmitHandler<Inputs> = ({ repoUrl }) => {
    dispatch(getRepoInfo(repoUrl))
    dispatch(getRepoIssues(repoUrl))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        defaultValue={storedRepoUrl ?? ""}
        disabled={isLoading}
        control={control}
        name="repoUrl"
        render={({ field }) => (
          <Search
            {...field}
            key={field.name}
            placeholder="Enter repo URL"
            allowClear
            enterButton="Search"
            size="large"
            loading={isLoading}
            onSearch={() => handleSubmit(onSubmit)()}
          />
        )}
      />

      {errors.repoUrl && (
        <p className="text-sm text-red-500">{errors.repoUrl.message}</p>
      )}
    </form>
  )
}

export default SearchForm
