# Documentation

## Goals Component

The `Goals` component is a React functional component that allows users to manage their financial goals. It displays the user's balance, allows them to describe a goal and its value, and then submit the goal. The submitted goals are displayed in a grid layout.

## Properties

The `Goals` component does not accept any props. It maintains its own state internally.

## Internal State

The internal state of the `Goals` component is managed using the `useState` hook and consists of the following properties:

| Property     | Type    | Default   | Description                                                     |
| ------------ | ------- | --------- | --------------------------------------------------------------- |
| balance      | string  | "R$ 0,00" | The current balance of the user.                                |
| goal         | string  | ""        | The description of the current goal.                            |
| goalValue    | string  | ""        | The value of the current goal.                                  |
| confirm      | boolean | false     | Flag to confirm whether the goal can be submitted.              |
| goals        | Goal[]  | []        | An array of goals submitted by the user.                        |
| goalsSection | boolean | false     | Flag to indicate whether the goals section should be displayed. |
| sectionStyle | string  | ""        | CSS class for the goals section container.                      |
| divStyle     | string  | ""        | CSS class for the goals grid container.                         |

## Goal Interface

The `Goal` interface represents a goal object with the following properties:

| Property | Type   | Description                           |
| -------- | ------ | ------------------------------------- |
| \_id     | string | Unique identifier for the goal.       |
| goal     | string | Description of the goal.              |
| value    | string | Value of the goal in currency format. |

## Methods

### formatBalance

Formats a given numeric value into the BRL currency format.

```typescript
const formatBalance = (value: number) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format(value / 100);
};
```

### getGoals

Fetches the goals of the user from the backend and updates the state accordingly.

```typescript
const getGoals = async () => {
  const user = localStorage.getItem("user")?.replace(/"/g, "");
  try {
    const response = await fetch(`http://localhost:8080/goalsPage/${user}`);
    if (!response.ok) {
      return console.log("Response is not ok");
    }
    const responseData = await response.json();
    const responseLength = responseData.data.length;
    setDataLength(responseLength);
    setFormData((prevState) => ({
      ...prevState,
      goals: responseData.data,
    }));

    // Additional logic to set divStyle and sectionStyle based on the number of goals
  } catch (err) {
    console.log(err);
  }
};
```

### handleGoal

Handles the input changes for the goal description and goal value.

```typescript
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
  } else {
    if (value.length > 18) {
      return;
    }
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    const formattedValue = formatBalance(numericValue);
    setFormData((prevState) => ({
      ...prevState,
      goalValue: formattedValue,
    }));
  }
};
```

### handleSubmit

Handles the form submission to create a new goal.

```typescript
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const user = localStorage.getItem("user")?.replace(/"/g, "");
  const data = {
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
```

### Events

The Goals component handles the following events internall:

Event | Description
onChange | Triggered when the input fields are changed.
onSubmit | Triggered when the form is submitted.

## Example Usage

```typescript
import React from "react";
import Goals from "./Goals";

const App = () => {
  return (
    <div>
      <Goals />
    </div>
  );
};

export default App;
```

### Notes

The Goals component fetches the user's balance and goals from the backend when it is first rendered.
The grid layout for displaying goals adjusts dynamically based on the number of goals.
The goal value input is formatted to the BRL currency format as the user types.
The form can only be submitted when both the goal description and goal value are provided.
The Goals component uses the fetch API for backend communication, so ensure the backend server is running and accessible at http://localhost:8080.
The component uses localStorage to store and retrieve the user information. Ensure that the user is set in localStorage before using the component.
