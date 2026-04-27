import { alovaInstance } from '@/shared/api'
import { TODO_ENDPOINTS } from '../config/todo-endpoint.config'

export const deleteTodo = (id: string) =>
  alovaInstance.Delete(TODO_ENDPOINTS.TASK_DETAIL(id), undefined, { name: 'delete-todo' })
