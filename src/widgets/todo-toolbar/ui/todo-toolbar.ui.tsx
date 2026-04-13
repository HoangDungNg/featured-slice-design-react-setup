import {
  TODO_BULK_ACTIONS,
  TODO_FILTERS,
  TODO_SORT_OPTIONS,
} from "../model/todo-toolbar.config";

export const TodoToolbar = () => {
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
            A compact control bar for finding tasks quickly and applying bulk actions without leaving the page.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[28rem] xl:grid-cols-4">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Search
            </span>
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-zinc-400 transition focus-within:border-zinc-700 focus-within:bg-zinc-950">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Search tasks"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
              />
            </div>
          </label>

          <label>
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Filter
            </span>
            <select className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-700">
              {TODO_FILTERS.map((filter) => (
                <option key={filter}>{filter}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Sort
            </span>
            <select className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-700">
              {TODO_SORT_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="flex flex-wrap gap-2">
          {TODO_FILTERS.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm transition ${
                index === 0
                  ? "border-white bg-white text-zinc-950"
                  : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900"
              }`}
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
              className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
