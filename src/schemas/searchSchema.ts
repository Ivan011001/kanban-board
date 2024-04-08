import * as z from "zod"

export const GitHubRepoSchema = z.string().refine(
  url => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)\/?$/
    return regex.test(url)
  },
  {
    message:
      "Invalid GitHub repository URL format: https://github.com/{owner}/{name}",
  },
)

export const searchSchema = z.object({
  repoUrl: GitHubRepoSchema,
})
