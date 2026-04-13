export type TodoItem = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "Todo" | "In Progress" | "Done";
  due: string;
};

export const TODO_LIST_ITEMS: TodoItem[] = [
  {
    title: "Ship boundary setup review",
    description: "Check the latest lint, formatter, and routing changes before merge.",
    priority: "high",
    status: "In Progress",
    due: "Today",
  },
  {
    title: "Finalize widget styles",
    description: "Align widget cards and spacing with the HomePage visual language.",
    priority: "medium",
    status: "Todo",
    due: "Tomorrow",
  },
  {
    title: "Write smoke tests",
    description: "Cover the main todo flow and confirm the formatter config loads.",
    priority: "medium",
    status: "Todo",
    due: "Fri",
  },
  {
    title: "Refine empty states",
    description: "Add a better placeholder for when no tasks are available.",
    priority: "low",
    status: "Done",
    due: "Done",
  },
];
