import { useState, useEffect } from "react";
import { Todo } from "@/types/todo-type";

const LOCAL_STORAGE_KEY = "todos";
const useTodos = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const createTodo = (value: Omit<Todo, "id" | "createdAt" | "completed">) => {
    const newTodo: Todo = {
      ...value,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...(todos ?? []), newTodo]);
  };

  const toggleTodo = (id: string) => {
    if (!todos) return;
    const targetIdx = todos.findIndex((v) => v.id === id);
    if (targetIdx !== -1) {
      const newTodoValue = {
        ...todos[targetIdx],
        completed: !todos[targetIdx].completed,
      };
      setTodos([
        ...todos.slice(0, targetIdx - 1),
        newTodoValue,
        ...todos.slice(targetIdx + 1, todos.length - 1),
      ]);
    }
  };

  const modifyTodo = (id: string, newValue: Partial<Todo>) => {
    if (!todos) return;
    const targetIdx = todos.findIndex((v) => v.id === id);
    if (targetIdx !== -1) {
      const newTodoValue = { ...todos[targetIdx], ...newValue };
      setTodos([
        ...todos.slice(0, targetIdx - 1),
        newTodoValue,
        ...todos.slice(targetIdx + 1, todos.length - 1),
      ]);
    }
  };

  const deleteTodo = (id: string) => {
    if (!todos) return;
    const targetIdx = todos.findIndex((v) => v.id === id);
    if (targetIdx !== -1) {
      setTodos(todos.filter((_, index) => index !== targetIdx));
    }
  };

  useEffect(() => {
    console.log("useTodos init");
    if (typeof window !== undefined) {
      const storageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!!storageValue) {
        setTodos(JSON.parse(storageValue).todos);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined && todos) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ todos: todos }));
    }
  }, [todos]);

  return {
    todos,
    createTodo,
    toggleTodo,
    modifyTodo,
    deleteTodo,
  };
};

export default useTodos;
