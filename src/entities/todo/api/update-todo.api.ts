import { alovaInstance } from "@/shared/api";
import type { TodoWriteInput } from "../model/todo.model";

export const updateTodo = (id: string, todo: TodoWriteInput) =>
  alovaInstance.Put(`/todos/${id}`, todo, { name: "update-todo" });
