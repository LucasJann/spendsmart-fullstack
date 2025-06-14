import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import Image from "./Image";
import profilePic from "../images/profilepic.jpg";

let profile = profilePic;

interface NavBarProperties {
  image?: boolean;
}

const NavBar: React.FC<NavBarProperties> = ({ image }) => {
  const token = localStorage.getItem("token")?.replace(/"/g, "");
  const location = useLocation();
  
  const [defaultImage, setDefaultImage] = useState<string>(profile);

  useEffect(() => {
    const profilePic = async () => {
      try {
        const response = await fetch(`http://localhost:8080/profile/${token}`);

        if (!response.ok) {
          console.error(":::Internal Server Error:::");
        }
        const responseData = await response.json();

        if (!responseData.image) {
          return;
        }
        const image = responseData.image.split("\\images\\")[1];
        setDefaultImage(`../../backend/src/images/${image}`);
        profile = defaultImage;
      } catch (err) {
        console.error(err);
      }
    };
    profilePic();
  }, [image]);

  return (
    <nav
      className="w-full fixed top-0 p-1 text-white"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      {location.pathname !== "/historyPage" && (
        <div className="flex space-x-10 font-serif ">
          <Link
            className={` mt-0.5 ml-2 ${
              location.pathname === "/profilePage"
                ? "text-yellow-500"
                : "hover:text-yellow-500"
            } hover:transition duration-1000 ease-in-out `}
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
              src={defaultImage}
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
