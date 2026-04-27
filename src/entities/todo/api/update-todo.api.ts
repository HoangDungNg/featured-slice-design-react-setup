import { alovaInstance } from '@/shared/api'
import { TODO_ENDPOINTS } from '../config/todo-endpoint.config'
import { normalizeTodo, type TodoApiItem, type TodoUpdateInput } from '../model/todo.model'

export const updateTodo = (id: string, todo: TodoUpdateInput) =>
  alovaInstance.Post(TODO_ENDPOINTS.TASK_DETAIL(id), todo, {
    name: 'update-todo',
    transform: (rawData: TodoApiItem) => normalizeTodo(rawData),
  })
