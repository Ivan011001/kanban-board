import { cn } from "../../lib/utils"

describe("cn function", () => {
  test("it combines class names correctly", () => {
    const result = cn("class1", "class2")
    expect(result).toBe("class1 class2")
  })

  test("it handles empty inputs", () => {
    const result = cn()
    expect(result).toBe("")
  })

  test("it handles falsy inputs", () => {
    const result = cn("class1", null, undefined, "", 0, false)
    expect(result).toBe("class1")
  })

  test("it merges tailwind classes correctly", () => {
    const result = cn("bg-blue-500", "text-white", "hover:bg-blue-700")
    expect(result).toBe("bg-blue-500 text-white hover:bg-blue-700")
  })
})
