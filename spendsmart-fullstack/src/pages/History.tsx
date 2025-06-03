import { useState, useEffect } from "react";

import Card from "../components/Card";
import Input from "../components/Input";
import NavBar from "../components/NavBar";
import Button from "../components/Button";

import night from "../images/night.jpg";

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

const getDivStyle = (items: number) => {
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

const HistoryPage = () => {
  interface itemInterface {
    _id: string;
    alt: string;
    date: string;
    income?: string;
    expense?: string;
    category: string;
    iconPath: string;
  }

  interface dateInterface {
    finalDate: string;
    initialDate: string;
  }

  interface backgroundInterface {
    income: string;
    expense: string;
    incomeAndExpense: string;
  }

  const itemsObject = [
    {
      _id: "",
      alt: "",
      date: "",
      income: "",
      expense: "",
      category: "",
      iconPath: "",
    },
  ];

  const dateObject = {
    finalDate: "",
    initialDate: "",
  };

  const backgroundObject = {
    income: "bg-green-600",
    expense: "bg-red-600",
    incomeAndExpense: "bg-blue-600",
  };

  const [background, setBackground] =
    useState<backgroundInterface>(backgroundObject);

  const [items, setItems] = useState<itemInterface[]>(itemsObject);
  const [prevItems, setPrevItems] = useState<itemInterface[]>(itemsObject);
  const [selectedDate, setSelectedDate] = useState<dateInterface>(dateObject);
  const [filterClicked, setFilterClicked] = useState<boolean | null>(null);
  const [incomesAndExpenses, setIncomesAndExpenses] = useState<boolean>(false);

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
          (a: itemInterface, b: itemInterface) =>
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

  const onFilterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    id === "incomeButton" ? setFilterClicked(true) : setFilterClicked(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;

    id === "startDate"
      ? setSelectedDate((prevState) => ({
          ...prevState,
          initialDate: formatDate(value),
        }))
      : setSelectedDate((prevState) => ({
          ...prevState,
          finalDate: formatDate(value),
        }));
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalDate = formatDate(selectedDate.finalDate);
    const initialDate = formatDate(selectedDate.initialDate);

    if (incomesAndExpenses) {
      const incomesAndExpensesItems = prevItems.filter((e) => {
        if (e.date >= initialDate && e.date <= finalDate) {
          return true;
        } else {
          return false;
        }
      });

      setBackground((prevState) => ({
        ...prevState,
        income: "bg-green-600",
        expense: "bg-red-600",
        incomeAndExpense: "bg-gray-600",
      }));

      setTimeout(() => {
        setBackground(backgroundObject);
      }, 1000);

      setIncomesAndExpenses(false);
      return setItems(incomesAndExpensesItems);
    }

    let incomeItems = [{}];
    let expenseItems = [{}];

    const filteredItems = filterClicked
      ? (incomeItems = prevItems.filter((e) => {
          return e.income ? true : false;
        }))
      : (expenseItems = prevItems.filter((e) => {
          return e.expense ? true : false;
        }));

    switch (filterClicked) {
      case true:
        setBackground(() => ({
          income: "bg-gray-600",
          expense: "bg-red-600",
          incomeAndExpense: "bg-blue-600",
        }));
        setTimeout(() => {
          setBackground(backgroundObject);
        }, 1000);
        break;
      case false:
        setBackground(() => ({
          income: "bg-green-600",
          expense: "bg-gray-600",
          incomeAndExpense: "bg-blue-600",
        }));
        setTimeout(() => {
          setBackground(backgroundObject);
        }, 1000);
        break;
    }

    const filteredItemsByDate = filteredItems.filter((e) => {
      if (e.date >= initialDate && e.date <= finalDate) {
        return true;
      } else {
        return false;
      }
    });
    setItems(filteredItemsByDate);
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
        <form
          className="flex flex-col items-center "
          onSubmit={onSubmitHandler}
        >
          <div className="flex w-full justify-between ">
            <Button
              id="incomeButton"
              type="submit"
              onClick={onFilterHandler}
              className={`w-1/2 p-1 m-1 rounded-md transition duration-700 ease-in-out ${background.income}`}
            >
              Search Incomes by Date
            </Button>
            <Button
              id="expenseButton"
              type="submit"
              onClick={onFilterHandler}
              className={`w-1/2 p-1 m-1 rounded-md transition duration-700 ease-in-out ${background.expense}`}
            >
              Search Expenses by Date
            </Button>
          </div>
          <label className="">Initial Date</label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            onChange={handleDateChange}
            className="w-3/4 mb-1 text-black text-center rounded-md"
          />
          <label className="">Final Date</label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            onChange={handleDateChange}
            className="w-3/4 text-black text-center rounded-md"
          />
          <Button
            id="searchButton"
            type="submit"
            onClick={() => {
              setIncomesAndExpenses(true);
            }}
            className={`w-full p-3 mt-2 rounded-md transition duration-700 ease-in-out ${background.incomeAndExpense}`}
          >
            Search Incomes and Expenses by Date
          </Button>
          <Button
            id="allFinances"
            type="button"
            className={`w-full mt-2 text-white rounded-md bg-black border-solid border-2 border-stone-400  `}
            onClick={() => {
              setItems(prevItems);
              setBackground((prevState) => ({
                ...prevState,
                income: "bg-green-600",
                expense: "bg-red-600",
                incomeAndExpense: "bg-blue-600",
              }));
            }}
          >
            See all finances
          </Button>
        </form>
      </section>
      {items.length !== 0 && (
        <section
          className={`${getWidth(
            items.length
          )} mt-2 p-1 lg:p-2 bg-black bg-opacity-40 rounded-md overflow-y-auto scrollbar-custom`}
        >
          <div className={`${getDivStyle(items.length)} gap-3 mt-2`}>
            {items.map((item) => (
              <Card
                _id={item._id}
                key={item._id}
                alt={item.alt}
                date={formatDate(item.date)}
                income={item.income}
                expense={item.expense}
                iconPath={item.iconPath}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HistoryPage;
