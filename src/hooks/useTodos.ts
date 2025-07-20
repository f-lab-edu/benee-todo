import { useState, useEffect } from "react";
import { Todo, NewTodo } from "@/types/todo-type";

const LOCAL_STORAGE_KEY = "todos";
const useTodos = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const isLoading = todos === null;

  const getTodoById = (id: string) => {
    return todos?.find((v) => v.id === id) ?? null;
  };

  const createTodo = (value: NewTodo) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
      ...value,
    };

    setTodos([newTodo, ...(todos ?? [])]);
  };

  const toggleTodo = (id: string) => {
    if (!todos) {
      return;
    }

    const newTodos = todos.map((v) =>
      v.id === id
        ? {
            ...v,
            completed: !v.completed,
          }
        : v
    );

    setTodos(newTodos);
  };

  const modifyTodo = (id: string, newValue: Partial<Todo>) => {
    if (!todos) {
      return;
    }

    const targetIdx = todos.findIndex((v) => v.id === id);
    if (targetIdx === -1) {
      return;
    }

    const newTodos = todos.map((v) =>
      v.id === id
        ? {
            ...v,
            ...newValue,
          }
        : v
    );

    setTodos(newTodos);
  };

  const deleteTodo = (id: string) => {
    if (!todos) {
      return;
    }

    setTodos(todos.filter((v) => v.id !== id));
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storageValue) {
      return;
    }

    setTodos(JSON.parse(storageValue).todos);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !todos) {
      return;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ todos: todos }));
  }, [todos]);

  return {
    todos,
    isLoading,
    getTodoById,
    createTodo,
    toggleTodo,
    modifyTodo,
    deleteTodo,
  };
};

export default useTodos;
