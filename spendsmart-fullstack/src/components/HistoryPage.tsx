import { useState, useEffect } from "react";

import night from "../images/night.jpg";

import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import NavBar from "./NavBar";

const HistoryPage = () => {
  interface dateInterface {
    initialDate: string;
    finalDate: string;
  }

  interface itemsInterface {
    _id: string;
    date: string;
    income?: string;
    expense?: string;
    category: string;
  }

  const dateObject = {
    initialDate: "",
    finalDate: "",
  };

  const [items, setItems] = useState<itemsInterface[]>([]);
  const [prevItems, setPrevItems] = useState<itemsInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState<dateInterface>(dateObject);

  const [filterClicked, setFilterClicked] = useState<boolean | null>(null);
  const [incomesAndExpenses, setIncomesAndExpenses] = useState<boolean>(false);

  const [incomeBackground, setIncomeBackground] =
    useState<string>("bg-green-600");
  const [expenseBackground, setExpenseBackground] =
    useState<string>("bg-red-600");
  const [incomesAndExpensesBackground, setIncomesAndExpensesBackground] =
    useState<string>("bg-blue-600");

  const [backgroundToggle, setBackgroundToggle] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user")?.replace(/"/g, "");
    const getFinances = async () => {
      try {
        const response = await fetch(`http://localhost:8080/finances/${user}`);
        if (!response.ok) {
          console.error("Failed to fetch");
        }
        const responseData = await response.json();

        const parseDate = (dateString: string) => {
          const [year, month, day] = dateString.split("-");
          return new Date(Number(year), Number(month) - 1, Number(day));
        };

        responseData.items.sort(
          (a: itemsInterface, b: itemsInterface) =>
            parseDate(b.date).getTime() - parseDate(a.date).getTime()
        );

        setPrevItems(responseData.items);
        setItems(responseData.items);
      } catch (err) {
        console.error(err);
      }
    };
    getFinances();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIncomeBackground("bg-green-600");
      setExpenseBackground("bg-red-600");
      setIncomesAndExpensesBackground("bg-blue-600");
    }, 1000);
  }, [backgroundToggle]);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const getDivStyle = (items: number) => {
    console.log(items);
    switch (items) {
      case 1:
        return "grid grid-cols-1";
      case 2:
        return "grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2";
      case 3:
        return "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3";
      default:
        return "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  const getWidth = (items: number) => {
    switch (items) {
      case 0:
        return "w-1/3";
      case 1:
        return "w-11/12 md:w-5/12";
      case 2:
        return "w-11/12 sm:w-full md:w-7/12";
      case 3:
        return "w-11/12 sm:w-full md:w-11/12";
      default:
        return "w-full";
    }
  };

  const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;

    if (id === "startDate") {
      setSelectedDate((prevState) => ({
        ...prevState,
        initialDate: formatDate(value),
      }));
    } else {
      setSelectedDate((prevState) => ({
        ...prevState,
        finalDate: formatDate(value),
      }));
    }
  };

  const filterAll = () => {
    setIncomesAndExpenses(true);
  };

  const allFinances = () => {
    setItems(prevItems);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (incomesAndExpenses) {
      if (filterClicked === null) {
        if (items.length !== 0) {
          const newItems = prevItems.filter((e) => {
            const date = e.date;
            const initialDate = formatDate(selectedDate.initialDate);
            const finalDate = formatDate(selectedDate.finalDate);

            if (date >= initialDate && date <= finalDate) {
              return true;
            } else {
              return false;
            }
          });
          setItems(newItems);
          setIncomesAndExpenses(false);
          setIncomeBackground("bg-green-600");
          setExpenseBackground("bg-red-600");
          setIncomesAndExpensesBackground("bg-gray-600");
          setBackgroundToggle(!backgroundToggle);

          return;
        } else {
          const newItems = prevItems.filter((e) => {
            const date = e.date;
            const initialDate = formatDate(selectedDate.initialDate);
            const finalDate = formatDate(selectedDate.finalDate);

            if (date >= initialDate && date <= finalDate) {
              return true;
            } else {
              return false;
            }
          });
          setItems(newItems);
          setIncomesAndExpenses(false);
          setIncomeBackground("bg-green-600");
          setExpenseBackground("bg-red-600");
          setIncomesAndExpensesBackground("bg-gray-600");
          setBackgroundToggle(!backgroundToggle);

          return;
        }
      } else {
        const newItems = prevItems.filter((e) => {
          const date = e.date;
          const initialDate = formatDate(selectedDate.initialDate);
          const finalDate = formatDate(selectedDate.finalDate);

          if (date >= initialDate && date <= finalDate) {
            return true;
          } else {
            return false;
          }
        });
        setItems(newItems);
        setIncomeBackground("bg-green-600");
        setExpenseBackground("bg-red-600");
        setIncomesAndExpensesBackground("bg-gray-600");
        setBackgroundToggle(!backgroundToggle);
      }
      setIncomesAndExpenses(false);
      return;
    } else {
      if (filterClicked) {
        const incomeItems = prevItems.filter((e) => {
          return e.income ? true : false;
        });
        const filteredItems = incomeItems.filter((e) => {
          const date = e.date;
          const initialDate = formatDate(selectedDate.initialDate);
          const finalDate = formatDate(selectedDate.finalDate);

          if (date >= initialDate && date <= finalDate) {
            return true;
          } else {
            return false;
          }
        });
        setItems(filteredItems);
        setIncomeBackground("bg-gray-600");
        setExpenseBackground("bg-red-600");
        setIncomesAndExpensesBackground("bg-blue-600");
        setBackgroundToggle(!backgroundToggle);
      } else {
        const expenseItems = prevItems.filter((e) => {
          return e.expense ? true : false;
        });
        const filteredItems = expenseItems.filter((e) => {
          const date = e.date;
          const initialDate = formatDate(selectedDate.initialDate);
          const finalDate = formatDate(selectedDate.finalDate);

          if (date >= initialDate && date <= finalDate) {
            return true;
          } else {
            return false;
          }
        });
        setItems(filteredItems);
        setIncomeBackground("bg-green-600");
        setExpenseBackground("bg-gray-600");
        setIncomesAndExpensesBackground("bg-blue-600");
        setBackgroundToggle(!backgroundToggle);
      }
    }
  };

  const filter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    if (id === "incomeButton") {
      setFilterClicked(true);
    } else {
      setFilterClicked(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat caret-transparent"
      style={{ backgroundImage: `url(${night})` }}
    >
      <NavBar />
      <section
        className={`max-w-md w-full bg-black bg-opacity-60 rounded-md text-white p-1 mt-12`}
      >
        <form className="flex flex-col items-center " onSubmit={submitHandler}>
          <div className="flex w-full justify-between ">
            <Button
              id="incomeButton"
              type="submit"
              className={`w-1/2 p-1 m-1 rounded-md transition duration-700 ease-in-out ${incomeBackground}`}
              onClick={filter}
            >
              Search Incomes by Date
            </Button>
            <Button
              id="expenseButton"
              type="submit"
              className={`w-1/2 p-1 m-1 rounded-md transition duration-700 ease-in-out ${expenseBackground}`}
              onClick={filter}
            >
              Search Expenses by Date
            </Button>
          </div>
          <label className="">Initial Date</label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            onChange={dateChangeHandler}
            className="w-3/4 mb-1 text-black text-center rounded-md"
          />
          <label className="">Final Date</label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            onChange={dateChangeHandler}
            className="w-3/4 mb-1 text-black text-center rounded-md"
          />
          <Button
            id="searchButton"
            type="submit"
            onClick={filterAll}
            className={`w-full p-3 mt-2 rounded-md rounded transition duration-700 ease-in-out ${incomesAndExpensesBackground}`}
          >
            Search Incomes and Expenses by Date
          </Button>
        </form>
      </section>
      {items.length === 0 && (
        <Button
          id="allFinances"
          type="button"
          className={`rounded-md bg-black border-solid border-2 border-stone-400 text-white w-3/12 mt-2`}
          onClick={allFinances}
        >
          See all finances
        </Button>
      )}
      {items.length !== 0 && (
        <section
          className={`${getWidth(
            items.length
          )} mt-2 max-h-100 p-1 lg:p-2 bg-black bg-opacity-40 rounded-md overflow-y-auto scrollbar-custom`}
        >
          <div className="flex justify-center">
            <Button
              id="allFinances"
              type="button"
              className={`rounded-md bg-black border-solid border-2 border-stone-400 text-white w-6/12`}
              onClick={allFinances}
            >
              See all finances
            </Button>
          </div>

          <div className={`${getDivStyle(items.length)} gap-3 mt-2`}>
            {items.map((item) => (
              <Card
                key={item._id}
                _id={item._id}
                date={formatDate(item.date)}
                income={item.income}
                expense={item.expense}
                category={item.category}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HistoryPage;
