import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedFunction, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import TodoList from "@/components/todo-list";
import useTodos from "@/hooks/useTodos";

import { TODO, NEW_TODO } from "./fixtures/todos-fixture";
import { NewTodo, Todo } from "@/types/todo-type";

vi.mock("@/hooks/useTodos");
const mockedUseTodos = useTodos as MockedFunction<typeof useTodos>;

describe("todo 생성 테스트", () => {
  beforeEach(() => {
    mockedUseTodos.mockReturnValue({
      todos: [TODO],
      isLoading: false,
      getTodoById: vi.fn(),
      createTodo: vi.fn(),
      toggleTodo: vi.fn(),
      modifyTodo: vi.fn(),
      deleteTodo: vi.fn(),
    });

    render(
      <MemoryRouter>
        <TodoList />
      </MemoryRouter>
    );
  });

  it("제목과 설명을 입력하고 생성 버튼을 누르면 투두 생성 폼의 입력 필드가 초기화된다", async () => {
    const titleInput = await screen.findByPlaceholderText(
      "Todo 제목을 입력해주세요."
    );
    const descInput = await screen.findByPlaceholderText(
      "Todo 설명을 입력해주세요."
    );
    const createButton = screen.getByRole("button", { name: "추가하기" });

    await userEvent.type(titleInput, "테스트 제목");
    await userEvent.type(descInput, "테스트 설명");
    await userEvent.click(createButton);

    expect(titleInput).toHaveValue("");
    expect(descInput).toHaveValue("");
  });

  it("제목과 설명을 입력하고 생성 버튼을 누르면 투두 리스트에 입력한 내용이 추가된다", async () => {
    const titleInput = await screen.findByPlaceholderText(
      "Todo 제목을 입력해주세요."
    );
    const descInput = await screen.findByPlaceholderText(
      "Todo 설명을 입력해주세요."
    );
    const createButton = screen.getByRole("button", { name: "추가하기" });

    await userEvent.type(titleInput, NEW_TODO.title);
    await userEvent.type(descInput, NEW_TODO.description || "");
    await userEvent.click(createButton);

    const todos: Todo[] | null = [
      {
        id: "2",
        title: NEW_TODO.title,
        description: NEW_TODO.description,
        completed: false,
        createdAt: new Date(),
      },
      TODO,
    ];

    mockedUseTodos.mockReturnValue({
      todos,
      isLoading: false,
      createTodo: vi.fn((v: NewTodo) => {}),
      getTodoById: vi.fn(),
      modifyTodo: vi.fn(),
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn(),
    });

    render(
      <MemoryRouter>
        <TodoList />
      </MemoryRouter>
    );

    expect(await screen.findByText(NEW_TODO.title)).toBeInTheDocument();
    expect(await screen.findByText(NEW_TODO.description)).toBeInTheDocument();
  });
});
