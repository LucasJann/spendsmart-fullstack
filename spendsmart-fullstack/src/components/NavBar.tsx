import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Image from "./Image";
import profilePic from "../images/prestate.png";
const NavBar = () => {
  const location = useLocation();

  const [standardImage, setStandardImage] = useState<string>(profilePic);
  const [image, setImage] = useState<string>(standardImage);

  useEffect(() => {
    const profileImage = async () => {
      const user = localStorage.getItem("user")?.replace(/"/g, "");
      console.log(user);
      try {
        const response = await fetch(`http://localhost:8080/profile/${user}`);

        if (!response.ok) {
          console.error("");
        }

        const responseData = await response.json();
        setImage(
          `../../backend/src/images/${
            responseData.image.split("\\images\\")[1]
          }`
        );
        setStandardImage(image);
      } catch (err) {
        console.error(err);
      }
    };
    profileImage();
  }, []);

  return (
    <nav
      className="w-full fixed top-0 p-1 text-white caret-transparent"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      {location.pathname !== "/historyPage" && (
        <div className="flex space-x-10 font-serif ">
          <Link
            className={` mt-0.5 ml-2 ${
              location.pathname === "/profilePage"
                ? "text-yellow-500"
                : "hover:text-yellow-500"
            } hover:transition duration-1000 ease-in-out`}
            to="/profilePage"
          >
            Profile
          </Link>
          <Link
            className={`mt-0.5 ${
              location.pathname === "/financesPage"
                ? "text-red-500"
                : "hover:text-red-500"
            } hover:transition duration-1000 ease-in-out`}
            to="/financesPage"
          >
            Finances
          </Link>
          <Link
            className={` mt-0.5 ${
              location.pathname === "/goalsPage"
                ? "text-green-500"
                : "hover:text-green-500"
            } hover:transition duration-1000 ease-in-out`}
            to="/goalsPage"
          >
            Goals
          </Link>
          <Link className="flex justify-end w-full" to="/profilePage">
            <Image
              src={image}
              alt="Profile image"
              className="rounded-xl w-8 h-8 mr-2"
            />
          </Link>
        </div>
      )}
      <div className="space-x-10 font-serif">
        {location.pathname === "/historyPage" && (
          <a className="text-white hover:text-red-500" href="/financesPage">
            Finances
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
