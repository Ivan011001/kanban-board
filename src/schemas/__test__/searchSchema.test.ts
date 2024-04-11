import { GitHubRepoSchema, searchSchema } from "../searchSchema"

import { z } from "zod"

describe("GitHubRepoSchema", () => {
  it("should validate a valid GitHub repository URL", () => {
    const validUrl = "https://github.com/username/repository"
    expect(() => GitHubRepoSchema.parse(validUrl)).not.toThrow()
  })

  it("should throw an error for an invalid GitHub repository URL", () => {
    const invalidUrl = "https://github.com/invalid-url"
    expect(() => GitHubRepoSchema.parse(invalidUrl)).toThrow(z.ZodError)
  })
})

describe("searchSchema", () => {
  it("should validate an object with a valid repoUrl", () => {
    const validObject = { repoUrl: "https://github.com/username/repository" }
    expect(() => searchSchema.parse(validObject)).not.toThrow()
  })

  it("should throw an error for an object with an invalid repoUrl", () => {
    const invalidObject = { repoUrl: "https://github.com/invalid-url" }
    expect(() => searchSchema.parse(invalidObject)).toThrow(z.ZodError)
  })
})
