import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/LoginPage";
import Menu from "./components/MenuPage";
import Profile from "./components/ProfilePage";
import Goals from "./components/GoalsPage";
import Finances from "./components/FinancesPage";
import History from "./components/HistoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Login /> },
      { path: "/menuPage", element: <Menu /> },
      { path: "/profilePage", element: <Profile /> },
      { path: "/financesPage", element: <Finances /> },
      { path: "/historyPage", element: <History /> },
      { path: "/goalsPage", element: <Goals /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
