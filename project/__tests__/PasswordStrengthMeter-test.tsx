import { render } from "@testing-library/react-native";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";

describe("test", () => {
  test("Text renders correctly", () => {
    const { getByText } = render(<PasswordStrengthMeter />);

    getByText("Welcome");
  });
});
