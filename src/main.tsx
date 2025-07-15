import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/home-page";
import TodoPage from "./pages/todo-page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="todo">
          <Route path=":id" element={<TodoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
