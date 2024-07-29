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
        navigate("/financesPage");
        break;
      case "goals":
        navigate("/goalsPage");
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
          className="w-full mt-4 p-4 bg-orange-500 text-white rounded-md"
          onClick={buttonOptions}
        >
          Profile
        </Button>
        <Button
          id="finances"
          type="button"
          className="w-full mt-4 p-4 bg-orange-500 text-white rounded-md"
          onClick={buttonOptions}
        >
          My Finances
        </Button>
        <Button
          id="goals"
          type="button"
          className="w-full mt-4 p-4 bg-orange-500 text-white rounded-md"
          onClick={buttonOptions}
        >
          Next Goals
        </Button>
      </div>
    </div>
  );
};

export default Menu;
