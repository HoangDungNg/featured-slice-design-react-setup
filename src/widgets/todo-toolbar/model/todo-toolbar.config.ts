export const TODO_FILTERS = ['All', 'Active', 'Today'] as const

export const TODO_SORT_OPTIONS = [
  'Newest first',
  'Due date',
  'Priority',
  'Alphabetical',
] as const

export const TODO_BULK_ACTIONS = [
  'Mark complete',
  'Delete selected',
] as const

export type TodoFilter = typeof TODO_FILTERS[number]

export type TodoSortOption = typeof TODO_SORT_OPTIONS[number]

export type TodoBulkAction = typeof TODO_BULK_ACTIONS[number]
