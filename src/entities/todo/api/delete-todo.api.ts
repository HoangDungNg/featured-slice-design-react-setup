import { alovaInstance } from "@/shared/api";

export const deleteTodo = (id: string) =>
  alovaInstance.Delete(`/todos/${id}`, undefined, { name: "delete-todo" });
