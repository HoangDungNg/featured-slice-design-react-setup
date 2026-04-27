const TODO_ENDPOINT = '/tasks'
const TODO_ENDPOINTS = {
  TASK_LIST: `/api/v1${TODO_ENDPOINT}`,
  TASK_DETAIL: (taskId: string) => `/api/v1${TODO_ENDPOINT}/${taskId}`,
  TASK_CLOSE: (taskId: string) => `/api/v1${TODO_ENDPOINT}/${taskId}/close`,
  TASK_FILTER: `/api/v1${TODO_ENDPOINT}/filter`,
}

export { TODO_ENDPOINTS }
