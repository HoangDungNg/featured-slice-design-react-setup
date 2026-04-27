import { useRequest } from 'alova/client'
import { type FormEvent, useCallback, useRef, useState } from 'react'

import { createTodo, type Todo, type TodoWriteInput } from '@/entities/todo'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/shadcn/dialog'

const fieldClassName =
  'w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-700'

const getFormString = (formData: FormData, key: string) => {
  const value = formData.get(key)

  return typeof value === 'string' ? value : ''
}

const getTodoPriority = (value: string): TodoWriteInput['priority'] => {
  if (value === '1') return 1
  if (value === '2') return 2
  if (value === '4') return 4

  return 3
}

interface CreateTodoProps {
  onTodoCreated?: (todo: Todo) => void
}

export const CreateTodo = ({ onTodoCreated }: CreateTodoProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { loading, send } = useRequest((todo: TodoWriteInput) => createTodo(todo), {
    immediate: false,
  })

  const handleCancel = useCallback(() => setIsOpen(false), [])

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)

    const formData = new FormData(event.currentTarget)
    const tags = getFormString(formData, 'tags')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const todo: TodoWriteInput = {
      content: getFormString(formData, 'title'),
      description: getFormString(formData, 'description'),
      due_date: getFormString(formData, 'dueDate'),
      priority: getTodoPriority(getFormString(formData, 'priority')),
      labels: tags,
    }

    try {
      const createdTodo = await send(todo)
      onTodoCreated?.(createdTodo)
      formRef.current?.reset()
      setIsOpen(false)
    } catch {
      setSubmitError('Unable to create todo. Please try again.')
    }
  }, [onTodoCreated, send])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/20 hover:text-white"
        >
          Create todo
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-white shadow-2xl shadow-black/40 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Create a new todo</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Add the task details and save it to the todo API.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} className="grid gap-5" onSubmit={handleSubmit}>
          <label>
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Title
            </span>
            <input
              className={fieldClassName}
              name="title"
              placeholder="Review boundary rules"
              required
            />
          </label>

          <label>
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Description
            </span>
            <textarea
              className={`${fieldClassName} min-h-28 resize-y`}
              name="description"
              placeholder="Describe what needs to be done"
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Due date
              </span>
              <input className={fieldClassName} name="dueDate" required type="date" />
            </label>

            <label>
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Priority
              </span>
              <select className={fieldClassName} defaultValue="3" name="priority">
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
            <input className={fieldClassName} name="tags" placeholder="frontend, api, review" />
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
              {loading ? 'Creating...' : 'Create todo'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
