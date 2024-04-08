export function formatStars(num: number): string {
  if (num < 1000) {
    return num.toString()
  } else if (num < 1000000) {
    if (num < 999500) {
      return (num / 1000).toFixed(0) + "k"
    } else {
      return ((num + 500) / 1000).toFixed(0) + "k"
    }
  } else {
    return (num / 1000000).toFixed(1) + "m"
  }
}
