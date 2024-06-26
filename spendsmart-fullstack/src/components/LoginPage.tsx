import { Form, Link } from "react-router-dom";

import Image from "./Image";
import image from "../Images/3d-cash-money.jpg";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const alternative = "A golden coin";

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Form
        className="max-w-md mx-auto bg-white shadow-md rounded-md p-6"
        onSubmit={submitHandler}
      >
        <Image src={image} alt={alternative} />
        <section>
          <h2>E-mail</h2>
          <h2>Password</h2>
        </section>
      </Form>
      <Link to="/">Register</Link>
    </>
  );
};

export default LoginPage;
