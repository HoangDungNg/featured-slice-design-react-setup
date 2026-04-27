import { useRequest } from 'alova/client'
import { Pencil } from 'lucide-react'
import { type MouseEvent, useCallback, useState } from 'react'

import { fetchTodoListByFilter, type Todo } from '@/entities/todo'
import { UpdateTodo } from '@/features/update-todo/ui/update-todo.ui'

const priorityStyles = {
  low: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
  medium: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
  high: 'border-rose-500/20 bg-rose-500/10 text-rose-300',
} as const

const statusStyles = {
  Todo: 'border-zinc-700 bg-zinc-900 text-zinc-300',
  'In Progress': 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300',
  Done: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
} as const

interface TodoListProps {
  error?: Error
  isLoading?: boolean
  items?: Todo[]
  selectedTodoId?: string | null
  onSelectTodo?: (todoId: string) => void
  onTodoUpdated?: (todo: Todo) => void
  totalActive?: number
}

const formatDueDate = (dueDate: string | null) => {
  if (!dueDate) return 'No due date'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dueDate))
}

export const TodoList = (
  {
    error,
    isLoading = false,
    items = [],
    selectedTodoId = null,
    onSelectTodo,
    onTodoUpdated,
    totalActive = 0,
  }: TodoListProps,
) => {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const { data: todayTodoList = [], error: todayError, loading: todayLoading } = useRequest(
    fetchTodoListByFilter('today'),
  )

  const handleTodoButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    onSelectTodo?.(event.currentTarget.value)
  }, [onSelectTodo])

  const handleEditButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const todo = items.find((item) => item.id === event.currentTarget.value)
    if (!todo) return

    setEditingTodo(todo)
  }, [items])

  const handleEditOpenChange = useCallback((isOpen: boolean) => {
    if (isOpen) return

    setEditingTodo(null)
  }, [])

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Tasks</h2>
              <p className="mt-1 text-sm text-zinc-400">Live data from the todo API</p>
            </div>

            <span className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-400">
              {totalActive} active
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {isLoading && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 text-zinc-400">
                Loading tasks...
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-5 text-rose-300">
                Failed to load tasks.
              </div>
            )}

            {!isLoading && !error && items.length === 0 && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 text-zinc-400">
                No tasks are available yet.
              </div>
            )}

            {!isLoading && !error && items.map((item) => {
              const isSelected = item.id === selectedTodoId

              return (
                <article key={item.id} className="relative">
                  <button
                    aria-pressed={isSelected}
                    type="button"
                    value={item.id}
                    className={`w-full rounded-2xl border p-5 pr-14 text-left transition duration-300 hover:-translate-y-0.5 ${
                      isSelected
                        ? 'border-cyan-400/60 bg-cyan-400/10 shadow-lg shadow-cyan-950/30'
                        : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700 hover:bg-zinc-950'
                    }`}
                    onClick={handleTodoButtonClick}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 leading-7 text-zinc-400">{item.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            priorityStyles[item.priority]
                          }`}
                        >
                          {item.priority} priority
                        </span>
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            statusStyles[item.status]
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between text-sm text-zinc-400">
                      <span>Due {formatDueDate(item.dueDate)}</span>
                      <span className="h-px flex-1 mx-4 bg-gradient-to-r from-zinc-700 via-zinc-600 to-transparent" />
                      <span>Productivity</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    value={item.id}
                    aria-label={`Edit ${item.title}`}
                    className="absolute right-4 top-4 rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-2 text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/20 hover:text-white"
                    onClick={handleEditButtonClick}
                  >
                    <Pencil className="size-4" />
                  </button>
                </article>
              )
            })}
          </div>
        </div>

        <aside className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Today</h2>
          <p className="mt-2 text-sm leading-7 text-zinc-400">
            Tasks Todoist returns for the supported <span className="text-cyan-200">today</span>
            {' '}
            filter.
          </p>

          <div className="mt-6 space-y-3">
            {todayLoading && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-zinc-400">
                Loading today tasks...
              </div>
            )}

            {todayError && (
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
                Failed to load today tasks.
              </div>
            )}

            {!todayLoading && !todayError && todayTodoList.length === 0 && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-zinc-400">
                No tasks due today.
              </div>
            )}

            {!todayLoading && !todayError
              && todayTodoList.map((todo) => (
                <article
                  key={todo.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4"
                >
                  <p className="font-medium text-white">{todo.title}</p>
                  {todo.description && (
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{todo.description}</p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`rounded-full border px-2.5 py-1 ${priorityStyles[todo.priority]}`}
                    >
                      {todo.priority}
                    </span>
                    <span className="text-zinc-500">Due {formatDueDate(todo.dueDate)}</span>
                  </div>
                </article>
              ))}
          </div>
        </aside>
      </div>

      <UpdateTodo
        todo={editingTodo}
        onOpenChange={handleEditOpenChange}
        onTodoUpdated={onTodoUpdated}
      />
    </>
  )
}
