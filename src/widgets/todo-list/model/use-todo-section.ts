import { useRequest } from "alova/client";
import { fetchTodoList } from "@/entities/todo";

export const useTodoWidget = () => useRequest(fetchTodoList());
