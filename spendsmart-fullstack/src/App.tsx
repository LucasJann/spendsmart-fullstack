import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import MenuPage from "./components/MenuPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/menuPage", element: <MenuPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
