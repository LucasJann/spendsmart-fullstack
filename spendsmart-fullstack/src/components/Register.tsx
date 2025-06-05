import { useState } from "react";

import FormField from "./FormField";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface initialProperties {
  name: string;
  email: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  nameError: boolean;
  emailError: boolean;
  lastNameError: boolean;
  passwordError: boolean;
  confirmPasswordError: boolean;
}

const initialFormValues = {
  name: "",
  email: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  nameError: false,
  emailError: false,
  lastNameError: false,
  passwordError: false,
  confirmPasswordError: false,
};

const Register = () => {
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] =
    useState<initialProperties>(initialFormValues);

  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof typeof initialFormValues
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: event.target.value,
      [`${fieldName}Error`]: false,
    }));
    setDisabled(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      lastName: formData.lastName,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      const response = await fetch("http://localhost:8080/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (resData.errorMessage) {
        setError(resData.errorMessage);
        handleError(resData.path);
      } else {
        resetForm();
        navigate("/profilePage");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData(initialFormValues);
  };

  const handleError = (field: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [`${field}Error`]: true,
    }));
    setDisabled(true);
  };

  return (
    <>
      <section className="font-serif text-gray-300">
        <form onSubmit={handleSubmit}>
          <FormField
            id="name"
            name="name"
            type="text"
            error={error}
            value={formData.name}
            onChange={(e) => handleInputChange(e, "name")}
            isError={formData.nameError}
            className="w-full mb-2 rounded-md bg-transparent text-gray-400"
            placeholder="Insert your name"
          >
            Name
          </FormField>
          <FormField
            id="lastName"
            name="lastName"
            type="text"
            error={error}
            value={formData.lastName}
            onChange={(e) => handleInputChange(e, "lastName")}
            isError={formData.lastNameError}
            className="w-full mb-2 rounded-md bg-transparent text-gray-400"
            placeholder="Insert your last name"
          >
            Last Name
          </FormField>
          <FormField
            id="registerEmail"
            type="email"
            name="email"
            error={error}
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
            isError={formData.emailError}
            className="w-full mb-2 rounded-md bg-transparent text-gray-400"
            placeholder="Insert your e-mail"
          >
            E-mail
          </FormField>
          <FormField
            id="registerPassword"
            type="password"
            name="password"
            error={error}
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
            isError={formData.passwordError}
            className="w-full mb-2 rounded-md bg-transparent text-gray-400"
            placeholder="Insert your password"
          >
            Password
          </FormField>
          <FormField
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            error={error}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange(e, "confirmPassword")}
            isError={formData.confirmPasswordError}
            className="w-full mb-2 rounded-md bg-transparent text-gray-400"
            placeholder="Confirm your password"
          >
            Confirm Password
          </FormField>
          <Button
            id="confirmButton"
            type="submit"
            disabled={disabled}
            className="bg-red-500 mt-5 p-4 w-full caret-transparent"
          >
            Confirm
          </Button>
        </form>
      </section>
    </>
  );
};

export default Register;
