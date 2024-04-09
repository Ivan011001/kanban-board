import { extractRepo } from "../../helpers"

describe("extractRepo function", () => {
  test("it correctly extracts repository owner and name from GitHub URL", () => {
    const repoUrl = "https://github.com/user/repo"
    const result = extractRepo(repoUrl)
    expect(result).toBe("/user/repo")
  })

  test("it throws an error for uncomplete GitHub URL", () => {
    const invalidUrl = "https://github.com/user"
    expect(() => {
      extractRepo(invalidUrl)
    }).toThrow("Invalid GitHub URL")
  })

  test("it throws an error for invalid GitHub URL", () => {
    const invalidUrl = "https://github.com"
    expect(() => {
      extractRepo(invalidUrl)
    }).toThrow("Invalid GitHub URL")
  })
})
