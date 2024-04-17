import axios from "axios";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import styles from "./Login.module.css";

const LoginOwner = () => {
  const [state, setState] = useState({
    password: "",
    email: "",
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5002/login-owner", state);
      if (response.data.error === "Invalid password") {
        setError("Invalid credentials");
      } else if (response.data.error === "User not found") {
        setError("Owner Not Found");
      } else if (response.data.status === "ok") {
        localStorage.setItem("resName", response.data.resName);
        localStorage.setItem("resId", response.data.restaurantId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        alert("Login successful");
        localStorage.setItem('isOwner', 'true');
        localStorage.removeItem('isClient');
        localStorage.removeItem('isAdmin');
        window.location.replace(`/owner/${response.data.resName}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>Login as Restaurant Owner..</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <input
              className={styles.inputField}
              type="email"
              name="email"
              value={state.email}
              onChange={handleInputChange}
              placeholder="Your Email"
            />
          </div>
          <div className={styles.formField}>
            <input
              className={styles.inputField}
              type="password"
              name="password"
              value={state.password}
              onChange={handleInputChange}
              placeholder="Your Password"
            />
          </div>
          <button className={styles.submitButton} type="submit">Login</button>
          {error && <p className={styles.formError}>{error}</p>}
          <div className={styles.requestCredentials}>
            <Typography>Haven't received your credentials yet?</Typography>
            <Typography
              className={styles.textBtn}
              onClick={() => { window.location.replace('/request-credentials') }}
            >
              Request Credentials
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginOwner;
