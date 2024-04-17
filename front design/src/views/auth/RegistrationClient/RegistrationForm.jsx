import PropTypes from "prop-types";

const fields = [
  { name: "firstname", label: "First Name", type: "text" },
  { name: "lastname", label: "Last Name", type: "text" },
  { name: "password", label: "Password", type: "password" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

const RegistrationForm = ({ formData, handleInputChange, handleSubmit }) => {

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <input
          className="mb-3"
          key={index}
          name={field.name}
          placeholder={field.label}
          type={field.type}
          value={formData[field.name]}
          onChange={handleInputChange}
        />
      ))}
      <button type="submit" className="btn-global mt-5">
        Sign Up
      </button>
    </form>
  );
};

RegistrationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;
