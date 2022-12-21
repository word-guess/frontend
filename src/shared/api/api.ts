import axios, { AxiosRequestConfig } from 'axios'

const baseURL = process.env.REACT_APP_BACKEND_URL

export const backendApi = axios.create({ baseURL, withCredentials: true })

export const backendSWRFetcher = (url: string, config?: AxiosRequestConfig) => {
  return backendApi.get(url, config).then((response) => response.data)
}
