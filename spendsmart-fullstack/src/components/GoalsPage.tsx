import { useEffect, useState } from "react";
import beach from "../images/afternoon.jpg";
import Input from "./Input";
import Button from "./Button";

const Goals = () => {
  interface formProperties {
    goal: string;
    balance: string;
    goalValue: string;
    confirm: boolean;
    focusedGoalEntry: boolean;
    focusedGoalValueEntry: boolean;
  }

  const formValues = {
    goal: "",
    balance: "R$ 0,00",
    goalValue: "",
    confirm: false,
    focusedGoalEntry: false,
    focusedGoalValueEntry: false,
  };
  const [formData, setFormData] = useState<formProperties>(formValues);

  const formatBalance = (value: number) => {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    return formatter.format(value / 100);
  };

  useEffect(() => {
    console.log(formData.goal);

    if (formData.goal !== "" && formData.goalValue !== "") {
      setFormData((prevState) => ({
        ...prevState,
        confirm: true,
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

  const handleGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if (value[0] === "R") {
      value = value.replace(/[^0-9]/g, "");
    }
    console.log(value);
    if (formData.focusedGoalEntry) {
      if (value === "") {
        setFormData((prevState) => ({
          ...prevState,
          goal: "",
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          goal: value,
        }));
      }
    } else {
      if (value === "0") {
        const formattedValue = formatBalance(0);
        setFormData((prevState) => ({
          ...prevState,
          goalValue: formattedValue,
        }));
      } else {
        const integerValue = Number(value);
        const formattedValue = formatBalance(integerValue);
        console.log(formattedValue);
        setFormData((prevState) => ({
          ...prevState,
          goalValue: formattedValue,
        }));
      }
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

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${beach})` }}
    >
      <form className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
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
    </div>
  );
};

export default Goals;
