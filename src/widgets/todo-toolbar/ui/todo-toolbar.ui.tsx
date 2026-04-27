import type { Todo } from '@/entities/todo'

import {
  TODO_BULK_ACTIONS,
  TODO_FILTERS,
  TODO_SORT_OPTIONS,
  type TodoSortOption,
} from '../model/todo-toolbar.config'
import { useTodoToolbar } from '../model/todo-toolbar.hook'

interface TodoToolbarProps {
  onFilterResults: (items: Todo[]) => void
  onResetFilter: () => void
  onSelectedTodoAction: (todoId: string) => void
  selectedTodoId?: string | null
  onSortChange: (option: TodoSortOption) => void
}

export const TodoToolbar = (
  { onFilterResults, onResetFilter, onSelectedTodoAction, selectedTodoId = null, onSortChange }:
    TodoToolbarProps,
) => {
  const {
    activeFilter,
    bulkActionError,
    filterError,
    handleBulkActionClick,
    handleFilterButtonClick,
    handleSearchChange,
    handleSearchSubmit,
    handleSortChange,
    loading,
    searchQuery,
  } = useTodoToolbar({
    onFilterResults,
    onResetFilter,
    onSelectedTodoAction,
    onSortChange,
    selectedTodoId,
  })

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex rounded-full border border-zinc-800 bg-zinc-950 px-4 py-1 text-sm text-zinc-300">
            Toolbar
          </p>

          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Search, filter, sort, and manage tasks
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            A compact control bar for finding tasks quickly and applying bulk actions without
            leaving the page.
          </p>
        </div>

        <form
          className="grid gap-3 sm:grid-cols-2 xl:min-w-[28rem] xl:grid-cols-3"
          onSubmit={handleSearchSubmit}
        >
          <label className="sm:col-span-2">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Search
            </span>
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-zinc-400 transition focus-within:border-zinc-700 focus-within:bg-zinc-950">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Search task content"
                value={searchQuery}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                onChange={handleSearchChange}
              />
            </div>
          </label>

          <label>
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Sort
            </span>
            <select
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-700"
              onChange={handleSortChange}
            >
              {TODO_SORT_OPTIONS.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        </form>
      </div>

      {filterError && <p className="mt-4 text-sm text-rose-300">{filterError}</p>}
      {bulkActionError && <p className="mt-4 text-sm text-rose-300">{bulkActionError}</p>}

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="flex flex-wrap gap-2">
          {TODO_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              value={filter}
              disabled={loading}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                filter === activeFilter
                  ? 'border-white bg-white text-zinc-950'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900'
              }`}
              onClick={handleFilterButtonClick}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          {TODO_BULK_ACTIONS.map((action) => (
            <button
              key={action}
              type="button"
              value={action}
              disabled={!selectedTodoId || loading}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleBulkActionClick}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
