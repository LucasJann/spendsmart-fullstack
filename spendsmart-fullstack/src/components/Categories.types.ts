import trip from "../Icons/Trip.svg";
import home from "../Icons/Home.svg";
import food from "../Icons/Food.svg";
import extra from "../Icons/Extra.svg";
import salary from "../Icons/Salary.svg";
import health from "../Icons/Health.svg";
import leisure from "../Icons/Leisure.svg";
import education from "../Icons/Education.svg";
import investments from "../Icons/Investments.svg";

enum Categories {
  Food = "Food",
  Trip = "Trip",
  Home = "Home",
  Salary = "Salary",
  Health = "Health",
  Leisure = "Leisure",
  Education = "Education",
  Investments = "Investments",
  ExtraIncome = "Extra Income",
}


export const categoryExpenseItems = [
  {
    id: "1",
    alt: "Cutlery",
    src: food,
    name: Categories.Food,
  },
  {
    id: "2",
    alt: "Graduation Hat",
    src: education,
    name: Categories.Education,
  },
  {
    id: "3",
    alt: "Heart",
    src: health,
    name: Categories.Health,
  },
  {
    id: "4",
    alt: "Rocket",
    src: leisure,
    name: Categories.Leisure,
  },
  {
    id: "5",
    alt: "House",
    src: home,
    name: Categories.Home,
  },
  {
    id: "6",
    alt: "Airplane",
    src: trip,
    name: Categories.Trip,
  },
];

export const categoryIncomeItems = [
  {
    id: "7",
    alt: "Rising Bar",
    src: investments,
    name: Categories.Investments,
  },
  {
    id: "8",
    alt: "Pigbank",
    src: extra,
    name: Categories.ExtraIncome,
  },
  {
    id: "9",
    alt: "Coin",
    src: salary,
    name: Categories.Salary,
  },
];
