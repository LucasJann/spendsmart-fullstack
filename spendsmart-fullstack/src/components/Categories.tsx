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
}

const Categories: React.FC<CategoriesProps> = ({ isSelected }) => {
  const [category, setCategory] = useState<string>("");

  const selectedImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const selectedCategory = e.currentTarget.alt;
    setCategory(selectedCategory);
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
                  category === "Cutlery" || category === "Talheres"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
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
                  category === "Graduation hat" ||
                  category === "Chapéu de formatura"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
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
                  category === "Heart" || category === "Coração"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
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
                  category === "Rocket" || category === "Foguete"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
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
                  category === "House" || category === "Casa"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
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
                  category === "Airplane" || category === "Avião"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
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
                  category === "Rising bar" ||
                  category === "Barra em ascensão"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
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
                  category === "Pigbank" || category === "Cofrinho"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
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
                  category === "Coin" || category === "Moeda"
                    ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                    : "bg-white rounded-sm flex h-16 w-16 mx-auto"
                }`}
              >
                <Image
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
