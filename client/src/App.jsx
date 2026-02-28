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

        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Login />}
        />

        <Route
          path="/users"
          element={user?.role === "admin" ? <Users /> : <Login />}
        />

        <Route
          path="/messages"
          element={user ? <Messages /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}