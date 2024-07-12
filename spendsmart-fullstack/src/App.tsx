import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/LoginPage";
import Menu from "./components/MenuPage";
import Profile from "./components/ProfilePage";
import Goals from "./components/GoalsPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Login /> },
      { path: "/menuPage", element: <Menu /> },
      { path: "/profilePage", element: <Profile /> },
      { path: "/goalsPage", element: <Goals /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
