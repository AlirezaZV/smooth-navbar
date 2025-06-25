import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import "./Login.css"; // CSS file you'll create

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = await loginUser(form);
      login(token);
      navigate("/"); // 👈 redirect to `/` (robots)
    } catch (err) {
      setError("ورود ناموفق بود! لطفا اطلاعات رو دوباره بررسي كنيد.");
    }
  };

  return (
    <div className="login-container">
      <img className="logo-login" src="/logo.svg"></img>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>ورود</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          name="username"
          placeholder="نام كاربري"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="پسورد"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">ورود</button>
      </form>
    </div>
  );
}
