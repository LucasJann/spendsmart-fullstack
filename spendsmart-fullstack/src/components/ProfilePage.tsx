import { useEffect, useState } from "react";
import landScape from "../images/landscape.jpg";
import profilePic from "../images/profilepic.jpg";
import Input from "./Input";
import Button from "./Button";
import Image from "./Image";

const Profile = () => {
  const [image, setImage] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [onConfirm, setOnConfirm] = useState<boolean>(false);
  const [editBalance, setEditBalance] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("user")?.replace(/"/g, "");
    const getBalance = async () => {
      try {
        const response = await fetch(`http://localhost:8080/balance/${user}`);

        if (!response.ok) {
          console.log("Response is not ok");
          return;
        }

        const jsonResponse = await response.json();
        setBalance(jsonResponse.balance);
      } catch (err) {
        console.error(err);
      }
    };

    getBalance();
  }, [onConfirm]);

  const valueState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(event.target.value);
  };

  const onEdit = () => {
    setEditBalance(true);
    setDisabled(false);
  };

  const onValueHander = async () => {
    const user = localStorage.getItem("user")?.replace(/"/g, "");
    try {
      await fetch("http://localhost:8080/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, balance }),
      });
    } catch (err) {
      console.error(err);
    }
    setOnConfirm(!onConfirm);
    setEditBalance(false);
    setDisabled(true);
  };

  const imageHandler = () => {
    setImage(true);
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const image = files[0];
      setProfileImage(URL.createObjectURL(image));
    }
  };

  const onImageSubmitHandler = () => {};

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${landScape})` }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <Image
          src={profileImage ? profileImage : profilePic}
          alt="Profile Pic"
          onClick={imageHandler}
        />
        {image && (
          <form onSubmit={onImageSubmitHandler}>
            <Input
              id="image"
              name="image"
              placeholder=""
              type="file"
              onChange={inputChange}
              className="border-2 border-r-0 text-white bg-black bg-opacity-60 shadow-mg p-0.5 pb-1 mt-1"
            />
            <Button type="button" className='border-2 border-l-0 text-center p-2 text-white bg-yellow-500 text-sm'>OK</Button>
          </form>
        )}
        <div className="max-w-md mt-12 w-full bg-black bg-opacity-60 shadow-mg rounded-md p-6">
          <Input
            id="balance"
            name="balance"
            type="text"
            value={balance}
            placeholder="Insert your initial balance"
            className="block w-full mb-2 px-12 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400 text-white text-center text-lg"
            onChange={valueState}
            disabled={disabled}
          />
          <hr />
          <Button
            type="submit"
            className="bg-yellow-500 mt-5 p-4 w-full text-white"
            onClick={editBalance ? onValueHander : onEdit}
          >
            {editBalance ? "Confirm" : "Edit Balance"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
