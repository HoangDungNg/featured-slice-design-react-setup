export type TodoPriority = 'low' | 'medium' | 'high'

export type TodoStatus = 'Todo' | 'Done'

export type TodoApiPriority = 1 | 2 | 3 | 4

export type TodoApiStatus = boolean

export type TodoApiDue = {
  date?: string
  datetime?: string
  is_recurring?: boolean
  lang?: string
  string?: string
  timezone?: string | null
}

export type TodoApiDeadline = {
  date: string
  lang?: string
}

export type TodoApiDuration = {
  amount: number
  unit: 'minute' | 'day'
}

export type TodoApiItem = {
  user_id: string
  id: string
  project_id: string
  section_id: string | null
  parent_id: string | null
  added_by_uid: string | null
  assigned_by_uid: string | null
  responsible_uid: string | null
  labels: string[]
  deadline: TodoApiDeadline | null
  duration: TodoApiDuration | null
  is_collapsed: boolean
  checked: TodoApiStatus
  is_deleted: boolean
  added_at: string
  completed_at: string | null
  completed_by_uid: string | null
  updated_at: string
  due: TodoApiDue | null
  priority: TodoApiPriority
  child_order: number
  content: string
  description: string
  note_count: number
  day_order: number
  goal_ids: string[]
}

export type TodoApiListResponse = {
  results: TodoApiItem[]
  next_cursor: string | null
}

export type TodoApiListData = TodoApiItem[] | TodoApiListResponse

export type Todo = {
  id: string
  title: string
  description: string
  dueDate: string | null
  priority: TodoPriority
  status: TodoStatus
  tags: string[]
  createdAt: string
  updatedAt: string
  version: number | null
}

export type TodoWritePriority = TodoApiPriority

export type TodoWriteStatus = TodoApiStatus

export type TodoWriteInput = {
  content: string
  description?: string
  project_id?: string | null
  section_id?: string | null
  parent_id?: string | null
  order?: number | null
  labels?: string[] | null
  priority?: TodoWritePriority | null
  assignee_id?: number | null
  due_string?: string | null
  due_date?: string | null
  due_datetime?: string | null
  due_lang?: string | null
  duration?: number | null
  duration_unit?: TodoApiDuration['unit'] | null
  deadline_date?: string | null
}

export type TodoUpdateInput = Partial<TodoWriteInput> & {
  child_order?: number
  is_collapsed?: boolean
  day_order?: number
}

export type TodoMoveInput = {
  project_id?: string | null
  section_id?: string | null
  parent_id?: string | null
}

export type TodoCreateResponse = TodoApiItem

const priorityMap: Record<TodoApiPriority, TodoPriority> = {
  1: 'high',
  2: 'high',
  3: 'medium',
  4: 'low',
}

const statusMap: Record<`${TodoApiStatus}`, TodoStatus> = {
  false: 'Todo',
  true: 'Done',
}

const getTodoDueDate = (todo: TodoApiItem) => todo.due?.date ?? todo.due?.datetime ?? null

export const getTodoApiItems = (data: TodoApiListData) => Array.isArray(data) ? data : data.results

export const normalizeTodo = (todo: TodoApiItem): Todo => ({
  id: todo.id,
  title: todo.content,
  description: todo.description,
  dueDate: getTodoDueDate(todo),
  priority: priorityMap[todo.priority],
  status: statusMap[`${todo.checked}`],
  tags: todo.labels,
  createdAt: todo.added_at,
  updatedAt: todo.updated_at,
  version: null,
})
