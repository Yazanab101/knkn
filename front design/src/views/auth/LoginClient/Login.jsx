import "./Login.css";
import axios from "axios";
import { useState } from "react";

const LoginClient = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5002/login-client", state)
      .then((data) => {
        console.log(data);

        if (data.data.status) {
          alert("Login successful");
          console.log(data.data)
          // Save token to local storage
          const id = localStorage.setItem('id', data.data.userId); // Assuming your token is received as 'token' in response
          localStorage.setItem('token', data.data.token); // Assuming your token is received as 'token' in response
          localStorage.setItem('name', data.data.name); 
          localStorage.setItem('isClient', 'true');
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('isOwner');

          console.log('id', id);
          console.log('token', data.data.token); // Assuming your token is received as 'token' in response
          window.location.replace("/");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError('Invalid credentials');
        } else {
          setError('An error occurred. Please try again.');
          console.error('An error occurred:', error);
        }
        if (error.response && error.response.status === 404) {
          setError('Client Not Found');
        }
      });
  };


  return (
    <div>
      <div className="mt-40">
        <div className="containerLo">
          <div className="paperLo">
            <h3 className="mb-3 w-100"> Client Login</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={handleInputChange}
                  placeholder="Your Password"
                />
              </div>
              <button type="submit" className="btn-g">
                Login
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="d-flex mt-5">
                <div id="account-Register">
                  Dont have an account?
                </div>
                <button className="btn-gs" onClick={() => { window.location.replace("/register-client") }}>Create an account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LoginClient;
