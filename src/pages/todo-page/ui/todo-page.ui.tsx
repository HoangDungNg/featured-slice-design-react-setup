import { useCallback, useMemo, useState } from 'react'

import type { Todo } from '@/entities/todo'
import { CreateTodo } from '@/features/create-todo/ui/create-todo.ui'
import { useTodoWidget } from '@/widgets/todo-list/model/todo-list.hook'
import { TodoList } from '@/widgets/todo-list/ui/todo-list.ui'
import type { TodoSortOption } from '@/widgets/todo-toolbar/model/todo-toolbar.config'
import { TodoToolbar } from '@/widgets/todo-toolbar/ui/todo-toolbar.ui'

const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
} as const

const sortTodoList = (todoList: Todo[], sortOption: TodoSortOption) => {
  if (sortOption === 'Due date') {
    return todoList.toSorted((firstTodo, secondTodo) => {
      if (!firstTodo.dueDate) return 1
      if (!secondTodo.dueDate) return -1

      return new Date(firstTodo.dueDate).getTime() - new Date(secondTodo.dueDate).getTime()
    })
  }

  if (sortOption === 'Priority') {
    return todoList.toSorted((firstTodo, secondTodo) =>
      priorityOrder[firstTodo.priority] - priorityOrder[secondTodo.priority]
    )
  }

  if (sortOption === 'Alphabetical') {
    return todoList.toSorted((firstTodo, secondTodo) =>
      firstTodo.title.localeCompare(secondTodo.title)
    )
  }

  return todoList.toSorted((firstTodo, secondTodo) =>
    new Date(secondTodo.createdAt).getTime() - new Date(firstTodo.createdAt).getTime()
  )
}

export const TodoPage = () => {
  const { data: fetchedTodoList = [], error, loading } = useTodoWidget()
  const [createdTodoList, setCreatedTodoList] = useState<Todo[]>([])
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[] | null>(null)
  const [hiddenTodoIds, setHiddenTodoIds] = useState<Set<string>>(() => new Set())
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null)
  const [updatedTodoById, setUpdatedTodoById] = useState<Record<string, Todo>>({})
  const [sortOption, setSortOption] = useState<TodoSortOption>('Newest first')
  const baseTodoList = useMemo(() => {
    if (filteredTodoList) return filteredTodoList

    const fetchedTodoIds = new Set(fetchedTodoList.map((todo) => todo.id))

    return [
      ...createdTodoList.filter((todo) => !fetchedTodoIds.has(todo.id)),
      ...fetchedTodoList,
    ]
  }, [createdTodoList, fetchedTodoList, filteredTodoList])
  const visibleTodoList = useMemo(
    () => baseTodoList.map((todo) => updatedTodoById[todo.id] ?? todo),
    [baseTodoList, updatedTodoById],
  )
  const todoList = useMemo(
    () => sortTodoList(visibleTodoList, sortOption).filter((todo) => !hiddenTodoIds.has(todo.id)),
    [hiddenTodoIds, sortOption, visibleTodoList],
  )
  const total = todoList.length
  const completed = todoList.filter((item) => item.status === 'Done').length
  const active = todoList.filter((item) => item.status !== 'Done').length

  const handleResetFilter = useCallback(() => setFilteredTodoList(null), [])

  const handleSelectTodo = useCallback((todoId: string) => {
    setSelectedTodoId((currentTodoId) => currentTodoId === todoId ? null : todoId)
  }, [])

  const handleSelectedTodoAction = useCallback((todoId: string) => {
    setHiddenTodoIds((currentHiddenTodoIds) => new Set(currentHiddenTodoIds).add(todoId))
    setSelectedTodoId(null)
  }, [])

  const handleTodoUpdated = useCallback((todo: Todo) => {
    setUpdatedTodoById((currentUpdatedTodoById) => ({
      ...currentUpdatedTodoById,
      [todo.id]: todo,
    }))
  }, [])

  const handleTodoCreated = useCallback((todo: Todo) => {
    setCreatedTodoList((currentCreatedTodoList) => [todo, ...currentCreatedTodoList])
    setHiddenTodoIds((currentHiddenTodoIds) => {
      const nextHiddenTodoIds = new Set(currentHiddenTodoIds)
      nextHiddenTodoIds.delete(todo.id)
      return nextHiddenTodoIds
    })
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 px-6 py-16 text-white sm:px-10 lg:px-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-10 top-40 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-sm text-zinc-300">
              Todo list overview
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Keep your work visible, focused, and moving
            </h1>

            <p className="mt-6 text-base leading-7 text-zinc-400 sm:text-lg">
              A simple task board with the same dark, polished style as the HomePage.
            </p>
          </div>

          <CreateTodo onTodoCreated={handleTodoCreated} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-black/20 backdrop-blur">
            <p className="text-sm text-zinc-400">Total tasks</p>
            <p className="mt-2 text-3xl font-semibold">{total}</p>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-black/20 backdrop-blur">
            <p className="text-sm text-zinc-400">In progress</p>
            <p className="mt-2 text-3xl font-semibold">{active}</p>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-black/20 backdrop-blur">
            <p className="text-sm text-zinc-400">Completed</p>
            <p className="mt-2 text-3xl font-semibold">{completed}</p>
          </article>
        </div>

        <TodoToolbar
          onFilterResults={setFilteredTodoList}
          onResetFilter={handleResetFilter}
          onSelectedTodoAction={handleSelectedTodoAction}
          selectedTodoId={selectedTodoId}
          onSortChange={setSortOption}
        />
        <TodoList
          error={error}
          isLoading={loading}
          items={todoList}
          selectedTodoId={selectedTodoId}
          totalActive={active}
          onTodoUpdated={handleTodoUpdated}
          onSelectTodo={handleSelectTodo}
        />
      </div>
    </section>
  )
}
