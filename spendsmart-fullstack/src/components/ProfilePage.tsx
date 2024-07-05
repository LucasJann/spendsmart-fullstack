import { useState } from "react";
import landScape from "../Images/landscape.jpg";
import Input from "./Input";
import Button from "./Button";

const Profile = () => {
  const [balance, setBalance] = useState("");

  const valueState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(event.target.value);
  };

  const valueHandler = async () => {
    const user = localStorage.getItem('user')
    try {
      await fetch("http://localhost:8080/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, balance }),
      }).then((resData) => {
        console.log(resData);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${landScape})` }}
    >
      <div className="max-w-md w-full bg-black bg-opacity-60 shadow-mg rounded-md p-6">
        <Input
          id="balance"
          name="balance"
          type="text"
          value={balance}
          placeholder="Insert your initial balance"
          className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400, text-white text-center text-lg"
          onChange={valueState}
        ></Input>
        <hr />
        <Button
          type="submit"
          className="bg-yellow-500 mt-5 ml-10 p-4 w-4/5 mx-auto text-white"
          onClick={valueHandler}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default Profile;
