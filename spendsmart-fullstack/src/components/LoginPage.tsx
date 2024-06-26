import { useState } from "react";
import { Form, Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const [isSelected, setIsSelected] = useState(false);

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
            <Input type="email" name="email" placeholder="Insira seu e-mail" />
            <hr />
            <h2 className="mt-2">Password</h2>
            <Input
              type="password"
              name="password"
              placeholder="Insira sua senha"
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
            <Input type="text" name="name" placeholder="Insira seu nome" />
            <hr />
            <h2 className="mt-2">Sobrenome</h2>
            <Input
              type="text"
              name="nickname"
              placeholder="Insira seu sobrenome"
            />
            <hr />
            <h2 className="mt-2">E-mail</h2>
            <Input type="email" name="email" placeholder="Insira seu e-mail" />
            <hr />
            <h2 className="mt-2">Password</h2>
            <Input
              type="password"
              name="password"
              placeholder="Insira sua senha"
            />
            <hr />
            <h2 className="mt-2">Confirm Password</h2>
            <Input
              type="password"
              name="confirmpassword"
              placeholder="Confirme sua senha"
            />
            <hr />
            <Button
              type="submit"
              className="bg-red-500 mt-5 ml-10 p-4 w-4/5 mx-auto"
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
