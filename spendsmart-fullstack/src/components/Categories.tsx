import { useState } from "react";

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

interface CategoriesProps {
  isSelected: boolean;
  onCategorySelect: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  isSelected,
  onCategorySelect,
}) => {
  const [category, setCategory] = useState<string>("");

  const selectedImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const selectedCategory = e.currentTarget.id;
    setCategory(selectedCategory);
    onCategorySelect(selectedCategory);
  };

  return (
    <div>
      <label className="ml-1 caret-transparent">Categories:</label>
      <div className="mt-1 p-2 bg-black bg-opacity-40 rounded-md caret-transparent cursor-pointer">
        {isSelected && (
          <ul className="grid grid-cols-3 gap-3 w-full">
            <li className="text-center">
              <div
                className={`${
                  category === "1"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
                  id="1"
                  src={food}
                  alt="Cutlery"
                  className="max-h-full max-w-full"
                  onClick={selectedImage}
                />
              </div>
              <p className="mt-2">Food</p>
            </li>
            <li className="text-center">
              <div
                className={`${
                  category === "2"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
                  id="2"
                  src={education}
                  alt="Graduation hat"
                  className="max-h-full max-w-full"
                  onClick={selectedImage}
                />
              </div>
              <p className="mt-2">Education</p>
            </li>
            <li className="text-center">
              <div
                className={`${
                  category === "3"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
                  id="3"
                  src={health}
                  alt="Heart"
                  className="max-h-full max-w-full"
                  onClick={selectedImage}
                />
              </div>
              <p className="mt-2">Health</p>
            </li>
            <li className="text-center">
              <div
                className={`${
                  category === "4"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
                  id="4"
                  src={leisure}
                  alt="Rocket"
                  className="max-h-full max-w-full"
                  onClick={selectedImage}
                />
              </div>
              <p className="mt-2">Leisure</p>
            </li>
            <li className="text-center">
              <div
                className={`${
                  category === "5"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
                  id="5"
                  src={home}
                  alt="House"
                  className="max-h-full max-w-full"
                  onClick={selectedImage}
                />
              </div>
              <p className="mt-2">Home</p>
            </li>
            <li className="text-center">
              <div
                className={`${
                  category === "6"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
                  id="6"
                  src={trip}
                  alt="Airplane"
                  className="max-h-full max-w-full"
                  onClick={selectedImage}
                />
              </div>
              <p className="mt-2">Trip</p>
            </li>
          </ul>
        )}
        {!isSelected && (
          <ul className="grid grid-cols-3 gap-3 w-full mt-11 mb-12 p-2">
            <li className="text-center">
              <div
                className={`${
                  category === "7"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
                  id="7"
                  src={investments}
                  alt="Rising bar"
                  className="max-h-full max-w-full"
                  onClick={selectedImage}
                />
              </div>
              <p className="mt-2">Investments</p>
            </li>
            <li className="text-center">
              <div
                className={`${
                  category === "8"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
                  id="8"
                  src={extra}
                  alt="Pigbank"
                  className="max-h-full max-w-full"
                  onClick={selectedImage}
                />
              </div>
              <p className="mt-2">Extra Income</p>
            </li>
            <li className="text-center">
              <div
                className={`${
                  category === "9"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
                  id="9"
                  src={salary}
                  alt="Coin"
                  className="max-h-full max-w-full"
                  onClick={selectedImage}
                />
              </div>
              <p className="mt-2">Salary</p>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Categories;
