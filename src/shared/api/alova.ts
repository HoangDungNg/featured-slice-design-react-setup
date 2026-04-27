import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import ReactHook from 'alova/react'

export const alovaInstance = createAlova({
  requestAdapter: adapterFetch(),
  statesHook: ReactHook,
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  id: 'app',
  beforeRequest(method) {
    method.config.headers = {
      ...method.config.headers,
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    }
  },
  responded: async (response: Response) => {
    if (!response.ok) {
      throw new Error(response.statusText || `Request failed with status ${response.status}`)
    }

    if (response.status === 204) return null

    return response.json()
  },
})
