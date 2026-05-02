import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Member");

  const signupUser = async () => {

    try {

      await axios.post(
       `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          name,
          email,
          password,
          role
        }
      );

      alert("Signup Successful");

      navigate("/");

    } catch (error) {

      alert("Signup Failed");

    }

  };

  return (

    <div style={container}>

      <div style={box}>

        <h1 style={{ textAlign: "center" }}>
          Signup
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={input}
        >
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>

        <button onClick={signupUser} style={button}>
          Signup
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have account?{" "}
          <Link to="/" style={{ color: "#60a5fa" }}>
            Login
          </Link>
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
  width: "320px",
  color: "white",
  boxShadow: "0px 0px 15px rgba(37,99,235,0.3)"
};

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "5px",
  border: "1px solid gray",
  background: "#1e293b",
  color: "white",
  outline: "none",
  boxSizing: "border-box"
};

const button = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Signup;