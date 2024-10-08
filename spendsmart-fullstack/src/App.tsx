import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/LoginPage";
import Profile from "./components/ProfilePage";
import Finances from "./components/FinancesPage";
import History from "./components/HistoryPage";
import Goals from "./components/GoalsPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Login /> },
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
