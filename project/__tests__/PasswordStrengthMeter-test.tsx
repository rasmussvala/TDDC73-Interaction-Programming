import { render } from "@testing-library/react-native";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";

describe("Password Strength Meter", () => {
  test("Renders password input correctly", () => {
    const { getByPlaceholderText } = render(<PasswordStrengthMeter />);

    const passwordInput = getByPlaceholderText("Enter password");
    expect(passwordInput).toBeTruthy();
  });
});
