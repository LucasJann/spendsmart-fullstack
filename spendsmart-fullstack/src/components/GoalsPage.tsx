import { useEffect, useState, useCallback } from "react";
import beach from "../images/afternoon.jpg";
import Input from "./Input";
import Button from "./Button";
import GoalItem from "./GoalItem";
import "../index.css";

const Goals = () => {
  interface Goal {
    _id: string;
    goal: string;
    value: string;
  }

  interface FormProperties {
    balance: string;
    goal: string;
    goalValue: string;
    confirm: boolean;
    goals: Goal[];
    goalsSection: boolean;
    sectionStyle: string;
    divStyle: string;
  }

  const initialFormValues: FormProperties = {
    balance: "R$ 0,00",
    goal: "",
    goalValue: "",
    confirm: false,
    goals: [],
    goalsSection: false,
    sectionStyle: "",
    divStyle: "",
  };

  const [formData, setFormData] = useState<FormProperties>(initialFormValues);

  const formatBalance = (value: number) => {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    return formatter.format(value / 100);
  };

  const getGoals = useCallback(async () => {
    const user = localStorage.getItem("user")?.replace(/"/g, "");
    try {
      const response = await fetch(`http://localhost:8080/goalsPage/${user}`);
      if (!response.ok) throw new Error("Failed to fetch goals");

      const responseData = await response.json();
      const goals = responseData.data;
      const goalsLength = goals.length;

      setFormData((prevState) => ({
        ...prevState,
        goals,
        goalsSection: goalsLength > 0,
        divStyle: getDivStyle(goalsLength),
        sectionStyle: getSectionStyle(goalsLength),
      }));
    } catch (err) {
      console.error(err);
    }
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

  const getSectionStyle = (goalsLength: number) => {
    switch (goalsLength) {
      case 1:
        return "w-3/4 sm:w-2/4 md:w-2/4 lg:w-1/4";
      case 2:
        return "w-3/4 sm:w-5/6 md:w-4/5 lg:w-2/4";
      case 3:
        return "w-3/4 sm:w-5/6 md:w-4/5 lg:w-3/4";
      case 4:
        return "w-3/4 sm:w-5/6 md:w-4/5 lg:w-3/4";
      default:
        return "w-full";
    }
  };

  const fetchBalance = useCallback(async () => {
    const user = localStorage.getItem("user")?.replace(/"/g, "");
    try {
      const response = await fetch(`http://localhost:8080/balance/${user}`);
      if (!response.ok) throw new Error("Failed to fetch balance");

      const responseData = await response.json();
      const formattedValue = formatBalance(responseData.balance);
      setFormData((prevState) => ({
        ...prevState,
        balance: formattedValue,
      }));
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
    getGoals();
  }, [fetchBalance, getGoals]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      confirm: formData.goal !== "" && formData.goalValue !== "",
    }));
  }, [formData.goal, formData.goalValue]);

  const handleGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    if (id === "goalTitle") {
      if (value.length <= 20) {
        setFormData((prevState) => ({
          ...prevState,
          goal: value,
        }));
      }
    } else {
      if (value.length <= 18) {
        const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
        const formattedValue = formatBalance(numericValue);
        setFormData((prevState) => ({
          ...prevState,
          goalValue: formattedValue,
        }));
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = localStorage.getItem("user")?.replace(/"/g, "");
    const data = { id: 1, goal: formData.goal, value: formData.goalValue };
    try {
      await fetch(`http://localhost:8080/goalsPage/${user}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setFormData((prevState) => ({
        ...prevState,
        goal: "",
        goalValue: "",
        confirm: false,
        goalsSection: true,
      }));
      getGoals();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat caret-transparent"
      style={{ backgroundImage: `url(${beach})` }}
    >
      <form
        className="mt-2 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center shadow-mg bg-black bg-opacity-40 shadow-mg rounded-md text-gray-200 text-center p-3">
          <label htmlFor="currentBalance">Your balance</label>
          <Input
            id="currentBalance"
            name="currentBalance"
            type="text"
            value={formData.balance}
            disabled
            className="w-3/4 mb-2 border rounded-md text-center"
          />
          <label htmlFor="goalTitle">What is your goal?</label>
          <Input
            id="goalTitle"
            name="goalTitle"
            type="text"
            value={formData.goal}
            className="w-3/4 mb-2 text-black text-center rounded-md"
            placeholder="Resume your goal"
            onChange={handleGoal}
          />
          <label htmlFor="goalValue">Insert the goal's value</label>
          <Input
            id="goalValue"
            name="goalValue"
            type="text"
            value={formData.goalValue}
            className="w-3/4 mb-2 text-black rounded-md text-center"
            onChange={handleGoal}
          />
          {formData.confirm && (
            <Button
              id="goalSubmitButton"
              type="submit"
              className="w-full bg-blue-400 p-3 mt-2 rounded-md hover:bg-blue-600"
            >
              Confirm
            </Button>
          )}
        </div>
      </form>
      {formData.goalsSection && (
        <section
          className={`${formData.sectionStyle} max-h-100 mt-2 p-2 bg-black bg-opacity-40 rounded-md overflow-y-auto scrollbar-custom`}
        >
          <div className={`${formData.divStyle} gap-3 w-full mt-2`}>
            {formData.goals.map((goal, key) => (
              <GoalItem item={goal} key={key} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Goals;
