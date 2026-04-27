import { useRequest } from 'alova/client'
import { type ChangeEvent, type FormEvent, type MouseEvent, useCallback, useState } from 'react'

import {
  closeTodo,
  deleteTodo,
  fetchTodoListByFilter,
  fetchTodoListBySearch,
  type Todo,
} from '@/entities/todo'

import {
  TODO_BULK_ACTIONS,
  TODO_FILTERS,
  TODO_SORT_OPTIONS,
  type TodoBulkAction,
  type TodoFilter,
  type TodoSortOption,
} from './todo-toolbar.config'

export interface UseTodoToolbarParams {
  onFilterResults: (items: Todo[]) => void
  onResetFilter: () => void
  onSelectedTodoAction: (todoId: string) => void
  selectedTodoId?: string | null
  onSortChange: (option: TodoSortOption) => void
}

const filterQueryMap: Partial<Record<TodoFilter, string>> = {
  Active: 'view all',
  Today: 'today',
}

const isTodoFilter = (value: string): value is TodoFilter =>
  TODO_FILTERS.some((filter) => filter === value)

const isTodoSortOption = (value: string): value is TodoSortOption =>
  TODO_SORT_OPTIONS.some((option) => option === value)

const isTodoBulkAction = (value: string): value is TodoBulkAction =>
  TODO_BULK_ACTIONS.some((action) => action === value)

export const useTodoToolbar = (
  { onFilterResults, onResetFilter, onSelectedTodoAction, selectedTodoId = null, onSortChange }:
    UseTodoToolbarParams,
) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<TodoFilter>('All')
  const [filterError, setFilterError] = useState<string | null>(null)
  const [bulkActionError, setBulkActionError] = useState<string | null>(null)
  const { loading: filtering, send: sendFilter } = useRequest(
    (query: string) => fetchTodoListByFilter(query),
    {
      immediate: false,
    },
  )
  const { loading: searching, send: sendSearch } = useRequest(
    (keyword: string) => fetchTodoListBySearch(keyword),
    {
      immediate: false,
    },
  )
  const { loading: completing, send: sendComplete } = useRequest(
    (todoId: string) => closeTodo(todoId),
    {
      immediate: false,
    },
  )
  const { loading: deleting, send: sendDelete } = useRequest(
    (todoId: string) => deleteTodo(todoId),
    {
      immediate: false,
    },
  )
  const loading = filtering || searching || completing || deleting

  const applyFilterQuery = useCallback(async (query: string) => {
    setFilterError(null)

    try {
      onFilterResults(await sendFilter(query))
    } catch {
      setFilterError('Unable to apply Todoist filter.')
    }
  }, [onFilterResults, sendFilter])

  const applySearchKeyword = useCallback(async (keyword: string) => {
    setFilterError(null)

    try {
      onFilterResults(await sendSearch(keyword))
    } catch {
      setFilterError('Unable to search Todoist tasks.')
    }
  }, [onFilterResults, sendSearch])

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value)
  }, [])

  const handleSearchSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const query = searchQuery.trim()
    setActiveFilter('All')

    if (!query) {
      setFilterError(null)
      onResetFilter()
      return
    }

    await applySearchKeyword(query)
  }, [applySearchKeyword, onResetFilter, searchQuery])

  const handleFilterClick = useCallback(async (filter: TodoFilter) => {
    setActiveFilter(filter)
    setSearchQuery('')

    const query = filterQueryMap[filter]
    if (!query) {
      setFilterError(null)
      onResetFilter()
      return
    }

    await applyFilterQuery(query)
  }, [applyFilterQuery, onResetFilter])

  const handleSortChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.currentTarget.value
    if (isTodoSortOption(sortOption)) onSortChange(sortOption)
  }, [onSortChange])

  const handleFilterButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const filter = event.currentTarget.value
    if (isTodoFilter(filter)) void handleFilterClick(filter)
  }, [handleFilterClick])

  const handleBulkActionClick = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
    const action = event.currentTarget.value
    if (!selectedTodoId || !isTodoBulkAction(action)) return

    setBulkActionError(null)

    try {
      if (action === 'Mark complete') await sendComplete(selectedTodoId)
      if (action === 'Delete selected') await sendDelete(selectedTodoId)

      onSelectedTodoAction(selectedTodoId)
    } catch {
      setBulkActionError('Unable to update the selected Todoist task.')
    }
  }, [onSelectedTodoAction, selectedTodoId, sendComplete, sendDelete])

  return {
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
  }
}
