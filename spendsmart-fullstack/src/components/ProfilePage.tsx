import React, { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Image from "./Image";
import landScape from "../images/landscape.jpg";
import profilePic from "../images/profilepic.jpg";

const Profile = () => {
  const [balance, setBalance] = useState<number>(0);
  const [oldBalance, setOldBalance] = useState<number>();
  const [profileImage, setProfileImage] = useState<string>(profilePic);

  interface formProperties {
    image: boolean;
    disabled: boolean;
    onConfirm: boolean;
    editBalance: boolean;
  }

  const formValues = {
    image: false,
    disabled: true,
    onConfirm: false,
    editBalance: false,
  };

  const [formState, setFormState] = useState<formProperties>(formValues);

  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user")?.replace(/"/g, "");
      try {
        const [profileResponse, balanceResponse] = await Promise.all([
          fetch(`http://localhost:8080/profile/${user}`),
          fetch(`http://localhost:8080/balance/${user}`),
        ]);

        if (!profileResponse.ok) {
          throw new Error(
            `Failed to fetch profile data. Status: ${profileResponse.status}`
          );
        }
        const profileJson = await profileResponse.json();
        const fetchedProfileImage = profileJson.image
          ? `../../backend/src/images/${profileJson.image.split("images\\")[1]}`
          : profilePic;
        setProfileImage(fetchedProfileImage);

        if (!balanceResponse.ok) {
          throw new Error(
            `Failed to fetch balance data. Status: ${balanceResponse.status}`
          );
        }
        const balanceJson = await balanceResponse.json();
        setBalance(balanceJson.balance || 0);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [formState.onConfirm]);

  const formatBalance = (value: number) => {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    return formatter.format(value / 100);
  };

  const handleImageClick = () => {
    setFormState((prevState) => ({
      ...prevState,
      image: true,
    }));
  };

  const handleImageUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const inputElement = event.currentTarget.getElementsByTagName("input")[0];
    if (inputElement.files && inputElement.files.length > 0) {
      formData.append("image", inputElement.files[0]);
    }
    try {
      const user = localStorage.getItem("user")?.replace(/"/g, "");
      const response = await fetch(`http://localhost:8080/profile/${user}`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        return console.log(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error uploading profile image:", error);
    }
    setFormState((prevState) => ({
      ...prevState,
      image: false,
      onConfirm: !formState.onConfirm,
    }));
  };

  const handleInvertion = () => {
    if (oldBalance === undefined) {
      setOldBalance(balance);
    }

    if (balance === 0) {
      return;
    }
    setBalance((prevBalance) => -prevBalance);
  };

  const handleCancel = () => {
    if (oldBalance !== undefined) {
      setBalance(oldBalance);
    }
    setFormState((prevState) => ({
      ...prevState,
      disabled: true,
      editBalance: false,
    }));
  };

  const getBalanceTextColor = () => {
    if (balance > 0) {
      return "text-green-300";
    } else if (balance < 0) {
      return "text-red-300";
    }
    return "text-gray-300";
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldBalance(balance);
    const value = event.target.value.replace(/[^0-9]/g, "");
    setBalance(Number(value));
  };

  const handleConfirm = async () => {
    const user = localStorage.getItem("user")?.replace(/"/g, "");
    try {
      await fetch("http://localhost:8080/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, balance }),
      });
    } catch (error) {
      console.log("Error updating balance:", error);
    }
    setOldBalance(undefined);
    setFormState((prevState) => ({
      ...prevState,
      editBalance: false,
      disabled: true,
    }));
  };

  const handleEdit = () => {
    setFormState((prevState) => ({
      ...prevState,
      editBalance: true,
      disabled: false,
    }));
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${landScape})` }}
    >
      <div className="flex flex-col items-center justify-center h-screen caret-transparent">
        <Image
          src={profileImage}
          alt="Profile Pic"
          onClick={handleImageClick}
          className="w-64 h-64 rounded-full"
        />
        {formState.image && (
          <form onSubmit={handleImageUpload}>
            {/* <label htmlFor="image">Upload Profile Picture</label> */}
            <Input
              id="image"
              type="file"
              name="image"
              className="w-full sm:w-5/6 border-2 border-r-0 text-white bg-black bg-opacity-60 shadow-mg p-0.5 pb-1"
            />
            <Button
              id="image"
              type="submit"
              className="border-2 border-l-0 text-center p-2 text-white bg-yellow-500 text-sm w-full sm:w-1/6 mt-1 md:w-1/6 lg:w-1/6 xl:w-1/6 "
            >
              OK
            </Button>
          </form>
        )}
        <div className="max-w-md mt-12 w-full bg-black bg-opacity-60 shadow-mg rounded-md p-6 mb-5">
          {formState.editBalance && (
            <div className="flex items-center justify-between">
              <Button
                id="invertButton"
                type="button"
                onClick={handleInvertion}
                className={
                  balance < 0
                    ? "text-yellow-500 hover:text-green-500"
                    : "text-yellow-500 hover:text-red-500"
                }
              >
                Invert
              </Button>
              <Button
                id="cancelButton"
                type="button"
                className="text-yellow-500 hover:text-red-500"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          )}
          <Input
            id="balance"
            type="text"
            name="balance"
            className={`block w-full mb-2 px-12 rounded-md shadow-sm focus:ring-0 border-transparent ${getBalanceTextColor()} bg-transparent text-center text-lg`}
            value={formatBalance(balance)}
            onChange={handleValueChange}
            disabled={formState.disabled}
          />
          <hr />
          <Button
            id="balanceButton"
            type="submit"
            className="bg-yellow-500 mt-5 p-4 w-full text-white"
            onClick={formState.editBalance ? handleConfirm : handleEdit}
          >
            {formState.editBalance ? "Confirm" : "Edit Balance"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
