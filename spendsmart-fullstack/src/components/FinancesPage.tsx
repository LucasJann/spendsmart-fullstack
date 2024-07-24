import { useState } from "react";

import Button from "./Button";
import Input from "./Input";
import Image from "./Image";

import trip from "../Icons/Trip.svg";
import home from "../Icons/Home.svg";
import food from "../Icons/Food.svg";
import extra from "../Icons/Extra.svg";
import salary from "../Icons/Salary.svg";
import health from "../Icons/Health.svg";
import evening from "../images/evening.jpg";
import leisure from "../Icons/Leisure.svg";
import education from "../Icons/Education.svg";
import investments from "../Icons/Investments.svg";

const Finances = () => {
  const [balance, setBalance] = useState<string>("R$0.00");
  const [category, setCategory] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(true);

  const formatter = (value: string) => {
    const newValue = value.replace(/[^0-9]/g, "");
    console.log(newValue);
  };

  const handleSelected = () => {
    setIsSelected(!isSelected);
  };

  const selectedImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const selectedCategory = e.currentTarget.alt;
    setCategory(selectedCategory);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    console.log(value);
    formatter(value);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${evening})` }}
    >
      <form
        className="max-w-sm w-3/4 bg-black bg-opacity-60 shadow-mg rounded-md p-6 text-white"
        // onSubmit={handleSubmit}
      >
        <div className="text-center">
          <Button
            id="loginButton"
            type="button"
            className="bg-transparent border-t-0 border-l-0 border-r-0 mb-10 text-gray-300 "
            onClick={handleSelected}
            isSelected={isSelected}
          >
            Expense
          </Button>
          <Button
            id="registerButton"
            type="button"
            className="bg-transparent border-t-0 border-l-0 border-r-0 mb-10 text-gray-300 ml-3 "
            onClick={handleSelected}
            isSelected={!isSelected}
          >
            Income
          </Button>
        </div>
        <form className="flex flex-col">
          <label className="ml-1">Data</label>
          <Input
            id="dataInput"
            name="dataInput"
            type="date"
            className="mb-1 text-black text-center rounded-md"
          />
          <label className="ml-1">Expense</label>
          <Input
            id="expenseInput"
            name="expenseInput"
            value={balance}
            onChange={inputChangeHandler}
            type="text"
            className="mb-1 text-black text-center rounded-md"
          />
          <label className="ml-1">Categories</label>
          <div className="mt-1 p-2 bg-black bg-opacity-40 rounded-md">
            {isSelected && (
              <ul className="grid grid-cols-3 gap-3 w-full">
                <li className="text-center">
                  <div
                    className={`${
                      category === "Cutlery"
                        ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                        : "bg-white rounded-sm flex p-2 h-16 w-16 mx-auto"
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
                      category === "Mortarboard"
                        ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                        : "bg-white rounded-sm flex p-2 h-16 w-16 mx-auto"
                    }`}
                  >
                    <Image
                      src={education}
                      alt="Mortarboard"
                      className="max-h-full max-w-full"
                      onClick={selectedImage}
                    />
                  </div>
                  <p className="mt-2">Education</p>
                </li>
                <li className="text-center">
                  <div
                    className={`${
                      category === "Heart"
                        ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                        : "bg-white rounded-sm flex p-2 h-16 w-16 mx-auto"
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
                      category === "Rocket"
                        ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                        : "bg-white rounded-sm flex p-2 h-16 w-16 mx-auto"
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
                      category === "House"
                        ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                        : "bg-white rounded-sm flex p-2 h-16 w-16 mx-auto"
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
                      category === "Airplane"
                        ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                        : "bg-white rounded-sm flex p-2 h-16 w-16 mx-auto"
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
              <ul className="grid grid-cols-3 gap-3 w-full">
                <li className="text-center">
                  <div
                    className={`${
                      category === "Rising bar"
                        ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                        : "bg-white rounded-sm flex p-2 h-16 w-16 mx-auto"
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
                      category === "Pigbank"
                        ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                        : "bg-white rounded-sm flex p-2 h-16 w-16 mx-auto"
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
                      category === "Coin"
                        ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
                        : "bg-white rounded-sm flex p-2 h-16 w-16 mx-auto"
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
        </form>
      </form>
    </div>
  );
};

export default Finances;
