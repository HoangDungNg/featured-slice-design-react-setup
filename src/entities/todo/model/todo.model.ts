export type TodoPriority = 'low' | 'medium' | 'high'

export type TodoStatus = 'Todo' | 'In Progress' | 'Done'

export type TodoApiPriority = 'Low' | 'Medium' | 'High'

export type TodoApiStatus = 'Not Started' | 'In Progress' | 'Done'

export type TodoApiItem = {
  _id: string
  title: string
  description: string
  dueDate: string
  priority: TodoApiPriority
  status: TodoApiStatus
  tags: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

export type Todo = {
  id: string
  title: string
  description: string
  dueDate: string
  priority: TodoPriority
  status: TodoStatus
  tags: string[]
  createdAt: string
  updatedAt: string
  version: number
}

export type TodoWritePriority = TodoApiPriority

export type TodoWriteStatus = TodoApiStatus

export type TodoWriteInput = {
  title: string
  description: string
  dueDate: string
  priority: TodoWritePriority
  status: TodoWriteStatus
  tags?: string[]
}

export type TodoCreateResponse = {
  message: string
  data: {
    id: string
    title: string
    description: string
    dueDate: string
    priority: TodoApiPriority
    status: TodoApiStatus
    tags: string[]
  }
}

const priorityMap: Record<TodoApiPriority, TodoPriority> = {
  High: 'high',
  Medium: 'medium',
  Low: 'low',
}

const statusMap: Record<TodoApiStatus, TodoStatus> = {
  'Not Started': 'Todo',
  'In Progress': 'In Progress',
  Done: 'Done',
}

export const normalizeTodo = (todo: TodoApiItem): Todo => ({
  id: todo._id,
  title: todo.title,
  description: todo.description,
  dueDate: todo.dueDate,
  priority: priorityMap[todo.priority],
  status: statusMap[todo.status],
  tags: todo.tags,
  createdAt: todo.createdAt,
  updatedAt: todo.updatedAt,
  version: todo.__v,
})
