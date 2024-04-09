import { createAsyncThunk } from "@reduxjs/toolkit"

import axiosInstance from "../../../lib/axiosInstance"

import { extractRepo } from "../../../helpers"

export const getRepoInfo = createAsyncThunk(
  "repo/info",
  async (repoUrl: string, { rejectWithValue }) => {
    try {
      const ownerAndName = extractRepo(repoUrl)

      const response = await axiosInstance.get(ownerAndName)

      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const getRepoIssues = createAsyncThunk(
  "repo/issues",
  async (repoUrl: string, { rejectWithValue }) => {
    try {
      const ownerAndName = extractRepo(repoUrl)

      const response = await axiosInstance.get(
        `${ownerAndName}/issues?state=all`,
      )

      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
