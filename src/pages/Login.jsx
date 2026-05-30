import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", form);

    localStorage.setItem("user", JSON.stringify(res.data));

    navigate("/dashboard");
  };

return (
  <div className="viewer-page">
    <div
      className="container"
      style={{
        maxWidth: "500px",
        marginTop: "80px",
      }}
    >
      <div className="card">

        <h1
          style={{
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          3D Asset Hub
        </h1>

        <p
          className="muted"
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          Sign in to manage your 3D models
        </p>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn-primary"
          >
            Login
          </button>
        </form>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <Link to="/register">
            Create Account
          </Link>
        </div>

      </div>
    </div>
        <div className="container" style={{ marginTop: "20px" }}>
  <h4>Demo Account</h4>

  <p>Email: demo@gmail.com</p>
  <p>Password: demo123</p>

  <small className="muted">
    Use this account to explore dashboard features.
  </small>
</div>
  </div>
);
}