import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  // Login page par navbar hide
  if (location.pathname === "/login") return null;

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      {/* LEFT */}
      <span className="navbar-brand">Resume Portal</span>

      {/* CENTER */}
      <div className="mx-auto">
        <Link className="btn btn-outline-light me-2" to="/category">
          Category
        </Link>
        <Link className="btn btn-outline-light me-2" to="/resume">
          Resume
        </Link>
        <Link className="btn btn-outline-light" to="/skill">
          Skill
        </Link>
        <Link className="btn btn-outline-light" to="/jobpost">
          Job Post
        </Link>        
      </div>

      {/* RIGHT */}
      <div>
        <Link className="btn btn-success" to="/login">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
