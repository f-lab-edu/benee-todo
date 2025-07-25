import { NewTodo, Todo } from "@/types/todo-type";

export const todo: Todo = {
  id: "1",
  title: "기존 투두",
  description: "기존 설명",
  completed: false,
  createdAt: new Date(),
};

export const todoToCompare = {
  ...todo,
  createdAt: todo.createdAt.toISOString(),
};

export const newTodo: NewTodo = {
  title: "새로운 투두",
  description: "새로운 설명",
};
