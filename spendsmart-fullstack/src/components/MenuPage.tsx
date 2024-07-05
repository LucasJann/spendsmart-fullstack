import { useNavigate } from "react-router-dom";
import morningSun from "../images/morning.jpg";
import Button from "./Button";

const Menu = () => {
  const navigate = useNavigate();

  const buttonOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const buttonId = event.currentTarget.id;

    switch (buttonId) {
      case "profile":
        navigate("/profilePage");
        break;
      case "finances":
        navigate("");
        break;
      case "goals":
        navigate("");
        break;
      default:
        navigate("");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${morningSun})` }}
    >
      <div className="max-w-md w-full bg-black bg-opacity-60 shadow-mg rounded-md p-6">
        <Button
          id="profile"
          type="button"
          className="bg-orange-500 mt-5 ml-10 p-4 w-4/5 mx-auto text-white"
          onClick={buttonOptions}
        >
          Profile
        </Button>
        <Button
          id="finances"
          type="button"
          className="bg-orange-500 mt-5 ml-10 p-4 w-4/5 mx-auto text-white"
          onClick={buttonOptions}
        >
          My Finances
        </Button>
        <Button
          id="goals"
          type="button"
          className="bg-orange-500 mt-5 ml-10 p-4 w-4/5 mx-auto text-white"
          onClick={buttonOptions}
        >
          Next Goals
        </Button>
      </div>
    </div>
  );
};

export default Menu;
