import { useRequest } from 'alova/client'
import { type FormEvent, useCallback, useState } from 'react'

import { type Todo, type TodoUpdateInput, updateTodo } from '@/entities/todo'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'

const fieldClassName =
  'w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-700'

const priorityFieldValue = {
  high: '1',
  medium: '3',
  low: '4',
} as const

interface UpdateTodoProps {
  todo: Todo | null
  onOpenChange: (isOpen: boolean) => void
  onTodoUpdated?: (todo: Todo) => void
}

const getFormString = (formData: FormData, key: string) => {
  const value = formData.get(key)

  return typeof value === 'string' ? value : ''
}

const getTodoPriority = (value: string): TodoUpdateInput['priority'] => {
  if (value === '1') return 1
  if (value === '2') return 2
  if (value === '4') return 4

  return 3
}

const getDateInputValue = (dueDate: string | null) => dueDate?.split('T')[0] ?? ''

export const UpdateTodo = ({ todo, onOpenChange, onTodoUpdated }: UpdateTodoProps) => {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { loading, send } = useRequest(
    (todoId: string, todoInput: TodoUpdateInput) => updateTodo(todoId, todoInput),
    { immediate: false },
  )

  const handleCancel = useCallback(() => {
    setSubmitError(null)
    onOpenChange(false)
  }, [onOpenChange])

  const handleOpenChange = useCallback((isOpen: boolean) => {
    if (!isOpen) setSubmitError(null)
    onOpenChange(isOpen)
  }, [onOpenChange])

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!todo) return

    setSubmitError(null)

    const formData = new FormData(event.currentTarget)
    const tags = getFormString(formData, 'tags')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const todoInput: TodoUpdateInput = {
      content: getFormString(formData, 'title'),
      description: getFormString(formData, 'description'),
      due_date: getFormString(formData, 'dueDate') || null,
      labels: tags,
      priority: getTodoPriority(getFormString(formData, 'priority')),
    }

    try {
      const updatedTodo = await send(todo.id, todoInput)
      onTodoUpdated?.(updatedTodo)
      onOpenChange(false)
    } catch {
      setSubmitError('Unable to update todo. Please try again.')
    }
  }, [onOpenChange, onTodoUpdated, send, todo])

  return (
    <Dialog open={Boolean(todo)} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-white shadow-2xl shadow-black/40 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Edit todo</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Update the selected Todoist task details.
          </DialogDescription>
        </DialogHeader>

        {todo && (
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <label>
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Title
              </span>
              <input className={fieldClassName} defaultValue={todo.title} name="title" required />
            </label>

            <label>
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Description
              </span>
              <textarea
                className={`${fieldClassName} min-h-28 resize-y`}
                defaultValue={todo.description}
                name="description"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                  Due date
                </span>
                <input
                  className={fieldClassName}
                  defaultValue={getDateInputValue(todo.dueDate)}
                  name="dueDate"
                  type="date"
                />
              </label>

              <label>
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                  Priority
                </span>
                <select
                  className={fieldClassName}
                  defaultValue={priorityFieldValue[todo.priority]}
                  name="priority"
                >
                  <option value="4">Low</option>
                  <option value="3">Medium</option>
                  <option value="1">High</option>
                </select>
              </label>
            </div>

            <label>
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Tags
              </span>
              <input className={fieldClassName} defaultValue={todo.tags.join(', ')} name="tags" />
            </label>

            {submitError && <p className="text-sm text-rose-300">{submitError}</p>}

            <DialogFooter className="gap-3 sm:space-x-0">
              <button
                type="button"
                className="rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-2xl border border-white bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update todo'}
              </button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
