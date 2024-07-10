import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Menu from "../components/MenuPage";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Menu component", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it("renders buttons with correct text and class", () => {
    const { getByText } = render(
      <Router>
        <Menu />
      </Router>
    );

    const profileButton = getByText("Profile");
    const financesButton = getByText("My Finances");
    const goalsButton = getByText("Next Goals");

    expect(profileButton).toBeInTheDocument();
    expect(profileButton).toHaveClass("bg-orange-500 mt-5 ml-10 p-4 w-4/5 mx-auto text-white");
    
    expect(financesButton).toBeInTheDocument();
    expect(financesButton).toHaveClass("bg-orange-500 mt-5 ml-10 p-4 w-4/5 mx-auto text-white");
    
    expect(goalsButton).toBeInTheDocument();
    expect(goalsButton).toHaveClass("bg-orange-500 mt-5 ml-10 p-4 w-4/5 mx-auto text-white");
  });

  it("navigates to correct pages on button click", () => {
    const { getByText } = render(
      <Router>
        <Menu />
      </Router>
    );

    fireEvent.click(getByText("Profile"));
    expect(mockedNavigate).toHaveBeenCalledWith("/profilePage");

    fireEvent.click(getByText("My Finances"));
    expect(mockedNavigate).toHaveBeenCalledWith("");

    fireEvent.click(getByText("Next Goals"));
    expect(mockedNavigate).toHaveBeenCalledWith("");
  });
});
