import { useEffect, useState } from "react";

import beach from "../images/afternoon.jpg";
import Input from "./Input";
import Button from "./Button";
import GoalItem from "./GoalItem";

import { v4 as uuidv4 } from "uuid";

import "../index.css";

const Goals = () => {
  interface formProperties {
    goal: string;
    sectionStyle: string;
    divStyle: string;
    balance: string;
    goalValue: string;
    goals: any;
    confirm: boolean;
    goalsSection: boolean;
    focusedGoalEntry: boolean;
    focusedGoalValueEntry: boolean;
  }

  const formValues = {
    goal: "",
    divStyle: "",
    sectionStyle: "",
    balance: "R$ 0,00",
    goalValue: "",
    goals: [],
    confirm: false,
    goalsSection: false,
    focusedGoalEntry: false,
    focusedGoalValueEntry: false,
  };
  const [formData, setFormData] = useState<formProperties>(formValues);
  const [length, setLength] = useState(0);

  const formatBalance = (value: number) => {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    return formatter.format(value / 100);
  };

  useEffect(() => {
    if (formData.goal !== "" && formData.goalValue !== "") {
      setFormData((prevState) => ({
        ...prevState,
        confirm: true,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        confirm: false,
      }));
    }
  }, [formData.goal, formData.goalValue]);

  useEffect(() => {
    const user = localStorage.getItem("user")?.replace(/"/g, "");
    const getBalance = async () => {
      try {
        const response = await fetch(`http://localhost:8080/balance/${user}`);

        if (!response.ok) {
          console.log("Response is not ok");
        }

        const responseData = await response.json();
        const responseBalance = responseData.balance;

        const formattedValue = formatBalance(responseBalance);
        setFormData((prevState) => ({
          ...prevState,
          balance: formattedValue,
        }));
      } catch (err) {}
    };
    getBalance();
  }, []);

  const getGoals = async () => {
    const user = localStorage.getItem("user")?.replace(/"/g, "");
    try {
      const response = await fetch(`http://localhost:8080/goalsPage/${user}`);

      if (!response.ok) {
        console.log("Response is not ok");
      }

      const responseData = await response.json();

      setLength(responseData.data.length);

      setFormData((prevState) => ({
        ...prevState,
        goals: responseData.data,
      }));

      if (responseData.data.length > 0) {
        switch (responseData.data.length) {
          case 1:
            setFormData((prevState) => ({
              ...prevState,
              divStyle: "grid grid-cols-1",
              sectionStyle: "w-1/4",
            }));
            break;
          case 2:
            setFormData((prevState) => ({
              ...prevState,
              divStyle:
                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2",
              sectionStyle: "w-2/4",
            }));
            break;
          case 3:
            setFormData((prevState) => ({
              ...prevState,
              divStyle:
                "grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3",
              sectionStyle: "w-2/4",
            }));
            break;
          case 4:
            setFormData((prevState) => ({
              ...prevState,
              divStyle:
                "grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4",
              sectionStyle: "w-2/4",
            }));
            break;
          default:
            setFormData((prevState) => ({
              ...prevState,
              divStyle:
                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-5",
              sectionStyle: "w-4/5",

            }));
            break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        goalsSection: true,
      }));
    }
  }, [length]);

  useEffect(() => {
    getGoals();
  }, [formData.confirm]);

  const handleGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    if (id === "goalText") {
      if (value.length > 20) {
        return;
      }
      setFormData((prevState) => ({
        ...prevState,
        goal: value,
      }));
    } else if (id === "goalValue") {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
      const formattedValue = formatBalance(numericValue);
      setFormData((prevState) => ({
        ...prevState,
        goalValue: formattedValue,
      }));
    }
  };

  const handleTextInput = () => {
    setFormData((prevState) => ({
      ...prevState,
      focusedGoalEntry: true,
      focusedGoalValueEntry: false,
    }));
  };

  const handleValueInput = () => {
    setFormData((prevState) => ({
      ...prevState,
      focusedGoalEntry: false,
      focusedGoalValueEntry: true,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = localStorage.getItem("user")?.replace(/"/g, "");

    const id = uuidv4();
    const data = {
      id: id,
      goal: formData.goal,
      value: formData.goalValue,
    };

    try {
      await fetch(`http://localhost:8080/goalsPage/${user}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err);
    }

    setFormData((prevState) => ({
      ...prevState,
      goal: "",
      goalValue: "",
      confirm: false,
      goalsSection: true,
    }));
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${beach})` }}
    >
      <form
        className="mt-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        onSubmit={handleSubmit}
      >
        <div className="items-center shadow-mg bg-black bg-opacity-40 shadow-mg rounded-md text-gray-200 text-center p-3">
          <label htmlFor="currentBalance">Your balance</label>
          <Input
            id="currentBalance"
            name="currentBalance"
            type="text"
            value={formData.balance}
            className="w-3/4 mb-2 border rounded-md text-center"
            disabled
          />
          <hr />
          <label htmlFor="goalText">Describe your goal</label>
          <Input
            id="goalText"
            name="goalText"
            type="text"
            value={formData.goal}
            placeholder="Resume your goal"
            className="w-3/4 mb-2 text-black text-center rounded-md"
            onClick={handleTextInput}
            onChange={handleGoal}
          />
          <hr />
          <label htmlFor="goalValue">Insert the goal's value</label>
          <Input
            id="goalValue"
            name="goalValue"
            type="text"
            value={formData.goalValue}
            className="w-3/4 mb-2 text-black rounded-md text-center"
            onClick={handleValueInput}
            onChange={handleGoal}
          />
          <hr />
          {formData.confirm && (
            <Button
              id="goalSubmitButton"
              className="w-full bg-blue-400 p-3 mt-2 rounded-md hover:bg-blue-600"
              type="submit"
            >
              Confirm
            </Button>
          )}
        </div>
      </form>

      {formData.goalsSection && (
        <section
          className={`${formData.sectionStyle} max-h-100 mt-2 p-2  bg-black bg-opacity-40 rounded-md overflow-y-auto scrollbar-custom`}
        >
          <div className={formData.divStyle + " gap-3 w-full mt-2"}>
            {formData.goals.map((goal: {}, key: number) => (
              <GoalItem item={goal} key={key} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Goals;
