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
import { Fragment } from "react/jsx-runtime";

interface cardProperties {
  _id: string;
  date: string;
  income?: string;
  expense?: string;
  category: string;
}

const Card: React.FC<cardProperties> = ({
  _id,
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
      alt = "Heart";
      break;
    case "Mortarboard":
      ctgry = education;
      alt = "Mortarboard";
      break;
    case "Cutlery":
      ctgry = food;
      alt = "Cutlery";
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
      ctgry = investments;
      alt = "Rising Bar";
  }
  return (
    <div id={_id} className="w-full flex p-2 border rounded-md bg-white ">
      <Image
        src={ctgry}
        alt={alt}
        className="rounded-sm flex h-16 w-20 mr-2 "
      />
      <div className="w-full grid grid-cols-2 p-2 font-serif">
        {income && (
          <Fragment>
            <p className="text-green-600">Date: </p>
            <p className="text-end text-green-600">{date}</p>
            <p className="text-green-600">Income: </p>
            <p className="text-end text-green-600">{income}</p>
          </Fragment>
        )}
        {expense && (
          <Fragment>
            <p className="text-red-600">Date: </p>
            <p className="text-end text-red-600">{date}</p>
            <p className="text-red-600">Expense: </p>
            <p className="text-end text-red-600 truncate">{expense}</p>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Card;
