export function extractRepo(repoUrl: string) {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)$/)

  if (match && match.length === 3) {
    const owner: string = match[1]
    const name: string = match[2]
    return `/${owner}/${name}`
  } else {
    throw new Error("Invalid GitHub URL")
  }
}
