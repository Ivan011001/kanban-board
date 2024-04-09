import { type RootState } from "../../store"

export const selectRepoInfo = (state: RootState) => state.repo.info

export const selectRepoUrl = (state: RootState) => state.repo.repoUrl

export const selectRepoIssues = (state: RootState) => state.repo.issues

export const selectRepoLoading = (state: RootState) => state.repo.loading

export const selectRepoError = (state: RootState) => state.repo.error
