import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/register", form);

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
          Create your account and start managing 3D assets
        </p>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

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
            Create Account
          </button>
        </form>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <Link to="/login">
            Already have an account? Login
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