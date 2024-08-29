import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import Image from "./Image";
import Button from "./Button";

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
import NavBar from "./NavBar";

const Finances = () => {
  interface financesProps {
    id: string;
    date: string;
    income: string;
    expense: string;
    category: string;
  }
  const formDataProperties = {
    id: "",
    date: "",
    income: "",
    expense: "",
    category: "",
  };

  const [formData, setFormData] = useState<financesProps>(formDataProperties);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const [background, setBackground] = useState(false);
  const [confirmButton, setConfirmButton] = useState<boolean>(false);

  const navigation = useNavigate();

  useEffect(() => {
    if (formData.date !== "") {
      setShowForm(true);
    }
  }, [formData.date]);

  useEffect(() => {
    const date = formData.date;
    const category = formData.category;

    if (date !== "" && category !== "") {
      setConfirmButton(true);
    }
  }, [formData.date, formData.category, formData.expense, formData.income]);

  const formatNumber = (value: number) => {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    return formatter.format(value / 100);
  };

  const handleSelected = () => {
    setConfirmButton(false);
    setIsSelected(!isSelected);
  };

  const selectedImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const selectedCategory = e.currentTarget.alt;
    setFormData((prevState) => ({
      ...prevState,
      category: selectedCategory,
    }));
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "dateInput") {
      const dateValue = e.currentTarget.value;
      if (dateValue === "") {
        setConfirmButton(false);
      }
      setFormData((prevState) => ({
        ...prevState,
        date: dateValue,
      }));
    } else if (e.currentTarget.name === "expenseInput") {
      const value = e.currentTarget.value;

      if (value.length > 13) {
        return;
      }
      const parsedValue = value.replace(/[^0-9]/g, "");
      const number = Number(parsedValue);
      const formattedExpense = formatNumber(number);
      setFormData((prevState) => ({
        ...prevState,
        expense: formattedExpense,
      }));
    } else {
      const value = e.currentTarget.value;

      if (value.length > 13) {
        return;
      }
      const parsedValue = value.replace(/[^0-9]/g, "");
      const number = Number(parsedValue);
      const formattedIncome = formatNumber(number);
      setFormData((prevState) => ({
        ...prevState,
        income: formattedIncome,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = localStorage.getItem("user")?.replace(/"/g, "");
    let item = {};
    if (isSelected) {
      item = {
        date: formData.date,
        expense: formData.expense === "" ? "R$0,00" : formData.expense,
        category: formData.category,
      };
    } else {
      item = {
        date: formData.date,
        income: formData.income === "" ? "R$0,00" : formData.income,
        category: formData.category,
      };
    }
    try {
      await fetch(`http://localhost:8080/finances/${user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
    } catch (err) {
      console.error(err);
    }
    setBackground(true);
    setTimeout(() => {
      setBackground(false);
    }, 1000);
    setShowForm(false);
    setFormData((prevState) => ({
      ...prevState,
      date: "",
    }));
    setConfirmButton(false);

    if (isSelected) {
      const expense = { expense: formData.expense.replace(/[^0-9]/g, "") };
      setFormData((prevState) => ({
        ...prevState,
        income: "",
        expense: "",
        category: "",
      }));
      try {
        const user = localStorage.getItem("user")?.replace(/"/g, "");
        await fetch(`http://localhost:8080/balance/addExpense/${user}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expense),
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      const income = { income: formData.income.replace(/[^0-9]/g, "") };
      setFormData((prevState) => ({
        ...prevState,
        income: "",
        expense: "",
        category: "",
      }));
      try {
        const user = localStorage.getItem("user")?.replace(/"/g, "");
        await fetch(`http://localhost:8080/balance/addIncome/${user}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(income),
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${evening})` }}
    >
      <NavBar />
      <section className="max-w-sm w-3/4 bg-black bg-opacity-60 shadow-mg rounded-md p-6 text-white ">
        <div className="text-center caret-transparent">
          <Button
            id="loginButton"
            type="button"
            className="bg-transparent border-t-0 border-l-0 border-r-0 mb-10 text-gray-300"
            onClick={handleSelected}
            isSelected={isSelected}
          >
            Expense
          </Button>
          <Button
            id="registerButton"
            type="button"
            className="bg-transparent border-t-0 border-l-0 border-r-0 mb-10 text-gray-300 ml-3 caret-transparent"
            onClick={handleSelected}
            isSelected={!isSelected}
          >
            Income
          </Button>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="ml-1 caret-transparent">{`${
            isSelected ? "Expense Date" : "Income Date"
          }`}</label>
          <Input
            id="dateInput"
            name="dateInput"
            type="date"
            value={formData.date}
            onChange={inputChangeHandler}
            className="mb-1 text-black text-center rounded-md caret-transparent"
          />
          {!showForm && (
            <Fragment>
              <p className="text-gray-400 text-center caret-transparent">
                -----Select a date to start-----
              </p>
              <Button
                id="confirmItemButton"
                type="submit"
                className={`mt-2 p-3 ${
                  background ? `bg-green-500` : "bg-red-500"
                } rounded-md caret-transparent transition duration-1000 ease-in-out`}
                onClick={() => {
                  navigation("/historyPage");
                }}
              >
                {background ? "Finance Registered" : "History"}
              </Button>
            </Fragment>
          )}
          {showForm && (
            <Fragment>
              <label className="ml-1 caret-transparent">
                {isSelected ? "Expense Value:" : "Income Value:"}
              </label>
              <Input
                id={isSelected ? "expenseInput" : "incomeInput"}
                name={isSelected ? "expenseInput" : "incomeInput"}
                value={isSelected ? formData.expense : formData.income}
                onChange={inputChangeHandler}
                type="text"
                className="mb-1 text-black text-center rounded-md"
              />
              <label className="ml-1 caret-transparent">Categories:</label>
              <div className="mt-1 p-2 bg-black bg-opacity-40 rounded-md caret-transparent">
                {isSelected && (
                  <ul className="grid grid-cols-3 gap-3 w-full">
                    <li className="text-center">
                      <div
                        className={`${
                          formData.category === "Cutlery" ||
                          formData.category === "Talheres"
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
                          formData.category === "Graduation hat" ||
                          formData.category === "Chapéu de formatura"
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
                          formData.category === "Heart" ||
                          formData.category === "Coração"
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
                          formData.category === "Rocket" ||
                          formData.category === "Foguete"
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
                          formData.category === "House" ||
                          formData.category === "Casa"
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
                          formData.category === "Airplane" ||
                          formData.category === "Avião"
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
                          formData.category === "Rising bar" ||
                          formData.category === "Barra em ascensão"
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
                          formData.category === "Pigbank" ||
                          formData.category === "Cofrinho"
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
                          formData.category === "Coin" ||
                          formData.category === "Moeda"
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
              {confirmButton && (
                <Button
                  id="confirmItemButton"
                  type="submit"
                  className="mt-2 p-3 bg-red-500 rounded-md caret-transparent"
                >
                  Confirm
                </Button>
              )}
              {!confirmButton && (
                <Button
                  id="confirmItemButton"
                  type="button"
                  className="mt-2 p-3 bg-red-500 rounded-md caret-transparent"
                  onClick={() => {
                    navigation("/historyPage");
                  }}
                >
                  History
                </Button>
              )}
            </Fragment>
          )}
        </form>
      </section>
    </div>
  );
};

export default Finances;
