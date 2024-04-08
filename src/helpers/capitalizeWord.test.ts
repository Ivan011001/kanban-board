import { capitalizeWord } from "."

describe("capitalizeWord function", () => {
  test("it capitalizes the first letter of a word", () => {
    const word = "hello"
    const result = capitalizeWord(word)
    expect(result).toBe("Hello")
  })

  test("it returns an empty string if given an empty string", () => {
    const word = ""
    const result = capitalizeWord(word)
    expect(result).toBe("")
  })

  test("it maintains capitalization of subsequent letters", () => {
    const word = "wOrLD"
    const result = capitalizeWord(word)
    expect(result).toBe("WOrLD")
  })
})
