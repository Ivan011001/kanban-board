import { type RootState } from "../../store"

export const selectRepoName = (state: RootState) => state.repo.name

export const selectRepoUrl = (state: RootState) => state.repo.repoUrl

export const selectRepoOwner = (state: RootState) => state.repo.owner

export const selectRepoOwnerUrl = (state: RootState) => state.repo.ownerUrl

export const selectRepoStars = (state: RootState) => state.repo.stars

export const selectRepoIssues = (state: RootState) => state.repo.issues

export const selectRepoLoading = (state: RootState) => state.repo.loading

export const selectRepoError = (state: RootState) => state.repo.error
