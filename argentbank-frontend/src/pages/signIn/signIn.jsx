import "./signIn.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import ApiService from "../../services/apiServices";
import { setToken } from "../../store/userSlice";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const token = await ApiService.login(username, password);

      // stockage dans Redux
      dispatch(setToken(token));

      navigate("/user");
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignIn;
