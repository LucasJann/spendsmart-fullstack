import { useEffect, useState } from "react";

interface GoalItemProperties {
  item: any;
}

const GoalItem: React.FC<GoalItemProperties> = ({ item }) => {
  const { goal, value } = item;

  const [balance, setBalance] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [itemPercentageStyle, setItemPercentageStyle] = useState<object>({});

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
        setBalance(responseBalance);
      } catch (err) {
        console.error("Failed to fetch balance:", err);
      }
    };
    getBalance();
  }, []);

  useEffect(() => {
    const newValue = value.replace(/[^0-9]/g, "");
    const newBalance = balance.replace(/[^0-9]/g, "");

    if (balance !== undefined && newValue) {
      const progress = (parseInt(newBalance) / parseInt(newValue)) * 100;
      const roundedProgress = Math.min(Math.ceil(progress), 100);

      setProgress(roundedProgress);

      const percentageColor = getPercentageColor(roundedProgress);
      const itemPercentageStyle = {
        backgroundColor: percentageColor,
        width: roundedProgress >= 10 ? roundedProgress + "%" : "10%",
      };
      setItemPercentageStyle(itemPercentageStyle);
    }
  }, [balance, value]);

  const getPercentageColor = (percentage: number) => {
    const minHue = 0;
    const maxHue = 120;
    const hue = (percentage * (maxHue - minHue)) / 100 + minHue;
    const saturation = 100;
    const lightness = 50;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <section className="w-full h-full p-4 border rounded-md shadow-mg bg-white shadow flex flex-col">
      <div className="grid grid-cols-2 gap-2 bg-white">
        <h2 className="font-bold text-lg p-1">Goal: </h2>
        <p className="p-1 text-start break-words">{goal}</p>
        <h2 className="font-bold text-lg p-1">Value: </h2>
        <p className="p-1 text-start overflow-hidden truncate">{value}</p>
        <h2 className="font-bold text-lg p-1">Progress:</h2>
        <div className="relative w-full h-5 mt-2 bg-gray-200 rounded-md overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full rounded-md text-center"
            style={itemPercentageStyle}
          >
            <div className="absolute text-center font-bold text-sm bottom-0 left-1  ">
              {progress === 100 ? "Completed" : `${progress}%`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalItem;
