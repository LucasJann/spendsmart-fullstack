import React, { useEffect, useState } from "react";

import Image from "./Image";
import Input from "./Input";
import Button from "./Button";
import landScape from "../images/landscape.jpg";
import profilePic from "../images/profilepic.jpg";

const Profile = () => {
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

  const [balance, setBalance] = useState<number>(0);
  const [oldBalance, setOldBalance] = useState<number>();

  const [saveImage, setSaveImage] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(profilePic);
  const [oldProfileImage, setOldProfileImage] = useState<string>("");

  useEffect(() => {
    if (saveImage) {
      const clearImage = async () => {
        const oldProfile = {
          image: oldProfileImage,
        };

        console.log(oldProfile)
        try {
          await fetch("http://localhost:8080/profile/clearImage", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(oldProfile),
          });
        } catch (err) {
          console.error(err);
        }
      };
      clearImage();
    }
  }, [saveImage]);

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
        console.error("Error fetching data:", error);
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

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const user = localStorage.getItem("user")?.replace(/"/g, "");
      await fetch(`http://localhost:8080/profile/${user}`, {
        method: "POST",
        body: formData,
      });
      setSaveImage(!saveImage);
    } catch (error) {
      console.error("Error uploading profile image:", error);
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
      console.error("Error updating balance:", error);
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

  const imageChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputImage = e.currentTarget;
    const formData = new FormData();

    if (inputImage.files && inputImage.files.length > 0) {
      formData.append("image", inputImage.files[0]);
    }
    try {
      const response = await fetch("http://localhost:8080/profile/image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Error to fetch");
      }

      const responseData = await response.json();
      const newProfileImage = responseData.path
        ? `../../backend/src/images/${responseData.path.split("images\\")[1]}`
        : profilePic;

      setProfileImage(newProfileImage);
      setOldProfileImage(profileImage);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat caret-transparent w-full"
      style={{ backgroundImage: `url(${landScape})` }}
    >
      <div className="w-full flex flex-col items-center justify-center h-screen">
        <Image
          src={profileImage}
          alt="Profile Pic"
          onClick={handleImageClick}
          className="w-64 h-64 rounded-full mb-2"
        />
        {formState.image && (
          <form onSubmit={handleImageUpload}>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={imageChanged}
              className="w-5/6 border-2 border-r-0 text-white mb-5 p-0.5 pb-1 bg-black bg-opacity-60 shadow-mg"
            />
            <Button
              id="image"
              type="submit"
              className=" w-1/6 border-2 border-l-0 text-center p-2 bg-yellow-500 text-white text-sm"
            >
              OK
            </Button>
          </form>
        )}
        <div className="max-w-md mt-10 w-full bg-black bg-opacity-60 shadow-mg rounded-md p-6 mb-5">
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
