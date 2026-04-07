import { Link } from "@tanstack/react-router";
import { HOME_FEATURES } from "../model/home-page.config";

export function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-10 top-40 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-sm text-zinc-300">
            Welcome to your productivity space
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Manage your tasks with clarity, speed, and focus
          </h1>

          <p className="mt-6 text-base leading-7 text-zinc-400 sm:text-lg">
            A modern Todo application that helps you organize your daily work,
            stay focused, and complete tasks with confidence.
          </p>

          <Link
            to="/todos"
            className="mt-8 inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
          >
            Go to Todo Page
          </Link>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {HOME_FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-2xl">
                {feature.icon}
              </div>

              <h2 className="mt-5 text-xl font-semibold text-white">
                {feature.title}
              </h2>

              <p className="mt-3 leading-7 text-zinc-400">
                {feature.description}
              </p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-zinc-700 via-zinc-600 to-transparent" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
