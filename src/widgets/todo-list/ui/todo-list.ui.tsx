import { TODO_LIST_ITEMS } from '../model/todo-list.config'

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
  totalActive?: number
}

export const TodoList = ({ totalActive = 0 }: TodoListProps) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Tasks</h2>
            <p className="mt-1 text-sm text-zinc-400">Mock data for the todo list widget</p>
          </div>

          <span className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-400">
            {totalActive} active
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {TODO_LIST_ITEMS.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-950"
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
                <span>Due {item.due}</span>
                <span className="h-px flex-1 mx-4 bg-gradient-to-r from-zinc-700 via-zinc-600 to-transparent" />
                <span>Productivity</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
        <h2 className="text-xl font-semibold text-white">Today</h2>
        <p className="mt-2 text-sm leading-7 text-zinc-400">
          This widget is intentionally static for now, so you can wire it to data later without
          changing the layout.
        </p>

        <div className="mt-6 space-y-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
            <p className="text-sm text-zinc-400">Focus</p>
            <p className="mt-1 font-medium text-white">Finish high-priority tasks first</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
            <p className="text-sm text-zinc-400">Workflow</p>
            <p className="mt-1 font-medium text-white">
              Review, update, and close tasks in one place
            </p>
          </div>
        </div>
      </aside>
    </div>
  )

  // return (
  //   <section className="relative min-h-screen overflow-hidden bg-zinc-950 px-6 py-16 text-white sm:px-10 lg:px-16">
  //     <div className="absolute inset-0 -z-10">
  //       <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
  //       <div className="absolute right-10 top-40 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
  //       <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
  //     </div>
  //
  //     <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
  //       <div className="max-w-2xl">
  //         <p className="mb-4 inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-sm text-zinc-300">
  //           Todo list overview
  //         </p>
  //
  //         <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
  //           Keep your work visible, focused, and moving
  //         </h1>
  //
  //         <p className="mt-6 text-base leading-7 text-zinc-400 sm:text-lg">
  //           A simple task board with the same dark, polished style as the HomePage.
  //         </p>
  //       </div>
  //
  //       <div className="grid gap-4 sm:grid-cols-3">
  //         <article className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-black/20 backdrop-blur">
  //           <p className="text-sm text-zinc-400">Total tasks</p>
  //           <p className="mt-2 text-3xl font-semibold">{total}</p>
  //         </article>
  //
  //         <article className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-black/20 backdrop-blur">
  //           <p className="text-sm text-zinc-400">In progress</p>
  //           <p className="mt-2 text-3xl font-semibold">{active}</p>
  //         </article>
  //
  //         <article className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-black/20 backdrop-blur">
  //           <p className="text-sm text-zinc-400">Completed</p>
  //           <p className="mt-2 text-3xl font-semibold">{completed}</p>
  //         </article>
  //       </div>
  //
  //       <TodoToolbar />
  //
  //       <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
  //         <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
  //           <div className="flex items-center justify-between gap-4">
  //             <div>
  //               <h2 className="text-xl font-semibold text-white">Tasks</h2>
  //               <p className="mt-1 text-sm text-zinc-400">Mock data for the todo list widget</p>
  //             </div>
  //
  //             <span className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-400">
  //               {active} active
  //             </span>
  //           </div>
  //
  //           <div className="mt-6 space-y-4">
  //             {TODO_LIST_ITEMS.map((item) => (
  //               <article
  //                 key={item.title}
  //                 className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-950"
  //               >
  //                 <div className="flex flex-wrap items-start justify-between gap-3">
  //                   <div>
  //                     <h3 className="text-lg font-semibold text-white">{item.title}</h3>
  //                     <p className="mt-2 leading-7 text-zinc-400">{item.description}</p>
  //                   </div>
  //
  //                   <div className="flex flex-wrap gap-2">
  //                     <span
  //                       className={`rounded-full border px-3 py-1 text-xs font-medium ${
  //                         priorityStyles[item.priority]
  //                       }`}
  //                     >
  //                       {item.priority} priority
  //                     </span>
  //                     <span
  //                       className={`rounded-full border px-3 py-1 text-xs font-medium ${
  //                         statusStyles[item.status]
  //                       }`}
  //                     >
  //                       {item.status}
  //                     </span>
  //                   </div>
  //                 </div>
  //
  //                 <div className="mt-5 flex items-center justify-between text-sm text-zinc-400">
  //                   <span>Due {item.due}</span>
  //                   <span className="h-px flex-1 mx-4 bg-gradient-to-r from-zinc-700 via-zinc-600 to-transparent" />
  //                   <span>Productivity</span>
  //                 </div>
  //               </article>
  //             ))}
  //           </div>
  //         </div>
  //
  //         <aside className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
  //           <h2 className="text-xl font-semibold text-white">Today</h2>
  //           <p className="mt-2 text-sm leading-7 text-zinc-400">
  //             This widget is intentionally static for now, so you can wire it to data later without
  //             changing the layout.
  //           </p>
  //
  //           <div className="mt-6 space-y-3">
  //             <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
  //               <p className="text-sm text-zinc-400">Focus</p>
  //               <p className="mt-1 font-medium text-white">Finish high-priority tasks first</p>
  //             </div>
  //
  //             <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
  //               <p className="text-sm text-zinc-400">Workflow</p>
  //               <p className="mt-1 font-medium text-white">
  //                 Review, update, and close tasks in one place
  //               </p>
  //             </div>
  //           </div>
  //         </aside>
  //       </div>
  //     </div>
  //   </section>
  // )
}
