import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { colors, styles } from "./styles/styles";
import PasswordInput from "./components/PasswordInput";
import StatusBar from "./components/StatusBar";
import StrengthText from "./components/StrengthText";
import Recommendations from "./components/Recommendations";
import ConfirmPasswordInput from "./components/ConfirmPasswordInput";

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

  const [textStatusArray, setTextStatusArray] = useState([
    "Weak",
    "Okay",
    "Good",
    "Strong",
  ]);
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
      if (!streangthText || streangthText.length < 4) return;
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
        value={passwordChecker}
        onChangeText={setPasswordChecker}
        isCorrect={equalPasswords || password === ""}
        showInput={showInput}
      />
      <StatusBar colors={statusColors} />
      <StrengthText strength={strength} textStatusArray={textStatusArray} />

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
