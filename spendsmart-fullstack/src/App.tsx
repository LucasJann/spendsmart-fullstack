import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Finances from "./pages/Finances";
import History from "./pages/History";
import Goals from "./pages/Goals";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Home /> },
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
