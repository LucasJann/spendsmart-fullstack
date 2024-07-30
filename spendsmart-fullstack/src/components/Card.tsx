import Image from "./Image";

import trip from "../Icons/Trip.svg";
import home from "../Icons/Home.svg";
import food from "../Icons/Food.svg";
import extra from "../Icons/Extra.svg";
import salary from "../Icons/Salary.svg";
import health from "../Icons/Health.svg";
import leisure from "../Icons/Leisure.svg";
import education from "../Icons/Education.svg";
import investments from "../Icons/Investments.svg";

interface cardProperties {
  key: number;
  date: string;
  income?: string;
  expense?: string;
  category: string;
}

const Card: React.FC<cardProperties> = ({
  key,
  date,
  income,
  expense,
  category,
}) => {
  let alt = "";
  let ctgry = category;
  switch (ctgry) {
    case "Airplane":
      ctgry = trip;
      alt = "Airplane";
      break;
    case "House":
      ctgry = home;
      alt = "House";
      break;
    case "Rocket":
      ctgry = leisure;
      alt = "Rocket";
      break;
    case "Heart":
      ctgry = health;
      alt = "heHeartart";
      break;
    case "Mortarboard":
      ctgry = education;
      alt = "Mortarboard";
      break;
    case "Cutlery":
      ctgry = food;
      alt = "Cutlery";
      break;
    case "Rising Bar":
      ctgry = investments;
      alt = "Rising Bar";
      break;
    case "Pigbank":
      ctgry = extra;
      alt = "Pigbank";
      break;
    case "Coin":
      ctgry = salary;
      alt = "Coin";
      break;
    default:
      "";
  }

  return (
    <div
      key={key}
      className="p-2 border-b border-gray-500 bg-white text-black rounded-md"
    >
      <p>Date: {date}</p>
      {income && <p>Income: {income}</p>}
      {expense && <p>Expense: {expense}</p>}
      <Image
        src={ctgry}
        alt={alt}
        className="bg-white rounded-sm flex h-16 w-16 mx-auto"
      />
    </div>
  );
};

export default Card;
