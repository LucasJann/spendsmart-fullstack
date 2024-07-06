import { useState } from "react";
import landScape from "../images/landscape.jpg";
import profilePic from "../images/profilepic.jpg";
import Input from "./Input";
import Button from "./Button";
import Image from "./Image";

const Profile = () => {
  const [balance, setBalance] = useState<string>("");
  const [editBalance] = useState<boolean>(false);

  const valueState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(event.target.value);
  };

  const valueHandler = async () => {
    const user = localStorage.getItem("user");
    try {
      await fetch("http://localhost:8080/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, balance }),
      });
    } catch (err) {
      console.log("Não foi possível acessar o backend");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${landScape})` }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <Image src={profilePic} alt="Profile Pic" />
        <div className="max-w-md w-full bg-black bg-opacity-60 shadow-mg rounded-md p-6">
          <Input
            id="balance"
            name="balance"
            type="text"
            value={balance}
            placeholder="Insert your initial balance"
            className="block w-full mb-2 px-12 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400 text-white text-center text-lg"
            onChange={valueState}
          />
          <hr />
          <Button
            type="submit"
            className="bg-yellow-500 mt-5 p-4 w-full text-white"
            onClick={valueHandler}
          >
            {editBalance ? "Confirm" : "Edit Balance"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
