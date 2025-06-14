import { useState } from "react";

import Login from "../components/Login";
import Button from "../components/Button";
import Register from "../components/Register";

import burningSkyImage from "../images/burning-sky.jpg";

const Home = () => {
  const [isSelected, setIsSelected] = useState(true);

  const handleSelected = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${burningSkyImage})` }}
    >
      <div className="max-w-md w-full bg-black bg-opacity-60 shadow-mg rounded-md p-6">
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
          {isSelected ? <Login /> : <Register />}
        </section>
      </div>
    </div>
  );
};

export default Home;
