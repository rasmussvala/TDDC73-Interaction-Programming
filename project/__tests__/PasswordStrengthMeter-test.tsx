import PasswordStrengthMeter from "@/components/PasswordStrengthMeter/PasswordStrengthMeter";
import { fireEvent, render, screen } from "@testing-library/react-native";

test("renders password input", () => {
  render(<PasswordStrengthMeter />);
  expect(screen.queryByPlaceholderText("Enter password")).toBeTruthy();
});

test("does not render confirm password when confirmPassword is false", () => {
  render(<PasswordStrengthMeter confirmPassword={false} />);
  expect(screen.queryByPlaceholderText("Confirm password")).toBeNull();
});

test("does render confirm password when confirmPassword is true", () => {
  render(<PasswordStrengthMeter confirmPassword={true} />);
  expect(screen.queryByPlaceholderText("Confirm password")).toBeTruthy();
});

test("change strength text", () => {
  render(<PasswordStrengthMeter strengthText={["A", "B", "C", "D"]} />);
  expect(screen.getAllByText("A")).toBeTruthy();
});

test("weak password strength", () => {
  const mockStrengthChange = jest.fn();

  render(<PasswordStrengthMeter onStrengthChange={mockStrengthChange} />);

  const passwordInput = screen.getByPlaceholderText("Enter password");

  fireEvent.changeText(passwordInput, "mypassword");

  // mock.calls is an array where each element represents the arguments passed during a call to the mocked function.
  // .at(-1) gets the last element in the array.
  // [0]: access the first argument of the last call.
  const strengthValue = mockStrengthChange.mock.calls.at(-1)[0];

  expect(strengthValue).toEqual(0.25);
});

test("strong password strength", () => {
  const mockStrengthChange = jest.fn();

  render(<PasswordStrengthMeter onStrengthChange={mockStrengthChange} />);

  const passwordInput = screen.getByPlaceholderText("Enter password");

  fireEvent.changeText(passwordInput, "myPassword1!");

  const strengthValue = mockStrengthChange.mock.calls.at(-1)[0];

  expect(strengthValue).toEqual(1);
});
