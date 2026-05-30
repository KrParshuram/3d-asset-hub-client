import { Link } from "react-router-dom";

export default function Footer() {
  return (
<footer className="footer">

  <div className="footer-content">

    <div>
      <h3>3D Asset Hub</h3>

      <p className="muted">
        A modern platform for uploading, viewing and sharing interactive 3D assets.
      </p>

      <p className="muted">
        Demo Account:
        <br />
        Email: demo@gmail.com
        <br />
        Password: demo123
      </p>
    </div>

    <div className="footer-links">
      <a
        href="https://www.linkedin.com/in/krparshu/"
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>

      <Link to="/">
        Gallery
      </Link>

      <Link to="/dashboard">
        Dashboard
      </Link>
    </div>

  </div>

  <div className="footer-bottom">
    © {new Date().getFullYear()} 3D Asset Hub • Built with React, Three.js, MongoDB & AWS S3
  </div>

</footer>
  );
}