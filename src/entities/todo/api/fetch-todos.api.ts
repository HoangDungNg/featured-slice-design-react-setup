import { alovaInstance } from '@/shared/api'
import { TODO_ENDPOINTS } from '../config/todo-endpoint.config'
import { normalizeTodo, type TodoApiListResponse } from '../model/todo.model'

export const fetchTodoList = () =>
  alovaInstance.Get(TODO_ENDPOINTS.TASK_LIST, {
    name: 'todo-list',
    transform: (rawData: TodoApiListResponse) => rawData.results.map(normalizeTodo),
  })
