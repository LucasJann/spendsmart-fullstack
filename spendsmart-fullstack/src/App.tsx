import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LoginPage from "./components/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [{ path: "/", element: <LoginPage /> }],
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
