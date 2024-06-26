import { useState } from "react";
import { Form, Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [isSelected, setIsSelected] = useState(true);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          if (resData.errorMessage !== undefined) {
            let err = resData.errorMessage;
            setError(err);

            console.log(error);
            console.log(resData.path);
            if (resData.path === "name") {
              setNameError(true);
              setDisabled(true);
            } else if (resData.path === "lastName") {
              setLastNameError(true);
              setDisabled(true);
            } else if (resData.path === "email") {
              setEmailError(true);
              setDisabled(true);
            } else if (resData.path === "password") {
              setPasswordError(true);
              setDisabled(true);
            } else {
              setConfirmPasswordError(true);
              setDisabled(true);
            }
          } else {
            onSelected();
          }
        });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onSelected = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Form
        className="max-w-md w-full bg-black bg-opacity-60 shadow-mg rounded-md p-6"
        onSubmit={submitHandler}
      >
        <Button
          type="button"
          className="bg-transparent border-t-0 border-l-0 border-r-0 mb-10 text-gray-300 "
          onClick={onSelected}
          isSelected={isSelected}
        >
          <Link to="/" />
          Login
        </Button>
        <Button
          type="button"
          className="bg-transparent border-t-0 border-l-0 border-r-0 mb-10 text-gray-300 ml-3 "
          onClick={onSelected}
          isSelected={!isSelected}
        >
          <Link to="/" />
          Register
        </Button>
        {isSelected && (
          <section className="text-left font-serif text-gray-300">
            <h2 className="mt-2">E-mail</h2>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <hr />
            <h2 className="mt-2">Password</h2>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <hr />
            <Button
              type="submit"
              className="bg-red-500 mt-5 ml-10 p-4 w-4/5 mx-auto"
            >
              Entrar
            </Button>
          </section>
        )}
        {!isSelected && (
          <section className="text-left font-serif text-gray-300">
            <h2 className="mt-2">Nome</h2>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Insira seu nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
                setDisabled(false);
              }}
            />
            {nameError && <p className="text-red-400 text-xs">{error}</p>}
            <hr />
            <h2 className="mt-2">Sobrenome</h2>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Insira seu sobrenome"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError(false);
                setDisabled(false);
              }}
            />
            {lastNameError && <p className="text-red-400 text-xs">{error}</p>}
            <hr />
            <h2 className="mt-2">E-mail</h2>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
                setDisabled(false);
              }}
            />
            <hr />
            {emailError && <p className="text-red-400 text-xs">{error}</p>}
            <h2 className="mt-2">Senha</h2>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
                setDisabled(false);
              }}
            />
            {passwordError && <p className="text-red-400 text-xs">{error}</p>}
            <hr />
            <h2 className="mt-2">Confirmar Senha</h2>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError(false);
                setDisabled(false);
              }}
            />
            {confirmPasswordError && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
            <hr />
            <Button
              type="submit"
              className={
                disabled
                  ? "bg-red-300 mt-5 ml-10 p-4 w-4/5 mx-auto"
                  : "bg-red-500 mt-5 ml-10 p-4 w-4/5 mx-auto"
              }
              disabled={disabled}
            >
              Confirmar
            </Button>
          </section>
        )}
      </Form>
    </div>
  );
};

export default LoginPage;
