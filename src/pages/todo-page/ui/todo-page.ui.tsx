import { TODO_LIST_ITEMS } from '@/widgets/todo-list/model/todo-list.config'
import { TodoList } from '@/widgets/todo-list/ui/todo-list.ui'
import { TodoToolbar } from '@/widgets/todo-toolbar/ui/todo-toolbar.ui'

export const TodoPage = () => {
  const total = TODO_LIST_ITEMS.length
  const completed = TODO_LIST_ITEMS.filter((item) => item.status === 'Done').length
  const active = TODO_LIST_ITEMS.filter((item) => item.status !== 'Done').length

  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 px-6 py-16 text-white sm:px-10 lg:px-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-10 top-40 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
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

        <TodoToolbar />
        <TodoList totalActive={active} />
      </div>
    </section>
  )
}
