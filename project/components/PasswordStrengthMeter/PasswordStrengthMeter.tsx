import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { colors, styles } from "./styles/styles";
import PasswordInput from "./components/inputs/PasswordInput";
import StatusBar from "./components/status/StatusBar";
import StatusBarText from "./components/status/StatusBarText";
import Recommendations from "./components/recomendations/Recommendations";
import ConfirmPasswordInput from "./components/inputs/ConfirmPasswordInput";

type PasswordStrengthMeterProps = {
  nrOfChars?: number;
  hasAtLeastOneUpperCase?: boolean;
  hasAtLeastOneSpecialChar?: boolean;
  hasAtLeastOneNumber?: boolean;
  confirmPassword?: boolean;
  onStrengthChange?: (strength: number) => void;
  showRecomendations?: boolean;
  colorPalette?: { [key: string]: string };
  streangthText?: string[];
};

/**
 * PasswordStrengthMeter Component
 *
 * A React Native component for measuring password strength with customizable criteria, color palette, and recommendations.
 * It includes inputs for password and optional confirmation, along with a dynamic strength indicator.
 *
 * @param {Object} props - The properties for the PasswordStrengthMeter component.
 * @param {number} [props.nrOfChars=8] - Minimum number of characters for a strong password.
 * @param {boolean} [props.hasAtLeastOneUpperCase=true] - Whether the password must include at least one uppercase letter.
 * @param {boolean} [props.hasAtLeastOneSpecialChar=true] - Whether the password must include at least one special character.
 * @param {boolean} [props.hasAtLeastOneNumber=true] - Whether the password must include at least one number.
 * @param {boolean} [props.confirmPassword=true] - Whether to include the confirm password input field.
 * @param {(strength: number) => void} [props.onStrengthChange] - Callback triggered when the password strength changes.
 * @param {boolean} [props.showRecomendations=true] - Whether to display password recommendations.
 * @param {Object} [props.colorPalette] - Custom color palette for styling various components.
 * @param {string} [props.colorPalette.firstColor] - Color for the weakest strength level.
 * @param {string} [props.colorPalette.secondColor] - Color for the low strength level.
 * @param {string} [props.colorPalette.thirdColor] - Color for the medium strength level.
 * @param {string} [props.colorPalette.forthColor] - Color for the strongest strength level.
 * @param {string} [props.colorPalette.warning] - Color for warnings (e.g., mismatched passwords).
 * @param {string} [props.colorPalette.darkColor] - Dark color for text or other components.
 * @param {string} [props.colorPalette.mediumDarkColor] - Medium-dark color for secondary elements.
 * @param {string} [props.colorPalette.lightColor] - Light color for backgrounds or accents.
 * @param {string[]} [props.streangthText] - Custom labels for strength levels (must be an array of 4 strings).
 */
const PasswordStrengthMeter = ({
  nrOfChars = 8,
  hasAtLeastOneUpperCase = true,
  hasAtLeastOneSpecialChar = true,
  hasAtLeastOneNumber = true,
  confirmPassword = true,
  onStrengthChange,
  showRecomendations = true,
  colorPalette,
  streangthText,
}: PasswordStrengthMeterProps) => {
  const [password, setPassword] = useState<string>("");
  const [passwordChecker, setPasswordChecker] = useState<string>("");
  const [strength, setStrength] = useState<number>(0.0);
  const [statusColors, setStatusColors] = useState<string[]>(
    Array(4).fill(colors.gray)
  );

  const textStatusArrayInit = ["Weak", "Okay", "Good", "Strong"];
  const [textStatusArray, setTextStatusArray] = useState(textStatusArrayInit);
  const [achievementColors, setAchievementColors] = useState({
    length: colors.darkGray,
    upperCase: colors.darkGray,
    specialChar: colors.darkGray,
    number: colors.darkGray,
  });
  const [equalPasswords, setEqualPasswords] = useState(false);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const setUserColors = () => {
      if (colorPalette) {
        colors.red = colorPalette.firstColor ?? colors.red;
        colors.orange = colorPalette.secondColor ?? colors.orange;
        colors.yellow = colorPalette.thirdColor ?? colors.yellow;
        colors.green = colorPalette.forthColor ?? colors.green;
        colors.warning = colorPalette.warning ?? colors.warning;
        colors.black = colorPalette.darkColor ?? colors.black;
        colors.darkGray = colorPalette.mediumDarkColor ?? colors.darkGray;
        colors.gray = colorPalette.lightColor ?? colors.gray;
      }
    };
    setUserColors();
  }, [colorPalette]);

  useEffect(() => {
    const setUserStreangthText = () => {
      if (!streangthText || streangthText.length < 4) {
        setTextStatusArray(textStatusArrayInit);
        return;
      }
      setTextStatusArray([
        streangthText[0],
        streangthText[1],
        streangthText[2],
        streangthText[3],
      ]);
    };
    setUserStreangthText();
  }, [streangthText]);

  useEffect(() => {
    const evaluatePasswordStrength = () => {
      const weightLength = Math.min(password.length / nrOfChars, 1.0);
      const weightUpperCase = password.match(/[A-Z]/) ? 1.0 : 0.0;
      const weightSpecialChar = /[^a-zA-Z0-9]/.test(password) ? 1.0 : 0.0;
      const weightNumber = password.match(/[0-9]/) ? 1.0 : 0.0;

      const weightUpperCaseOn = hasAtLeastOneUpperCase ? 1 : 0;
      const weightSpecialCharOn = hasAtLeastOneSpecialChar ? 1 : 0;
      const weightNumberOn = hasAtLeastOneNumber ? 1 : 0;

      const numerator =
        weightLength +
        weightUpperCase * weightUpperCaseOn +
        weightSpecialChar * weightSpecialCharOn +
        weightNumber * weightNumberOn;
      const denominator =
        1.0 + weightUpperCaseOn + weightSpecialCharOn + weightNumberOn;

      const computedStrength = numerator / denominator;
      setStrength(computedStrength);
      setAchievementColors({
        length: weightLength >= 1.0 ? colors.green : colors.darkGray,
        upperCase: weightUpperCase >= 1.0 ? colors.green : colors.darkGray,
        specialChar: weightSpecialChar >= 1.0 ? colors.green : colors.darkGray,
        number: weightNumber >= 1.0 ? colors.green : colors.darkGray,
      });
    };

    evaluatePasswordStrength();
  }, [password]);

  useEffect(() => {
    setEqualPasswords(confirmPassword ? password === passwordChecker : true);
  }, [password, passwordChecker]);

  useEffect(() => {
    const determineStatusBar = () => {
      const updatedColors = [
        strength >= 0.25 ? colors.red : colors.gray,
        strength >= 0.5 ? colors.orange : colors.gray,
        strength >= 0.75 ? colors.yellow : colors.gray,
        strength >= 1.0 ? colors.green : colors.gray,
      ];
      setStatusColors(updatedColors);
      onStrengthChange?.(strength);
    };

    determineStatusBar();
  }, [strength]);

  return (
    <View style={styles.wrapper}>
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        showInput={showInput}
        setShowInput={setShowInput}
        placeholder="Enter password"
      />
      <ConfirmPasswordInput
        visible={confirmPassword}
        value={passwordChecker}
        onChangeText={setPasswordChecker}
        isCorrect={equalPasswords || password === ""}
        showInput={showInput}
      />
      <StatusBar colors={statusColors} />
      <StatusBarText strength={strength} textStatusArray={textStatusArray} />

      <Recommendations
        achievementColors={achievementColors}
        nrOfChars={nrOfChars}
        hasAtLeastOneUpperCase={hasAtLeastOneUpperCase}
        hasAtLeastOneSpecialChar={hasAtLeastOneSpecialChar}
        hasAtLeastOneNumber={hasAtLeastOneNumber}
        visible={showRecomendations}
      />
    </View>
  );
};
export default PasswordStrengthMeter;