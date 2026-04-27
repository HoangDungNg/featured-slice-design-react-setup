import { alovaInstance } from '@/shared/api'
import { TODO_ENDPOINTS } from '../config/todo-endpoint.config'

export const closeTodo = (id: string) =>
  alovaInstance.Post(TODO_ENDPOINTS.TASK_CLOSE(id), undefined, { name: 'close-todo' })
