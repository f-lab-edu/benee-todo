import { renderHook, act, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import useTodos, { LOCAL_STORAGE_KEY } from "@/hooks/useTodos";
import { todo, newTodo, todoToCompare } from "./fixtures/todos-fixture";

const storagedValue = JSON.stringify({ todos: [todo] });

describe("useTodos hook 테스트", () => {
  afterEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it("저장된 값이 없을 때 todos는 null로 초기화된다", () => {
    const { result } = renderHook(useTodos);
    expect(result.current.todos).toBe(null);
  });

  it("createTodo: 새로운 값을 추가했을 때 todos에 배열 형태로 값이 저장되며, 로컬스토리지에 반영된다", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    const { result } = renderHook(useTodos);
    act(() => {
      result.current.createTodo(newTodo);
    });

    await waitFor(() => {
      expect(result.current.todos?.length).toBe(1);
      expect(result.current.todos?.[0].title).toBe(newTodo.title);
      expect(result.current.todos?.[0].description).toBe(newTodo.description);

      const lastSetCall = setItemSpy.mock.calls.at(-1)!;
      const [calledKey, calledValue] = lastSetCall;
      const parsedCalledValue = JSON.parse(calledValue);

      expect(calledKey).toBe(LOCAL_STORAGE_KEY);
      expect(parsedCalledValue?.todos[0].title).toBe(newTodo.title);
      expect(parsedCalledValue?.todos[0].description).toBe(newTodo.description);
    });
  });

  it("getTodoById: 특정 id를 가진 todo item을 반환한다", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(storagedValue);

    const { result } = renderHook(useTodos);

    await waitFor(() => {
      const value = result.current.getTodoById("1");
      expect(value?.title).toBe(todo.title);
      expect(value?.description).toBe(todo.description);
    });
  });

  it("toggleTodo: todo를 토글했을 때 값이 변경 및 로컬스토리지에 반영된다", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(storagedValue);
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(useTodos);

    act(() => {
      result.current.toggleTodo("1");
    });

    await waitFor(() => {
      expect(result.current.getTodoById("1")?.completed).toBe(true);

      const lastSetCall = setItemSpy.mock.calls.at(-1)!;
      const [calledKey, calledValue] = lastSetCall;

      expect(calledKey).toBe(LOCAL_STORAGE_KEY);
      expect(JSON.parse(calledValue)).toMatchObject({
        todos: [{ ...todoToCompare, completed: true }],
      });
    });
  });

  it("deleteTodo: todo를 삭제했을 때 todos에 해당 값이 제거되며 제거된 후의 todos가 로컬스토리지에 반영된다", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(storagedValue);
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(useTodos);

    act(() => {
      result.current.deleteTodo("1");
    });

    await waitFor(() => {
      expect(result.current.todos?.length).toBe(0);

      const lastSetCall = setItemSpy.mock.calls.at(-1)!;
      const [calledKey, calledValue] = lastSetCall;

      expect(calledKey).toBe(LOCAL_STORAGE_KEY);
      expect(JSON.parse(calledValue)).toEqual({ todos: [] });
    });
  });
});
