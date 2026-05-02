import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password
        }
      );

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");

    } catch (error) {

      alert("Login Failed");

    }

  };

  return (

    <div style={container}>

      <div style={box}>

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={loginUser} style={button}>
          Login
        </button>

        <p>
          Don't have account? <Link to="/signup">Signup</Link>
        </p>

      </div>

    </div>

  );

}

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#020b2d"
};

const box = {
  background: "#09163b",
  padding: "40px",
  borderRadius: "10px",
  width: "300px",
  color: "white"
};

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "15px"
};

const button = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  cursor: "pointer"
};

export default Login;