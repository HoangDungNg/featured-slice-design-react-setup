import { alovaInstance } from '@/shared/api'
import { normalizeTodo, type TodoApiItem } from '../model/todo.model'

export const fetchTodoList = () =>
  alovaInstance.Get('/todos', {
    name: 'todo-list',
    transform: (rawData: TodoApiItem[]) => rawData.map(normalizeTodo),
  })
