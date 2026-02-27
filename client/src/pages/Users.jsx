import MainLayout from "../layout/MainLayout";
import { useState } from "react";
import { API } from "../services/api";

export default function Users() {
  const [form, setForm] = useState({});

  const createUser = async () => {
    await API.post("/auth/register", form);
    alert("User created");
  };

  return (
    <MainLayout>
      <h1 className="text-xl mb-4">Create User</h1>

      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})}/>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
      <input placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/>

      <select onChange={e => setForm({...form, role: e.target.value})}>
        <option value="employee">Employee</option>
        <option value="client">Client</option>
      </select>

      <button onClick={createUser} className="bg-green-600 text-white px-4 py-2 mt-2">
        Create User
      </button>
    </MainLayout>
  );
}