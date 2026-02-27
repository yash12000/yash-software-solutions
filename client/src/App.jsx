import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Messages from "./pages/Messages";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {user && <Route path="/dashboard" element={<Dashboard />} />}
        {user?.role === "admin" && (
          <Route path="/users" element={<Users />} />
        )}
        {user && <Route path="/messages" element={<Messages />} />}
      </Routes>
    </BrowserRouter>
  );
}