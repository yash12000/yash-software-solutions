import { useState } from "react";
import { API } from "../services/api";

export default function Users() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createUser = async () => {
    try {
      await API.post("/auth/register", form);
      alert("User Created Successfully ✅");
    } catch (err) {
      alert("Error creating user");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">Create User</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="border w-full p-2 mb-3"
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border w-full p-2 mb-3"
      />

      <input
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="border w-full p-2 mb-3"
      />

      <select
        name="role"
        onChange={handleChange}
        className="border w-full p-2 mb-3"
      >
        <option value="employee">Employee</option>
        <option value="client">Client</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={createUser}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        Create User
      </button>
    </div>
  );
}