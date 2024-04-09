import { formatDate } from "../../helpers"

describe("formatDate function", () => {
  test("it correctly formats today date", () => {
    const today = new Date().toISOString().slice(0, 10)
    const result = formatDate(today)
    expect(result).toBe("today")
  })

  test("it correctly formats date 1 day ago", () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const result = formatDate(yesterday.toISOString().slice(0, 10))
    expect(result).toBe("1 day ago")
  })

  test("it correctly formats date more than 1 day ago", () => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const result = formatDate(sevenDaysAgo.toISOString().slice(0, 10))
    expect(result).toBe("7 days ago")
  })

  test("it correctly formats date in the future", () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 3) // 3 days in the future
    const result = formatDate(futureDate.toISOString().slice(0, 10))
    expect(result.endsWith("ago")).toBe(true)
  })

  test("it throws an error for invalid date string", () => {
    const invalidDateString = "invalid date string"
    expect(() => {
      formatDate(invalidDateString)
    }).toThrow("Invalid Date")
  })
})
