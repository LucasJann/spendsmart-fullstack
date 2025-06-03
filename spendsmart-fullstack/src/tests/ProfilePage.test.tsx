import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "../pages/Profile";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock("../images/landscape.jpg", () => "landscape.jpg");
jest.mock("../images/profilepic.jpg", () => "profilepic.jpg");

describe("Profile Component", () => {
  beforeEach(() => {
    localStorage.setItem("user", '"testuser"');
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("renders the Profile component with initial balance and profile image", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ image: "profilepic.jpg" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ balance: 1000 }),
      });

    await act(async () => {
      render(<Profile />);
    });

    expect(screen.getByAltText("Profile Pic")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue("R$ 10,00")).toBeInTheDocument();
    });
  });

  test("handles editing balance", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ image: "profilepic.jpg" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ balance: 1000 }),
      });

    await act(async () => {
      render(<Profile />);
    });

    const editButton = screen.getByText("Edit Balance");
    fireEvent.click(editButton);

    const balanceInput = screen.getByDisplayValue("R$ 10,00");
    fireEvent.change(balanceInput, { target: { value: "R$ 20,00" } });

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByDisplayValue("R$ 20,00")).toBeInTheDocument();
    });
  });

  test("handles image upload", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ image: "profilepic.jpg" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ balance: 1000 }),
      });

    await act(async () => {
      render(<Profile />);
    });

    const profileImage = screen.getByAltText("Profile Pic");
    fireEvent.click(profileImage);

    const fileInput = screen.getByLabelText("Upload Profile Picture");
    const file = new File(["(⌐□_□)"], "profile.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitButton = screen.getByText("OK");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          body: expect.any(FormData),
        })
      );
    });
  });
});
