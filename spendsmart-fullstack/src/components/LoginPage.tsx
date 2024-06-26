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
        <section className="text-left font-serif text-gray-300">
          <h2>E-mail</h2>
          <Input type="email" name="email" placeholder="Insira seu e-mail" />
          <hr />
          <h2>Password</h2>
          <Input
            type="password"
            name="password"
            placeholder="Insira sua senha"
          />
          <hr />
        </section>
      </Form>
    </div>
  );
};

export default LoginPage;
