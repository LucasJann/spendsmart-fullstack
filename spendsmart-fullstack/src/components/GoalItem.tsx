import { useEffect, useState } from "react";

import Button from "./Button";

interface Goal {
  _id: string;
  goal: string;
  value: string;
}

interface GoalItemProperties {
  item: Goal;
}

const GoalItem: React.FC<GoalItemProperties> = ({ item }) => {
  const { _id, goal, value } = item;

  const [balance, setBalance] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [itemPercentageStyle, setItemPercentageStyle] = useState<object>({});

  useEffect(() => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    if (!token) {
      console.error("User not logged in");
      return;
    }
    const getBalance = async () => {
      try {
        const response = await fetch(`http://localhost:8080/balance/${token}`);
        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }
        const responseData = await response.json();
        setBalance(responseData.balance);
      } catch (err) {
        console.error("Failed to fetch balance:", err);
      }
    };
    getBalance();
  }, []);

  useEffect(() => {
    const newValue = value.replace(/[^0-9]/g, "");
    if (balance !== undefined && newValue) {
      const progress = (parseInt(balance) / parseInt(newValue)) * 100;
      const roundedProgress = Math.min(Math.ceil(progress), 100);

      setProgress(roundedProgress);

      const percentageColor = getPercentageColor(roundedProgress);
      setItemPercentageStyle({
        backgroundColor: percentageColor,
        width: roundedProgress >= 10 ? `${roundedProgress}%` : "10%",
      });
    }
  }, [balance, value]);

  const deleteGoalHandler = async () => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    if (!token) {
      console.error("User not logged in");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/goalsPage/deleteGoal`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, _id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete goal");
      }
    } catch (err) {
      console.error("Failed to delete goal:", err);
    }
  };

  const getPercentageColor = (percentage: number) => {
    const minHue = 0;
    const maxHue = 120;
    const hue = (percentage * (maxHue - minHue)) / 100 + minHue;
    return `hsl(${hue}, 100%, 50%)`;
  };

  return (
    <section className="w-full h-full pt-auto pb-2 pl-1 pr-2 border rounded-md shadow-mg bg-white shadow flex flex-col">
      <form>
        <div className="flex justify-end">
          <Button
            id={_id}
            type="submit"
            onClick={deleteGoalHandler}
            className="flex justify-end w-1/6 hover:text-red-500 font-bold"
          >
            x
          </Button>
        </div>
      </form>
      <h2 className="font-bold text-lg p-1">Goal: </h2>
      <p className="p-1 text-start break-words">{goal}</p>
      <h2 className="font-bold text-lg p-1">Value: </h2>
      <p className="p-1 text-start overflow-hidden truncate">{value}</p>
      <div className="flex-grow">
        <h2 className="flex font-bold text-lg p-1 h-auto">Progress:</h2>
        <div className="relative w-full h-5 bg-gray-200 rounded-md overflow-hidden ml-1">
          <div
            className="h-full rounded-md text-center"
            style={itemPercentageStyle}
          >
            <div className="absolute text-center font-bold text-sm bottom-0 left-1">
              {progress === 100 ? "Completed" : `${progress}%`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalItem;
