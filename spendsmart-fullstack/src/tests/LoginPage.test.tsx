import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "../pages/Login";

describe("LoginPage component", () => {
  it("renders login form by default", () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <LoginPage />
      </Router>
    );

    expect(getByPlaceholderText("Insira seu e-mail")).toBeInTheDocument();
    expect(getByPlaceholderText("Insira sua senha")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
  });

  it("renders registration form when register button is clicked", async () => {
    const { getByText, getByPlaceholderText } = render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.click(getByText("Register"));

    await waitFor(() => {
      expect(getByPlaceholderText("Insira seu nome")).toBeInTheDocument();
      expect(getByPlaceholderText("Insira seu sobrenome")).toBeInTheDocument();
      expect(getByText("Confirm")).toBeInTheDocument();
    });
  });

  it("switches between login and registration forms", async () => {
    const { getByText, getByPlaceholderText, queryByPlaceholderText } = render(
      <Router>
        <LoginPage />
      </Router>
    );

    expect(getByPlaceholderText("Insira seu e-mail")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();

    fireEvent.click(getByText("Register"));

    await waitFor(() => {
      expect(getByPlaceholderText("Insira seu nome")).toBeInTheDocument();
      expect(getByText("Confirm")).toBeInTheDocument();
    });

    fireEvent.click(getByText("Login"));

    expect(queryByPlaceholderText("Insira seu nome")).not.toBeInTheDocument();
    expect(queryByPlaceholderText("Insira seu sobrenome")).not.toBeInTheDocument();
    expect(queryByPlaceholderText("Confirmar")).not.toBeInTheDocument();

    expect(getByPlaceholderText("Insira seu e-mail")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
  });
});
