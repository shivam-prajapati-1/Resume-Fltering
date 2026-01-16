import { useState } from "react";
import { loginUser } from "../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Warning", "All fields are required", "warning");
      return;
    }

    try {
      const res = await loginUser({ email, password });

      // 🔐 Save JWT Token
      localStorage.setItem("token", res.data.token);

      Swal.fire("Success", "Login successful", "success");
      navigate("/category");
    } catch (error) {
      Swal.fire("Error", "Invalid email or password", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card col-md-4 mx-auto shadow">
        <div className="card-header bg-primary text-white text-center">
          <h4>Login</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-success w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
