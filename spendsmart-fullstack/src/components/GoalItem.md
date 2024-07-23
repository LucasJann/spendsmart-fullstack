### GoalItem Property

| Property | Type | Description                                      |
| item     | Goal | The goal object containing \_id, goal, and value.|

### Goal Interface

| Property | Type   | Description                           |
| \_id     | string | Unique identifier for the goal.       |
| goal     | string | Description of the goal.              |
| value    | string | Value of the goal in currency format. |

### Internal State

| Property            | Type   | Default | Description                            |
| progress            | number | 0       | Description of the goal.               |
| balance             | string | ""      | Unique identifier for the goal.        |
| itemPercentageStyle | object | {}      | Value of the goal in currency format.  |

### Methods

## useEffect for Balance

Fetches the user's balance from the backend when the component mounts.

```typescript
useEffect(() => {
  const user = localStorage.getItem("user")?.replace(/"/g, "");
  if (!user) {
    console.error("User not logged in");
    return;
  }
  const getBalance = async () => {
    try {
      const response = await fetch(`http://localhost:8080/balance/${user}`);
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
```

## useEffect for Progress

Calculates the progress towards the goal based on the user's balance and the goal value.

```typescript
useEffect(() => {
  const newValue = value.replace(/[^0-9]/g, "");
  const newBalance = balance.replace(/[^0-9]/g, "");

  if (balance !== undefined && newValue) {
    const progress = (parseInt(newBalance) / parseInt(newValue)) * 100;
    const roundedProgress = Math.min(Math.ceil(progress), 100);

    setProgress(roundedProgress);

    const percentageColor = getPercentageColor(roundedProgress);
    setItemPercentageStyle({
      backgroundColor: percentageColor,
      width: roundedProgress >= 10 ? `${roundedProgress}%` : "10%",
    });
  }
}, [balance, value]);
```

## deleteGoalHandler

Deletes the goal from the backend.

```typescript
const deleteGoalHandler = async () => {
  const email = localStorage.getItem("user")?.replace(/"/g, "");
  if (!email) {
    console.error("User not logged in");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/goalsPage/deleteGoal`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, _id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete goal");
    }
  } catch (err) {
    console.error("Failed to delete goal:", err);
  }
};
```

## getPercentageColor

Calculates the color of the progress bar based on the progress percentage.

```typescript
const getPercentageColor = (percentage: number) => {
  const minHue = 0;
  const maxHue = 120;
  const hue = (percentage * (maxHue - minHue)) / 100 + minHue;
  return `hsl(${hue}, 100%, 50%)`;
};
```

### Notes

The GoalItem component fetches the user's balance from the backend when it is first rendered.
The progress bar's color changes based on the progress percentage, from red (0%) to green (100%).
The component uses localStorage to store and retrieve the user information. Ensure that the user is set in localStorage before using the component.
The delete button allows users to delete the goal from the backend.