import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Image from "./Image";
import Input from "./Input";
import Button from "./Button";
import NavBar from "./NavBar";
import landScape from "../images/morning.jpg";
import profilePic from "../images/profilepic.jpg";
import emptyImage from "../images/prestate.png";

const formatBalance = (value: number) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format(value / 100);
};

interface profileProperties {
  name: string;
  image: string;
  balance: number;
  selectedImage: string | undefined;
}

interface formProperties {
  image: boolean;
  disabled: boolean;
  onConfirm: boolean;
  imageSaved: boolean
  editBalance: boolean;
}

const Profile = () => {
  const profileValues: profileProperties = {
    name: "",
    image: profilePic,
    balance: 0,
    selectedImage: undefined,
  };

  const formValues: formProperties = {
    image: false,
    disabled: true,
    onConfirm: false,
    imageSaved: false,
    editBalance: false,
  };

  const [form, setForm] = useState(formValues);
  const [preState] = useState<string>(emptyImage);
  const [profile, setProfile] = useState(profileValues);

  const location = useLocation();

  useEffect(() => {
    if (!form.imageSaved) {
      const handleBeforeUnload = async () => {
        if (profile.selectedImage) {
          const selectedImageState = profile.selectedImage.split("src\\")[1];

          const bodyImage = {
            selectedImage: selectedImageState,
          };

          try {
            await fetch(`http://localhost:8080/profile/clearImage`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bodyImage),
            });
          } catch (err) {
            console.error(err);
          }
        }
      };
      handleBeforeUnload();
    } else {
      window.location.reload();
    }
  }, [form.imageSaved]);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (profile.selectedImage) {
        const selectedImageState = profile.selectedImage.split("src\\")[1];

        const bodyImage = {
          selectedImage: selectedImageState,
        };

        console.log(bodyImage)
        try {
          await fetch(`http://localhost:8080/profile/clearImage`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyImage),
          });
        } catch (err) {
          console.error(err);
        }
      }
    };
    if (profile.selectedImage !== undefined) {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("popState", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popState", handleBeforeUnload);

        handleBeforeUnload();
      };
    }
  }, [profile.selectedImage, location.pathname]);

  useEffect(() => {
    if (profile.selectedImage) {
      const handleRouteChange = async () => {
        const selectedImageState = profile.selectedImage?.split("src\\")[1];
        const bodyImage = { selectedImage: selectedImageState };

        try {
          await fetch(`http://localhost:8080/profile/clearImage`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyImage),
          });
        } catch (err) {
          console.error(err);
        }
      };

      handleRouteChange();
    }
  }, [location.pathname]);

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

        if (profileJson.image) {
          const fetchedProfileImage = profileJson.image
            ? `../../backend/src/images/${
                profileJson.image.split("images\\")[1]
              }`
            : preState;
          const userName = profileJson.name + " " + profileJson.lastName;

          setProfile((prevState) => ({
            ...prevState,
            name: userName,
            image: fetchedProfileImage,
          }));
        }

        if (!balanceResponse.ok) {
          throw new Error(
            `Failed to fetch balance data. Status: ${balanceResponse.status}`
          );
        }
        const balanceJson = await balanceResponse.json();
        setProfile((prevState) => ({
          ...prevState,
          balance: balanceJson.balance || 0,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [form.onConfirm]);

  const handleImageClick = () => {
    setForm((prevState) => ({
      ...prevState,
      image: true,
    }));
  };

  const imageChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const inputImage = e.currentTarget;

    if (inputImage.files && inputImage.files.length > 0) {
      formData.append("image", inputImage.files[0]);
    }

    if (profile.image) {
      formData.append("profileImage", profile.image);
    }

    try {
      const user = localStorage.getItem("user")?.replace(/"/g, "");
      const response = await fetch(
        `http://localhost:8080/profile/image/${user}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("Error to fetch");
      }
      const responseData = await response.json();

      const newProfileImage = responseData.path
        ? `../../backend/src/images/${responseData.path.split("images\\")[1]}`
        : preState;

      setProfile((prevState) => ({
        ...prevState,
        image: newProfileImage,
        selectedImage: responseData.path,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const inputElement = event.currentTarget.getElementsByTagName("input")[0];

    if (inputElement.files && inputElement.files.length > 0) {
      formData.append("image", inputElement.files[0]);
    }

    if (profile.image) {
      formData.append("profileImage", profile.image);
    }

    try {
      const user = localStorage.getItem("user")?.replace(/"/g, "");
      await fetch(`http://localhost:8080/profile/${user}`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }

    setForm((prevState) => ({
      ...prevState,
      image: false,
      onConfirm: !form.onConfirm,
      imageSaved: true,
    }));
  };

  const getBalanceTextColor = () => {
    if (profile.balance > 0) {
      return "text-green-300";
    } else if (profile.balance < 0) {
      return "text-red-300";
    }
    return "text-gray-300";
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setProfile((prevState) => ({
      ...prevState,
      balance: Number(value),
    }));
  };

  return (
    <div
      className="flex justify-center h-screen bg-cover bg-center bg-no-repeat caret-transparent w-full"
      style={{ backgroundImage: `url(${landScape})` }}
    >
      <div className="w-full flex flex-col items-center justify-center h-screen">
        <NavBar image={form.imageSaved} />
        <Image
          src={profile.image}
          alt="Image"
          onClick={handleImageClick}
          className="w-64 h-64 rounded-full "
        />
        {form.image && (
          <form onSubmit={handleImageUpload}>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={imageChanged}
              className="w-5/6 border-2 border-r-0 text-white mt-1 p-0.5 pb-1 bg-black bg-opacity-60 shadow-mg"
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
        {!form.image && (
          <p className="text-white text-3xl font-mono font-bold">{profile.name}</p>
        )}
        <div className="text-white text-4xl items-start"></div>
        <div className="flex max-w-md w-5/6 bg-black bg-opacity-60 shadow-mg rounded-md p-2 mt-1 mb-14 text-white">
          <h2 className="w-1/2 text-yellow-500">Your balance:</h2>
          <Input
            id="balance"
            type="text"
            name="balance"
            className={`w-full rounded-md shadow-sm focus:ring-0 border-transparent ${getBalanceTextColor()} bg-transparent text-center text-md`}
            value={formatBalance(profile.balance)}
            onChange={handleValueChange}
            disabled={form.disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
