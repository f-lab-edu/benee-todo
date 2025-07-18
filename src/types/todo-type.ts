export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export type NewTodo = Omit<Todo, "id" | "createdAt" | "completed">;
