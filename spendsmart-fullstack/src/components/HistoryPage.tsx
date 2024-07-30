import { useState, useEffect } from "react";

import night from "../images/night.jpg";

import Card from "./Card";
import Input from "./Input";
import Button from "./Button";

const HistoryPage = () => {
  interface itemsInterface {
    date: string;
    income?: string;
    expense?: string;
    category: string;
  }

  const [items, setItems] = useState<itemsInterface[]>([]);

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
      } catch (err) {
        console.error(err);
      }
    };
    getFinances();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat caret-transparent"
      style={{ backgroundImage: `url(${night})` }}
    >
      <section className="mas-w-sm w-1/4 bg-black bg-opacity-60 rounded-md text-white">
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
      <section className="mas-w-sm mt-5 w-1/4 bg-black bg-opacity-60 rounded-md text-white">
        {items &&
          items.map((item, index) => (
            <Card
              key={index}
              date={item.date}
              income={item.income}
              expense={item.expense}
              category={item.category}
            />
            // <div key={index} className="p-2 border-b border-gray-500 bg-white text-black rounded-md">
            //   <p>Date: {item.date}</p>
            //   {item.income && <p>Income: {item.income}</p>}
            //   {item.expense && <p>Expense: {item.expense}</p>}
            //   <p>Category: {item.category}</p>
            // </div>
          ))}
      </section>
    </div>
  );
};

export default HistoryPage;
