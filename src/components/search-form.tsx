import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

import {
  selectRepoLoading,
  selectRepoUrl,
} from "../redux/features/repo/repoSelectors"

import { zodResolver } from "@hookform/resolvers/zod"
import { searchSchema } from "../schemas"

import { Input, Button } from "antd"

import {
  getRepoInfo,
  getRepoIssues,
} from "../redux/features/repo/repoOperations"

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
    defaultValues: {
      repoUrl: storedRepoUrl ?? "",
    },
  })

  const onSubmit: SubmitHandler<Inputs> = ({ repoUrl }) => {
    dispatch(getRepoInfo(repoUrl))
    dispatch(getRepoIssues(repoUrl))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex gap-x-2 items-start"
    >
      <div className="flex-grow">
        <Controller
          disabled={isLoading}
          control={control}
          name="repoUrl"
          render={({ field }) => (
            <Input
              {...field}
              key={field.name}
              placeholder="Enter repo URL"
              allowClear
              size="large"
              className="h-10"
            />
          )}
        />

        {errors.repoUrl && (
          <p className="text-sm text-red-500">{errors.repoUrl.message}</p>
        )}
      </div>

      <Button htmlType="submit" className="h-10" type="default">
        Load issues
      </Button>
    </form>
  )
}

export default SearchForm
