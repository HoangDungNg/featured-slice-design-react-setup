import { alovaInstance } from "@/shared/api";
import type { TodoWriteInput } from "../model/todo.model";

export const createTodo = (todo: TodoWriteInput) =>
  alovaInstance.Post("/todos", todo, { name: "create-todo" });
