import { formatStars } from "."

describe("formatStars function", () => {
  test("it correctly formats numbers less than 1000", () => {
    const num = 500
    const result = formatStars(num)
    expect(result).toBe("500 stars")
  })

  test("it correctly formats numbers between 1000 and 999999", () => {
    const num = 12345
    const result = formatStars(num)
    expect(result).toBe("12k stars")
  })

  test("it correctly formats numbers greater than or equal to 1000000", () => {
    const num = 5678901
    const result = formatStars(num)
    expect(result).toBe("5.7m stars")
  })

  test("it correctly formats numbers at the upper limit", () => {
    const num = 999999
    const result = formatStars(num)
    expect(result).toBe("1000k stars")
  })
})
