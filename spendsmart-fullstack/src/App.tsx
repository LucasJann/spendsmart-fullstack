import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Fragment } from "react/jsx-runtime";
import LoginPage from "./components/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [{ path: "/", element: <LoginPage /> }],
  },
]);

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
