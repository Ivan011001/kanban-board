import axios, { type AxiosInstance } from "axios"

const baseURL = "https://api.github.com/repos"

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
})

export default axiosInstance
