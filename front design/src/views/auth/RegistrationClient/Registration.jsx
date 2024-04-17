import { useState } from "react";
import axios from "axios";
import RegistrationForm from "./RegistrationForm";
import registerImage from "../../../assets/register.svg";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5002/register-client", formData)
      .then((response) => {
        if (response.data.status === "ok") {
          alert("Registration successful");
        }
        window.location.replace('/login-client');
      })
      .catch((error) => {
        console.error(error);
        alert("Registration failed");
      });
  };

  return (
    <div className="p-5" >
      <div>
        <div >
          <h3 className="mb-5">Create your account!</h3>
          <RegistrationForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>

      </div>
    </div>
  );
};

export default Registration;
