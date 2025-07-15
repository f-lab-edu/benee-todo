import { Todo } from "./types/todo-type";
export const todos: Todo[] = [
  {
    id: "1",
    title: "todo 1",
    description: "",
    completed: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "todo 2",
    description: "나는 todo 2이다",
    completed: true,
    createdAt: new Date(),
  },
];
