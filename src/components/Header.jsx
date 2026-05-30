import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setUser(
      JSON.parse(localStorage.getItem("user"))
    );
  }, [location]);

  // const user = JSON.parse(
  //   localStorage.getItem("user")
  // );

const logout = () => {
  localStorage.removeItem("user");

    setUser(null);
  navigate("/");
};
// const user = JSON.parse(localStorage.getItem("user"));


  return (
    <header className="header">

      <div className="logo">
        <Link to="/">
          <h2>ModelVerse</h2>
        </Link>
      </div>

      <div className="header-links">

        {!user ? (
          <>
            <Link to="/">Gallery</Link>

            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/">
              Gallery
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="btn-primary"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </header>
  );
}