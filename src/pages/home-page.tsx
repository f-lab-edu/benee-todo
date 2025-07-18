import TodoList from "@/components/todo-list";

const HomePage = () => {
  return (
    <div className="w-full max-w-400 mx-auto px-10 flex flex-col gap-4 py-20">
      <h1 className="text-center">HomePage</h1>
      <TodoList />
    </div>
  );
};

export default HomePage;
