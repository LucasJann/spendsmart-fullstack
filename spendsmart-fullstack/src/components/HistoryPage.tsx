import { useState, useEffect } from "react";

import night from "../images/night.jpg";

import Card from "./Card";
import Input from "./Input";
import Button from "./Button";

const HistoryPage = () => {
  interface itemsInterface {
    _id: string;
    date: string;
    income?: string;
    expense?: string;
    category: string;
  }

  const [items, setItems] = useState<itemsInterface[]>([]);
  const [itemsLength, setItemsLength] = useState<number>(0);

  useEffect(() => {
    const user = localStorage.getItem("user")?.replace(/"/g, "");
    const getFinances = async () => {
      try {
        const response = await fetch(`http://localhost:8080/finances/${user}`);
        if (!response.ok) {
          console.log("Failed to fetch");
        }
        const responseData = await response.json();
        setItems(responseData.items);
        setItemsLength(responseData.items.length);
      } catch (err) {
        console.error(err);
      }
    };
    getFinances();
  }, []);

  const getDivStyle = (goalsLength: number) => {
    switch (goalsLength) {
      case 1:
        return "grid grid-cols-1";
      case 2:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2";
      case 3:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
    }
  };

  const getSectionStyle = (itemsLength: number) => {
    switch (itemsLength) {
      case 1:
        return "w-3/4 sm:w-2/4 md:w-2/4 lg:w-1/4";
      case 2:
        return "w-3/4 sm:w-5/6 md:w-4/5 lg:w-1/3";
      case 3:
        return "w-3/4 sm:w-5/6 md:w-4/5 lg:w-1/2";
      case 4:
        return "w-3/4 sm:w-5/6 md:w-4/5 lg:w-3/4";
      default:
        return "w-full";
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat caret-transparent"
      style={{ backgroundImage: `url(${night})` }}
    >
      <section
        className={`max-w-md w-full bg-black bg-opacity-60 rounded-md text-white p-1`}
      >
        <form className="flex flex-col items-center">
          <label className="">Initial Date</label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            className="w-3/4 mb-1 text-black text-center rounded-md"
          />
          <label className="">Final Date</label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            className="w-3/4 mb-1 text-black text-center rounded-md"
          />
          <Button
            id="searchButton"
            type="submit"
            className="w-full bg-purple-400 p-3 mt-2 rounded-md hover:bg-purple-500"
          >
            Search by Date
          </Button>
        </form>
      </section>
      {items && (
        <section
          className={`${getSectionStyle(
            itemsLength
          )} max-h-100 mt-2 p-2 bg-black bg-opacity-40 rounded-md overflow-y-auto scrollbar-custom`}
        >
          <div className={`${getDivStyle(itemsLength)} gap-3 w-full mt-2`}>
            {items.map((item) => (
              <Card
                key={item._id}
                _id={item._id}
                date={item.date}
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
