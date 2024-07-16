import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import Button from "./Button";
import burningSkyImage from "../images/burning-sky.jpg";

const Login = () => {
  interface formValuesProperties {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    nameError: boolean;
    lastNameError: boolean;
    emailError: boolean;
    passwordError: boolean;
    confirmPasswordError: boolean;
  }

  const formValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
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

    const data = isSelected
      ? { email, password }
      : { name, lastName, email, password, confirmPassword };

    try {
      const url = isSelected
        ? "http://localhost:8080/login"
        : "http://localhost:8080/";

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
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
            if (resData.path === "name") {
              setFormData((prevState) => ({
                ...prevState,
                nameError: true,
              }));
              setDisabled(true);
            } else if (resData.path === "lastName") {
              setFormData((prevState) => ({
                ...prevState,
                lastNameError: true,
              }));
              setDisabled(true);
            } else if (resData.path === "email") {
              setFormData((prevState) => ({
                ...prevState,
                emailError: true,
              }));
              setDisabled(true);
            } else if (resData.path === "password") {
              setFormData((prevState) => ({
                ...prevState,
                passwordError: true,
              }));
              setDisabled(true);
            } else {
              setFormData((prevState) => ({
                ...prevState,
                confirmPasswordError: true,
              }));
              setDisabled(true);
            }
          } else {
            setFormData((prevState) => ({
              ...prevState,
              name: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }));
            if (!isSelected) {
              navigate("/");
              setIsSelected(!isSelected);
            } else {
              navigate("/menuPage");
              localStorage.setItem("user", JSON.stringify(email));
            }
          }
        });
    } catch (err) {
      console.log(err);
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
          type="submit"
          className="bg-transparent border-t-0 border-l-0 border-r-0 mb-10 text-gray-300 "
          onClick={handleSelected}
          isSelected={isSelected}
        >
          Login
        </Button>
        <Button
          id="registerButton"
          type="submit"
          className="bg-transparent border-t-0 border-l-0 border-r-0 mb-10 text-gray-300 ml-3 "
          onClick={handleSelected}
          isSelected={!isSelected}
        >
          Register
        </Button>
        {isSelected && (
          <section className="text-left font-serif text-gray-300">
            <h2 className={formData.emailError ? "mt-2 text-red-400" : "mt-2"}>
              E-mail
            </h2>
            <Input
              id="loginEmail"
              type="email"
              name="email"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              value={formData.email}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                  emailError: false,
                }));
                setDisabled(false);
              }}
              placeholder="Insira seu e-mail"
            />
            {formData.emailError && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
            <hr />
            <h2
              className={formData.passwordError ? "mt-2 text-red-400" : "mt-2"}
            >
              Password
            </h2>
            <Input
              id="loginPassword"
              type="password"
              name="password"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              value={formData.password}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                  passwordError: false,
                }));
                setDisabled(false);
              }}
              placeholder="Insira sua senha"
            />
            {formData.passwordError && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
            <hr />
            <Button
              id="entranceButton"
              type="submit"
              className="bg-red-500 mt-5 ml-10 p-4 w-4/5 mx-auto"
            >
              Entrar
            </Button>
          </section>
        )}
        {!isSelected && (
          <section className="text-left font-serif text-gray-300">
            <h2 className={formData.nameError ? "mt-2 text-red-400" : "mt-2"}>
              Name
            </h2>
            <Input
              id="name"
              type="text"
              name="name"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              value={formData.name}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                  nameError: false,
                }));
                setDisabled(false);
              }}
              placeholder="Insira seu nome"
            />
            {formData.nameError && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
            <hr />
            <h2
              className={formData.lastNameError ? "mt-2 text-red-400" : "mt-2"}
            >
              Last Name
            </h2>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              value={formData.lastName}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  lastName: e.target.value,
                  lastNameError: false,
                }));
                setDisabled(false);
              }}
              placeholder="Insira seu sobrenome"
            />
            {formData.lastNameError && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
            <hr />
            <h2 className={formData.emailError ? "mt-2 text-red-400" : "mt-2"}>
              E-mail
            </h2>
            <Input
              id="registerEmail"
              type="email"
              name="email"
              placeholder="Insira seu e-mail"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              value={formData.email}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                  emailError: false,
                }));
                setDisabled(false);
              }}
            />
            <hr />
            {formData.emailError && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
            <h2
              className={formData.passwordError ? "mt-2 text-red-400" : "mt-2"}
            >
              Password
            </h2>
            <Input
              id="registerPassword"
              type="password"
              name="password"
              placeholder="Insira sua senha"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              value={formData.password}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                  passwordError: false,
                }));
                setDisabled(false);
              }}
            />
            {formData.passwordError && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
            <hr />
            <h2
              className={
                formData.confirmPasswordError ? "mt-2 text-red-400" : "mt-2"
              }
            >
              Confirm Password
            </h2>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  confirmPassword: e.target.value,
                  passwordError: false,
                  confirmPasswordError: false,
                }));
                setDisabled(false);
              }}
            />
            {formData.confirmPasswordError && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
            <hr />
            <Button
              id="confirmButton"
              type="submit"
              className={
                disabled
                  ? "bg-red-300 mt-5 ml-10 p-4 w-4/5 mx-auto"
                  : "bg-red-500 mt-5 ml-10 p-4 w-4/5 mx-auto"
              }
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
