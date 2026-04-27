import { fetchTodoList } from '@/entities/todo'
import { useRequest } from 'alova/client'

export const useTodoWidget = () => useRequest(fetchTodoList())
