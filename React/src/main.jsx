import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Background from "./Pages/Home";
import UserList from "./Pages/UserList";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Background />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
