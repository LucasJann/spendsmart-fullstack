import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import FormField from "./FormField";
import burningSkyImage from "../images/burning-sky.jpg";

const formatBalance = (value: number) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format(value / 100);
};

interface initialProperties {
  name: string;
  lastName: string;
  email: string;
  password: string;
  initialBalance: string;
  confirmPassword: string;
  nameError: boolean;
  lastNameError: boolean;
  emailError: boolean;
  passwordError: boolean;
  initialBalanceError: boolean;
  confirmPasswordError: boolean;
}

const initialFormValues = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  initialBalance: "",
  nameError: false,
  lastNameError: false,
  emailError: false,
  passwordError: false,
  initialBalanceError: false,
  confirmPasswordError: false,
};

const Login = () => {
  const [formData, setFormData] =
    useState<initialProperties>(initialFormValues);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isSelected, setIsSelected] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", "");
  }, []);

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

    const data = isSelected
      ? { email: formData.email, password: formData.password }
      : {
          name: formData.name,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          initialBalance: formData.initialBalance || "0",
        };

    const url = isSelected
      ? "http://localhost:8080/login"
      : "http://localhost:8080/";

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
        handleNavigation();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleError = (field: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [`${field}Error`]: true,
    }));
    setDisabled(true);
  };

  const resetForm = () => {
    setFormData(initialFormValues);
  };

  const handleNavigation = () => {
    if (isSelected) {
      navigate("/profilePage");
      localStorage.setItem("user", JSON.stringify(formData.email));
    } else {
      navigate("/");
      setIsSelected(!isSelected);
    }
  };

  const handleSelected = () => {
    setIsSelected((prev) => !prev);
    resetForm();
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 15) {
      setFormData((prevState) => ({
        ...prevState,
        initialBalance: value,
        initialBalanceError: false,
      }));
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${burningSkyImage})` }}
    >
      <form
        className="max-w-md w-full bg-black bg-opacity-60 shadow-mg rounded-md p-6"
        onSubmit={handleSubmit}
      >
        <Button
          id="loginButton"
          type="button"
          className="text-gray-300 caret-transparent"
          onClick={handleSelected}
          isSelected={isSelected}
        >
          Login
        </Button>
        <Button
          id="registerButton"
          type="button"
          className="text-gray-300 mb-10 ml-3 caret-transparent"
          onClick={handleSelected}
          isSelected={!isSelected}
        >
          Register
        </Button>
        <section className="font-serif text-gray-300">
          {isSelected ? (
            <>
              <FormField
                id="loginEmail"
                type="email"
                name="email"
                className="w-full mb-2 rounded-md bg-transparent text-gray-400"
                value={formData.email}
                placeholder="Insert your e-mail"
                error={error}
                nameError={formData.emailError}
                onChange={(e) => handleInputChange(e, "email")}
              >
                E-mail
              </FormField>
              <FormField
                id="loginPassword"
                type="password"
                name="password"
                className="w-full mb-2 rounded-md bg-transparent text-gray-400"
                value={formData.password}
                placeholder="Insert your password"
                error={error}
                nameError={formData.passwordError}
                onChange={(e) => handleInputChange(e, "password")}
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
          ) : (
            <>
              <FormField
                id="name"
                name="name"
                type="text"
                className="w-full mb-2 rounded-md bg-transparent text-gray-400"
                placeholder="Insert your name"
                value={formData.name}
                error={error}
                nameError={formData.nameError}
                onChange={(e) => handleInputChange(e, "name")}
              >
                Name
              </FormField>
              <FormField
                id="lastName"
                name="lastName"
                type="text"
                className="w-full mb-2 rounded-md bg-transparent text-gray-400"
                placeholder="Insert your last name"
                value={formData.lastName}
                error={error}
                nameError={formData.lastNameError}
                onChange={(e) => handleInputChange(e, "lastName")}
              >
                Last Name
              </FormField>
              <FormField
                id="registerEmail"
                type="email"
                name="email"
                className="w-full mb-2 rounded-md bg-transparent text-gray-400"
                placeholder="Insert your e-mail"
                value={formData.email}
                error={error}
                nameError={formData.emailError}
                onChange={(e) => handleInputChange(e, "email")}
              >
                E-mail
              </FormField>
              <FormField
                id="registerPassword"
                type="password"
                name="password"
                placeholder="Insert your password"
                className="w-full mb-2 rounded-md bg-transparent text-gray-400"
                value={formData.password}
                error={error}
                nameError={formData.passwordError}
                onChange={(e) => handleInputChange(e, "password")}
              >
                Password
              </FormField>
              <FormField
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="w-full mb-2 rounded-md bg-transparent text-gray-400"
                value={formData.confirmPassword}
                error={error}
                nameError={formData.confirmPasswordError}
                onChange={(e) => handleInputChange(e, "confirmPassword")}
              >
                Confirm Password
              </FormField>
              <FormField
                id="initialBalance"
                type="text"
                name="initialBalance"
                placeholder="Insert your initial Balance, this value can't be changed"
                className="w-full mb-2 rounded-md bg-transparent text-gray-400"
                value={formatBalance(Number(formData.initialBalance))}
                error={error}
                nameError={formData.initialBalanceError}
                onChange={handleValueChange}
              >
                Your initial balance
              </FormField>
              <Button
                id="confirmButton"
                type="submit"
                className="bg-red-500 mt-5 p-4 w-full caret-transparent"
                disabled={disabled}
              >
                Confirm
              </Button>
            </>
          )}
        </section>
      </form>
    </div>
  );
};

export default Login;
