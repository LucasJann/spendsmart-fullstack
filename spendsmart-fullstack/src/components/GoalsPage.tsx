import { useEffect, useState, useCallback } from "react";

import Input from "./Input";
import NavBar from "./NavBar";
import Button from "./Button";
import GoalItem from "./GoalItem";

import beach from "../images/landscape.jpg";

const user = localStorage.getItem("user")?.replace(/"/g, "");

const formatBalance = (value: number) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format(value / 100);
};

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

interface Goal {
  _id: string;
  goal: string;
  value: string;
}

interface StyleValuesProperties {
  confirm: boolean;
  divStyle: string;
  sectionStyle: string;
  goalsSection: boolean;
}

interface FormProperties {
  goal: string;
  goals: Goal[];
  balance: string;
  goalValue: string;
}

const styleValues: StyleValuesProperties = {
  confirm: false,
  divStyle: "string",
  goalsSection: false,
  sectionStyle: "string",
};

const initialFormValues: FormProperties = {
  goal: "",
  goals: [],
  balance: "R$ 0,00",
  goalValue: "",
};

const Goals = () => {
  const [style, setStyle] = useState(styleValues);
  const [formData, setFormData] = useState(initialFormValues);

  const getGoals = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/goalsPage/${user}`);
      if (!response.ok) throw new Error("Failed to fetch goals");

      const responseData = await response.json();
      const goalsData = responseData.data;
      const goalsLength = goalsData.length;

      setFormData((prevState) => ({
        ...prevState,
        goals: goalsData,
      }));
      setStyle((prevState) => ({
        ...prevState,
        divStyle: getDivStyle(goalsLength),
        sectionStyle: getSectionStyle(goalsLength),
        goalsSection: goalsLength > 0,
      }));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getBalance = useCallback(async () => {
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
    getGoals();
    getBalance();
  }, [getBalance, getGoals]);

  useEffect(() => {
    setStyle((prevState) => ({
      ...prevState,
      confirm: formData.goal !== "" && formData.goalValue !== "",
    }));
  }, [formData.goal, formData.goalValue]);

  const handleGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    const formattedValue = formatBalance(numericValue);

    if (value.length >= 20) {
      return;
    }

    switch (id) {
      case "yourGoal":
        setFormData((prevState) => ({
          ...prevState,
          goal: value,
        }));
        break;
      default:
        setFormData((prevState) => ({
          ...prevState,
          goalValue: formattedValue,
        }));
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      }));
      setStyle((prevState) => ({
        ...prevState,
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
      <NavBar />
      <form
        className="mt-12 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col items-center justify-center bg-black bg-opacity-40 rounded-md text-gray-200 p-3 ">
          <label htmlFor="yourBalance">Your balance</label>
          <Input
            id="yourBalance"
            name="yourBalance"
            type="text"
            value={formData.balance}
            disabled
            className="w-3/4 border rounded-md text-black text-center"
          />
          <label htmlFor="yourGoal">What is your goal?</label>
          <Input
            id="yourGoal"
            name="yourGoal"
            type="text"
            value={formData.goal}
            onChange={handleGoal}
            className="w-3/4 border rounded-md text-black text-center"
            placeholder="Resume your goal"
          />
          <label htmlFor="goalValue">Insert the goal's value</label>
          <Input
            id="goalValue"
            name="goalValue"
            type="text"
            value={formData.goalValue}
            onChange={handleGoal}
            className="w-3/4 border rounded-md text-black text-center"
          />
          {style.confirm && (
            <Button
              id="goalSubmitButton"
              type="submit"
              className="w-full bg-green-600 p-3 rounded-md"
            >
              Confirm
            </Button>
          )}
        </div>
      </form>
      {style.goalsSection && (
        <section
          className={`${style.sectionStyle} mt-2 p-2 bg-black bg-opacity-40 rounded-md overflow-y-auto scrollbar-custom`}
        >
          <div className={`${style.divStyle} gap-3 w-full `}>
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
