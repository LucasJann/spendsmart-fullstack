import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import FormField from "./FormField";

interface initialProperties {
  email: string;
  emailError: boolean;
  password: string;
  passwordError: boolean;
}

const initialFormValues = {
  email: "",
  emailError: false,
  password: "",
  passwordError: false,
};

const Login = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] =
    useState<initialProperties>(initialFormValues);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = "http://localhost:8080/login";
    const data = { email: formData.email, password: formData.password };

    const handleError = (field: string) => {
      setFormData((prevState) => ({
        ...prevState,
        [`${field}Error`]: true,
      }));
    };

    try {
      const response = await fetch(url, {
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

      localStorage.setItem("user", `${formData.email}`);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData(initialFormValues);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof typeof initialFormValues
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: event.target.value,
      [`${fieldName}Error`]: false,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <>
          <FormField
            id="loginEmail"
            type="email"
            name="email"
            value={formData.email}
            error={error}
            onChange={(e) => handleInputChange(e, "email")}
            isError={formData.emailError}
            className="w-full mb-2 rounded-md bg-transparent text-gray-400"
            placeholder="Insert your e-mail"
          >
            E-mail
          </FormField>
          <FormField
            id="loginPassword"
            type="password"
            name="password"
            value={formData.password}
            error={error}
            onChange={(e) => handleInputChange(e, "password")}
            isError={formData.passwordError}
            className="w-full mb-2 rounded-md bg-transparent text-gray-400"
            placeholder="Insert your password"
          >
            Password
          </FormField>
          <Button
            id="entranceButton"
            type="submit"
            className="w-full mt-5 p-4 bg-red-500 caret-transparent"
          >
            Entrar
          </Button>
        </>
      </form>
    </>
  );
};

export default Login;
