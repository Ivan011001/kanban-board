import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import { getRepoInfo, getRepoIssues } from "./repoOperations"

import { type AxiosResponse } from "axios"
import {
  type IIssue,
  type IRepoInfoResponse,
  type IRepoIssuesResponse,
} from "../../../types"

interface IRepoSlice {
  ownerUrl: string
  repoUrl: string
  name: string
  owner: string
  stars: number
  issues: IIssue[]
  loading: boolean
  error: string | null
}

const initialState: IRepoSlice = {
  ownerUrl: "",
  repoUrl: "",
  name: "",
  owner: "",
  stars: 0,
  issues: [],
  loading: false,
  error: null,
}

export const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRepoInfo.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        getRepoInfo.fulfilled,
        (state, action: PayloadAction<AxiosResponse<IRepoInfoResponse>>) => {
          state.loading = false
          const responseData = action.payload.data
          state.name = responseData.name
          state.owner = responseData.owner.login
          state.stars = responseData.stargazers_count
          state.ownerUrl = responseData.owner.html_url
          state.repoUrl = responseData.html_url
        },
      )
      .addCase(getRepoInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch repo information"
      })
      .addCase(getRepoIssues.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        getRepoIssues.fulfilled,
        (state, action: PayloadAction<AxiosResponse<IRepoIssuesResponse>>) => {
          state.loading = false
          const responseData = action.payload.data
          state.issues = responseData.map(issue => {
            return {
              id: issue.id,
              user: issue.user.login,
              title: issue.title,
              number: issue.number,
              comments: issue.comments,
              created_at: issue.created_at,
            }
          })
        },
      )
      .addCase(getRepoIssues.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch repo issues"
      })
  },
})

export const repoReducer = repoSlice.reducer
