import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import burningSkyImage from "../images/burning-sky.jpg";
import FormField from "./FormField";

const formatBalance = (value: number) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format(value / 100);
};

const Login = () => {
  interface formValuesProperties {
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

  const formValues = {
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

  const [formData, setFormData] = useState<formValuesProperties>(formValues);

  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem("user", "");
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = formData.name;
    const lastName = formData.lastName;
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    let initialBalance = formData.initialBalance;

    if (initialBalance === "") {
      initialBalance = "0";
    }

    const data = isSelected
      ? { email, password }
      : { name, lastName, email, password, confirmPassword, initialBalance };

    try {
      const url = isSelected
        ? "http://localhost:8080/login"
        : "http://localhost:8080/";

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          let err = resData.errorMessage;
          if (err !== undefined) {
            setError(err);
            switch (resData.path) {
              case "name":
                setFormData((prevState) => ({
                  ...prevState,
                  nameError: true,
                }));
                setDisabled(true);
                break;
              case "lastName":
                setFormData((prevState) => ({
                  ...prevState,
                  lastNameError: true,
                }));
                setDisabled(true);
                break;
              case "email":
                setFormData((prevState) => ({
                  ...prevState,
                  emailError: true,
                }));
                setDisabled(true);
                break;
              case "password":
                setFormData((prevState) => ({
                  ...prevState,
                  passwordError: true,
                }));
                setDisabled(true);
                break;
              default:
                setFormData((prevState) => ({
                  ...prevState,
                  name: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  initialBalance: "",
                }));
                break;
            }
          } else {
            setFormData((prevState) => ({
              ...prevState,
              name: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              initialBalance: "",
            }));
            if (!isSelected) {
              navigate("/");
              setIsSelected(!isSelected);
            } else {
              navigate("/profilePage");
              localStorage.setItem("user", JSON.stringify(email));
            }
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelected = () => {
    setIsSelected(!isSelected);
    setFormData((prevState) => ({
      ...prevState,
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
    }));
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");

    if (value.length > 15) {
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      initialBalance: value,
      initialBalanceError: false,
    }));
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${burningSkyImage})` }}
    >
      <form
        className="max-w-md w-full bg-black bg-opacity-60 shadow-mg rounded-md p-6"
        onSubmit={handleSubmit}
      >
        <Button
          id="loginButton"
          type="button"
          className="bg-transparent border-t-0 border-l-0 border-r-0 mb-10 text-gray-300 caret-transparent"
          onClick={handleSelected}
          isSelected={isSelected}
        >
          Login
        </Button>
        <Button
          id="registerButton"
          type="button"
          className="bg-transparent border-t-0 border-l-0 border-r-0 mb-10 text-gray-300 ml-3 caret-transparent"
          onClick={handleSelected}
          isSelected={!isSelected}
        >
          Register
        </Button>
        {isSelected && (
          <section className="text-left font-serif text-gray-300 ">
            <FormField
              id="loginEmail"
              type="email"
              name="email"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              value={formData.email}
              placeholder="Insira seu e-mail"
              error={error}
              nameError={formData.emailError}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                  emailError: false,
                }));
                setDisabled(false);
              }}
            >
              E-mail
            </FormField>
            <FormField
              id="loginPassword"
              type="password"
              name="password"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              value={formData.password}
              placeholder="Insira sua senha"
              error={error}
              nameError={formData.passwordError}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                  passwordError: false,
                }));
                setDisabled(false);
              }}
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
          </section>
        )}
        {!isSelected && (
          <section className="text-left font-serif text-gray-300">
            <FormField
              id="name"
              name="name"
              type="text"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              placeholder="Insert your name"
              value={formData.name}
              error={error}
              nameError={formData.nameError}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                  nameError: false,
                }));
                setDisabled(false);
              }}
            >
              Name
            </FormField>
            <FormField
              id="lastName"
              name="lastName"
              type="text"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              placeholder="Insert your last name"
              value={formData.lastName}
              error={error}
              nameError={formData.lastNameError}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  lastName: e.target.value,
                  lastNameError: false,
                }));
                setDisabled(false);
              }}
            >
              Last Name
            </FormField>
            <FormField
              id="registerEmail"
              type="email"
              name="email"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              placeholder="Insert your e-mail"
              value={formData.email}
              error={error}
              nameError={formData.emailError}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                  emailError: false,
                }));
                setDisabled(false);
              }}
            >
              E-mail
            </FormField>
            <FormField
              id="registerPassword"
              type="password"
              name="password"
              placeholder="Insert your password"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              value={formData.password}
              error={error}
              nameError={formData.passwordError}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                  passwordError: false,
                }));
                setDisabled(false);
              }}
            >
              Password
            </FormField>
            <FormField
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              value={formData.confirmPassword}
              error={error}
              nameError={formData.confirmPasswordError}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  confirmPassword: e.target.value,
                  confirmPasswordError: false,
                }));
                setDisabled(false);
              }}
            >
              Confirm Password
            </FormField>
            <FormField
              id="initialBalance"
              type="text"
              name="confirmPassword"
              placeholder="Insert your initial Balance, this value can't be changed"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
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
          </section>
        )}
      </form>
    </div>
  );
};

export default Login;
