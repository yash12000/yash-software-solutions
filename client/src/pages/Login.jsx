import { useState } from "react";
import { API } from "../services/api";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      console.log("Sending:", data);

      const res = await API.post("/auth/login", data);

      console.log("Response:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login success");

      window.location.href = "/dashboard";
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);

      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <br />
      <br />

      <button onClick={login}>Login</button>
    </div>
  );
}
