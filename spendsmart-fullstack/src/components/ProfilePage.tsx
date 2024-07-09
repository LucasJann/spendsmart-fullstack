import { useEffect, useState } from "react";

import Input from "./Input";
import Button from "./Button";
import Image from "./Image";
import landScape from "../images/landscape.jpg";
import profilePic from "../images/profilepic.jpg";

const Profile = () => {
  const [image, setImage] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [onConfirm, setOnConfirm] = useState<boolean>(false);
  const [editBalance, setEditBalance] = useState<boolean>(false);

  const [balance, setBalance] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("user")?.replace(/"/g, "");
    const getImage = async () => {
      try {
        const response = await fetch(`http://localhost:8080/profile/${user}`);

        if (!response.ok) {
          console.log("Response is not ok");
          return;
        }

        const jsonResponse = await response.json();

        if (jsonResponse.image !== "images/profilePic") {
          const splitedProfilePic = jsonResponse.image.split("images\\")[1];
          setProfileImage(splitedProfilePic);
        } else {
          setProfileImage(profilePic);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getImage();
  });

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
    const formatMoney = (value: number) => {
      const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });

      return formatter.format(value);
    };

    const value = event.target.value.replace(/[^0-9]/g, "");
    const convertedValue = Number(value);
    const formattedValue = formatMoney(convertedValue / 100);
    setBalance(formattedValue);
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

  const onImageSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData();
    const inputElement = event.currentTarget.getElementsByTagName("input")[0];
    if (inputElement.files && inputElement.files.length > 0) {
      formData.append("image", inputElement.files[0]);
    }

    try {
      const response = await fetch(`http://localhost:8080/profile/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
    } catch (err) {
      console.error(err);
    }
    setImage(false);
  };

  const onCancel = () => {
    setEditBalance(false);
    setDisabled(true);
    setOnConfirm(!onConfirm);
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${landScape})` }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <Image
          src={
            profileImage !== profilePic
              ? `../../backend/src/images/${profileImage}`
              : profilePic
          }
          alt="Profile Pic"
          onClick={imageHandler}
        />
        {image && (
          <form onSubmit={onImageSubmitHandler}>
            <Input
              id="image"
              name="image"
              type="file"
              className="border-2 border-r-0 text-white bg-black bg-opacity-60 shadow-mg p-0.5 pb-1 mt-1"
            />
            <Button
              id="image"
              type="submit"
              className="border-2 border-l-0 text-center p-2 text-white bg-yellow-500 text-sm"
            >
              OK
            </Button>
          </form>
        )}

        <div className="max-w-md mt-12 w-full bg-black bg-opacity-60 shadow-mg rounded-md p-6 mb-5">
          {editBalance && (
            <>
              <div className="flex items-center justify-end">
                <Button
                  id="editButton"
                  type="button"
                  className="text-red-300 hover:text-red-500"
                  onClick={onCancel}
                >
                  X
                </Button>
              </div>
            </>
          )}
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
            id="balance"
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
