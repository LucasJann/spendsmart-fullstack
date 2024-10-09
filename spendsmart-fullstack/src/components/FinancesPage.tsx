import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import Button from "./Button";

import evening from "../images/evening.jpg";
import NavBar from "./NavBar";
import Categories from "./Categories";

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

  const handleCategoryChange = (selectedCategory: string) => {
    setFormData((prevState) => ({
      ...prevState,
      category: selectedCategory,
    }));
  };

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
      <section className="max-w-sm w-3/4 bg-black bg-opacity-60 rounded-md p-6 text-white">
        <div className="text-center caret-transparent">
          <Button
            id="loginButton"
            type="button"
            className="text-gray-300"
            onClick={handleSelected}
            isSelected={isSelected}
          >
            Expense
          </Button>
          <Button
            id="registerButton"
            type="button"
            className="mb-10 text-gray-300 ml-3"
            onClick={handleSelected}
            isSelected={!isSelected}
          >
            Income
          </Button>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="dateInput" className="ml-1">{`${
            isSelected ? "Expense Date" : "Income Date"
          }`}</label>
          <Input
            id="dateInput"
            name="dateInput"
            type="date"
            value={formData.date}
            onChange={inputChangeHandler}
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
              <label
                htmlFor={isSelected ? "expenseInput" : "incomeInput"}
                className="ml-1 caret-transparent"
              >
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
              <Categories isSelected={isSelected} onCategorySelect={handleCategoryChange} />
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
