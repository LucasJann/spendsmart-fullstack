import { useState, useEffect } from "react";

import night from "../images/night.jpg";

import Card from "./Card";
import Input from "./Input";
import Button from "./Button";

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

  interface filteredItemsInterface {
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
  const [itemsLength, setItemsLength] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<dateInterface>(dateObject);

  const [filterClicked, setFilterClicked] = useState<boolean | null>(null);
  const [financesFiltered, setFinancesFiltered] = useState<boolean>(false);
  const [filteredItemsLength, setfilteredItemsLength] = useState<number>(0);
  const [filteredItems, setFilteredItems] = useState<filteredItemsInterface[]>(
    []
  );
  const [incomeBackground, setIncomeBackground] =
    useState<string>("bg-green-600");
  const [expenseBackground, setExpenseBackground] =
    useState<string>("bg-red-600");

  const [backgroundTransition, setBackgroundTransition] = useState<string>("");
  const [searchMessage, setSearchMessage] = useState<string>("Search By Date");

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

        setItems(responseData.items);
        setItemsLength(responseData.items.length);
      } catch (err) {
        console.error(err);
      }
    };
    getFinances();
  }, []);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const getDivStyle = (itemsLength: number) => {
    switch (itemsLength) {
      case 1:
        return "grid grid-cols-1";
      case 2:
        return "grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2";
      case 3:
        return "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3";
      case 4:
        return "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filterClicked !== null) {
      if (filterClicked) {
        const incomeItems = items.filter((e) => {
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
        setFinancesFiltered(true);
        setFilteredItems(filteredItems);
        setfilteredItemsLength(filteredItems.length);
      } else {
        const expenseItems = items.filter((e) => {
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
        setFinancesFiltered(true);
        setFilteredItems(filteredItems);
        setfilteredItemsLength(filteredItems.length);
      }
    } else {
      const filteredItems = items.filter((e) => {
        const date = e.date;
        const initialDate = formatDate(selectedDate.initialDate);
        const finalDate = formatDate(selectedDate.finalDate);

        if (date >= initialDate && date <= finalDate) {
          return true;
        } else {
          return false;
        }
      });
      setFinancesFiltered(true);
      setFilteredItems(filteredItems);
      setfilteredItemsLength(filteredItems.length);
    }
  };

  const filter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    if (id === "incomeButton") {
      setSearchMessage("Search Incomes By Date");
      setFilterClicked(true);
      setIncomeBackground("bg-gray-500");
      setExpenseBackground("bg-red-600");
      setBackgroundTransition("bg-green-600");
    } else {
      setSearchMessage("Search Expenses By Date");
      setFilterClicked(false);
      setIncomeBackground("bg-green-600");
      setExpenseBackground("bg-gray-500");
      setBackgroundTransition("bg-red-600");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat caret-transparent"
      style={{ backgroundImage: `url(${night})` }}
    >
      <section
        className={`max-w-md w-full bg-black bg-opacity-60 rounded-md text-white p-1 mt-2`}
      >
        <form className="flex flex-col items-center" onSubmit={submitHandler}>
          <div className="flex w-full justify-between ">
            <Button
              id="incomeButton"
              type="button"
              className={`w-1/2  ${incomeBackground} p-1 m-1 rounded-md transition duration-700 ease-in-out`}
              onClick={filter}
            >
              Incomes
            </Button>
            <Button
              id="expenseButton"
              type="button"
              className={`w-1/2  ${expenseBackground} p-1 m-1 rounded-md transition duration-700 ease-in-out`}
              onClick={filter}
            >
              Expenses
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
            className={`w-full bg-blue-600 p-3 mt-2 rounded-md rounded transition duration-700 ease-in-out ${backgroundTransition}`}
          >
            {searchMessage}
          </Button>
        </form>
      </section>

      {!financesFiltered && items.length !== 0 && (
        <section
          className={`max-h-100 mt-2 p-3 bg-black bg-opacity-40 rounded-md overflow-y-auto scrollbar-custom`}
        >
          <div
            className={`${getDivStyle(
              filteredItemsLength || itemsLength
            )} gap-3 w-full mt-2`}
          >
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
      {financesFiltered && filteredItemsLength !== 0 && (
        <section
          className={`max-h-100 mt-2 p-3 bg-black bg-opacity-40 rounded-md overflow-y-auto scrollbar-custom`}
        >
          <div
            className={`${getDivStyle(
              filteredItemsLength || itemsLength
            )} gap-3 w-full mt-2`}
          >
            {filteredItems.map((item) => (
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
