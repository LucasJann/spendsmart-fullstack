import { Form, Link } from "react-router-dom";
import Input from "./Input";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Form
        className="max-w-md w-full bg-transparent shadow-md rounded-md p-6"
        onSubmit={submitHandler}
      >
        <section className="text-left font-serif text-gray-300">
          <h2>E-mail</h2>
          <Input type="email" name="email" placeholder="Insira seu e-mail" />
          <hr/>
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
