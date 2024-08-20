import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="w-full h-start bg-black opacity-60 fixed top-0 p-2 text-white">
      <div className="space-x-10 font-serif">
        <a
          className={`text-white ${
            location.pathname === "/profilePage"
              ? "text-yellow-500"
              : "hover:text-yellow-500"
          } hover:transition duration-1000 ease-in-out`}
          href="/profilePage"
        >
          Profile
        </a>
        <a
          className={`text-white ${
            location.pathname === "/financesPage"
              ? "text-yellow-500"
              : "hover:text-yellow-500"
          } hover:transition duration-1000 ease-in-out`}
          href="/financesPage"
        >
          Finances
        </a>
        <a
          className={`text-white ${
            location.pathname === "/goalsPage"
              ? "text-yellow-500"
              : "hover:text-yellow-500"
          } hover:transition duration-1000 ease-in-out`}
          href="/goalsPage"
        >
          Goals
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
