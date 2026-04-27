import { alovaInstance } from '@/shared/api'
import { TODO_ENDPOINTS } from '../config/todo-endpoint.config'
import { normalizeTodo, type TodoApiItem, type TodoWriteInput } from '../model/todo.model'

export const createTodo = (todo: TodoWriteInput) =>
  alovaInstance.Post(TODO_ENDPOINTS.TASK_LIST, todo, {
    name: 'create-todo',
    transform: (rawData: TodoApiItem) => normalizeTodo(rawData),
  })
