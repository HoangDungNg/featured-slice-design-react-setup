import { alovaInstance } from '@/shared/api'
import { TODO_ENDPOINTS } from '../config/todo-endpoint.config'
import { getTodoApiItems, normalizeTodo, type TodoApiListData } from '../model/todo.model'

export const fetchTodoListByFilter = (query: string) =>
  alovaInstance.Get(TODO_ENDPOINTS.TASK_FILTER, {
    name: 'todo-list-by-filter',
    params: { query },
    transform: (rawData: TodoApiListData) => getTodoApiItems(rawData).map(normalizeTodo),
  })
