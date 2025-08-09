import { NewTodo, Todo } from "@/types/todo-type";

export const TODO: Todo = {
  id: "1",
  title: "기존 투두",
  description: "기존 설명",
  completed: false,
  createdAt: new Date(),
};

export const TODO_TO_COMPARE = {
  ...TODO,
  createdAt: TODO.createdAt.toISOString(),
};

export const NEW_TODO: Required<NewTodo> = {
  title: "새로운 투두",
  description: "새로운 설명",
};
