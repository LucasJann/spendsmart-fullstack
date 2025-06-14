import { useNavigate } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";

import Input from "../components/Input";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import Categories from "../components/Categories";

import evening from "../images/evening.jpg";

const formattNumber = (value: number) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format(value / 100);
};

const Finances = () => {
  interface FinancesProps {
    id: string;
    alt: string;
    date: string;
    income: string;
    expense: string;
    category: string;
    iconPath: string;
  }
  const formDataProperties = {
    id: "",
    alt: "",
    date: "",
    income: "",
    expense: "",
    category: "",
    iconPath: "",
  };

  const [formData, setFormData] = useState<FinancesProps>(formDataProperties);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [background, setBackground] = useState(false);
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const [confirmButton, setConfirmButton] = useState<boolean>(false);

  const navigation = useNavigate();
  const date = formData.date;
  const income = formData.income;
  const expense = formData.expense;
  const category = formData.category;

  useEffect(() => {
    if (date !== "") {
      setShowForm(true);
    }
  }, [date]);

  useEffect(() => {
    if (date === "" && category === "") {
      return;
    }
    if (income || expense) {
      setConfirmButton(true);
    }
  }, [date, category, expense, income]);

  useEffect(() => {
    const updateProfileBalance = async () => {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      const value = isSelected
        ? { expenseValue: expense.replace(/[^0-9]/g, "") }
        : { incomeValue: income.replace(/[^0-9]/g, "") };
      try {
        await fetch(`http://localhost:8080/balance/calcNewBalance/${token}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });
      } catch (err) {
        console.error(err);
      }
      setFormData(formDataProperties);
    };

    updateProfileBalance();
  }, [background]);

  const onSelectHandler = () => {
    setFormData((prevState) => ({
      ...prevState,
      income: "",
      expense: "",
    }));
    setConfirmButton(false);
    setIsSelected(!isSelected);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;

    const value = e.currentTarget.value;
    const parsedValue = value.replace(/[^0-9]/g, "");
    const number = Number(parsedValue);
    const formattedNumber = formattNumber(number);

    if (value.length > 13) {
      return;
    }

    if (value === "") {
      setConfirmButton(false);
    }

    switch (name) {
      case "dateInput":
        setFormData((prevState) => ({
          ...prevState,
          date: value,
        }));
        break;
      case "expenseInput":
        setFormData((prevState) => ({
          ...prevState,
          expense: formattedNumber,
        }));
        break;
      default:
        setFormData((prevState) => ({
          ...prevState,
          income: formattedNumber,
        }));
    }
  };

  const handleCategoryChange = (
    selectedCategory: string,
    selectedIconPath: string,
    alt: string,
  ) => {
    console.log(selectedIconPath)
    setFormData((prevState) => ({
      ...prevState,
      alt: alt,
      category: selectedCategory,
      iconPath: selectedIconPath.split("5173")[1],
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token")?.replace(/"/g, "");

    let item = {
      alt: formData.alt,
      date: date,
      [`${isSelected ? "expense" : "income"}`]: isSelected ? expense : income,
      category: category,
      iconPath: formData.iconPath,
    };

    try {
      await fetch(`http://localhost:8080/finances/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setBackground(false);
    }, 5000);

    setShowForm(false);
    setBackground(true);
    setConfirmButton(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${evening})` }}
    >
      <NavBar />
      <section className="max-w-sm w-3/4 bg-black bg-opacity-60 rounded-md p-6 text-white">
        <div className="text-center caret-transparent">
          <Button
            id="loginButton"
            type="button"
            onClick={onSelectHandler}
            className="text-gray-300"
            isSelected={isSelected}
          >
            Expense
          </Button>
          <Button
            id="registerButton"
            type="button"
            onClick={onSelectHandler}
            className="mb-10 text-gray-300 ml-3"
            isSelected={!isSelected}
          >
            Income
          </Button>
        </div>
        <form className="flex flex-col" onSubmit={onSubmitHandler}>
          <label htmlFor="dateInput" className="ml-1">{`${
            isSelected ? "Expense Date" : "Income Date"
          }`}</label>
          <Input
            id="dateInput"
            name="dateInput"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            className="mb-1 text-black text-center rounded-md"
          />
          {!showForm && (
            <Fragment>
              <p className="text-gray-400 text-center">
                -----Select a date to start-----
              </p>
              <Button
                id="confirmItemButton"
                type="submit"
                onClick={() => {
                  navigation("/historyPage");
                }}
                className={`mt-2 p-3 ${
                  background ? `bg-green-500` : "bg-red-500"
                } rounded-md transition duration-1000 ease-in-out`}
              >
                {background ? "Finance Registered" : "History"}
              </Button>
            </Fragment>
          )}
          {showForm && (
            <Fragment>
              <label
                htmlFor={isSelected ? "expenseInput" : "incomeInput"}
                className="ml-1"
              >
                {isSelected ? "Expense Value:" : "Income Value:"}
              </label>
              <Input
                id={isSelected ? "expenseInput" : "incomeInput"}
                name={isSelected ? "expenseInput" : "incomeInput"}
                value={isSelected ? formData.expense : formData.income}
                type="text"
                onChange={handleInputChange}
                className="mb-1 text-black text-center rounded-md"
              />
              <Categories
                isSelected={isSelected}
                onCategorySelected={handleCategoryChange}
              />
              {confirmButton && (
                <Button
                  id="confirmItemButton"
                  type="submit"
                  className="mt-2 p-3 bg-red-500 rounded-md"
                >
                  Confirm
                </Button>
              )}
              {!confirmButton && (
                <Button
                  id="confirmItemButton"
                  type="button"
                  onClick={() => {
                    navigation("/historyPage");
                  }}
                  className="mt-2 p-3 bg-red-500 rounded-md"
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
