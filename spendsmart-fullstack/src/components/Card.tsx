import Image from "./Image";
import { Fragment } from "react/jsx-runtime";

interface cardProperties {
  _id: string;
  alt: string;
  date: string;
  income?: string;
  expense?: string;
  iconPath: string;
}

const Card: React.FC<cardProperties> = ({
  _id,
  alt,
  date,
  income,
  expense,
  iconPath,
}) => {
  return (
    <div id={_id} className="w-full flex p-2 border rounded-md bg-white ">
      <Image
        alt={alt}
        src={iconPath}
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
