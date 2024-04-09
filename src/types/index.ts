export type ColumnState = "todo" | "progress" | "done"

export interface IIssue {
  id: number
  title: string
  number: number
  comments: number
  user: string
  created_at: string
  columnState: ColumnState
  assignee?: string
}

export interface IColumn {
  id: ColumnState
  title: string
}

export type IRepoInfoResponse = {
  name: string
  owner: {
    login: string
    html_url: string
  }
  stargazers_count: number
  html_url: string
  state: string
}

export type IRepoIssuesResponse = Array<{
  id: number
  user: { login: string }
  title: string
  number: number
  comments: number
  created_at: string
  state: "open" | "closed"
  assignee?: string
}>
