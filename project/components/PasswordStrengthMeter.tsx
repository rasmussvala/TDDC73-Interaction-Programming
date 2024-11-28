import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  FadeInLeft,
  FadeOutRight,
} from "react-native-reanimated";

type PasswordStrengthMeterProps = {
  nrOfChars?: number;
  hasAtLeastOneUpperCase?: boolean;
  hasAtLeastOneSpecialChar?: boolean;
  hasAtLeastOneNumber?: boolean;
  confirmPassword?: boolean;
  onStrengthChange?: (strength: number) => void;
  showRecomendations?: boolean;
};

const PasswordStrengthMeter = ({
  nrOfChars = 8,
  hasAtLeastOneUpperCase = true,
  hasAtLeastOneSpecialChar = true,
  hasAtLeastOneNumber = true,
  confirmPassword = true,
  onStrengthChange,
  showRecomendations = true,
}: PasswordStrengthMeterProps) => {
  const [password, setPassword] = useState<string>("");
  const [passwordChecker, setPasswordChecker] = useState<string>("");
  const [strength, setStrength] = useState<number>(0.0);
  const [statusBarAColor, setStatusBarAColor] = useState<string>(colors.gray);
  const [statusBarBColor, setStatusBarBColor] = useState<string>(colors.gray);
  const [statusBarCColor, setStatusBarCColor] = useState<string>(colors.gray);
  const [statusBarDColor, setStatusBarDColor] = useState<string>(colors.gray);
  const textStatusArray = ["Weak", "Okay", "Good", "Strong"];
  const [textStatus, setTextStatus] = useState<string>(textStatusArray[0]);
  const [achievementColors, setAchievementColors] = useState({
    length: colors.darkGray,
    upperCase: colors.darkGray,
    specialChar: colors.darkGray,
    number: colors.darkGray,
  });
  const [equalPasswords, setEqualPasswords] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handlePasswordChange = (event: string) => {
    setPassword(event);
  };

  useEffect(() => {
    const setFulfilledRecommendation = (
      weightLength: number,
      weightUpperCase: number,
      weightSpecialChar: number,
      weightNumber: number
    ) => {
      setAchievementColors({
        length: weightLength >= 1.0 ? colors.green : colors.darkGray,
        upperCase: weightUpperCase >= 1.0 ? colors.green : colors.darkGray,
        specialChar: weightSpecialChar >= 1.0 ? colors.green : colors.darkGray,
        number: weightNumber >= 1.0 ? colors.green : colors.darkGray,
      });
    };

    const getPasswordStrength = () => {
      const weightLength = Math.min(password.length / nrOfChars, 1.0);
      const weightNumber = password.match(/[0-9]/) ? 1.0 : 0.0;
      const weightUpperCase = password.match(/[A-Z]/) ? 1.0 : 0.0;
      const weightSpecialChar = /[^a-zA-Z0-9]/.test(password) ? 1.0 : 0.0;

      setFulfilledRecommendation(
        weightLength,
        weightUpperCase,
        weightSpecialChar,
        weightNumber
      );

      const weightUpperCaseOn = Number(hasAtLeastOneUpperCase);
      const weightSpecialCharOn = Number(hasAtLeastOneSpecialChar);
      const weightNumberOn = Number(hasAtLeastOneNumber);

      const num =
        weightLength +
        weightUpperCase * weightUpperCaseOn +
        weightSpecialChar * weightSpecialCharOn +
        weightNumber * weightNumberOn;
      const denom =
        1.0 + weightUpperCaseOn + weightSpecialCharOn + weightNumberOn;

      return num / denom;
    };

    const weight = getPasswordStrength();
    setStrength(weight ? weight : 0.0);
  }, [password]);

  useEffect(() => {
    const testChecker = () => {
      password === passwordChecker
        ? setEqualPasswords(true)
        : setEqualPasswords(false);
    };

    confirmPassword ? testChecker() : setEqualPasswords(true);
  }, [password, passwordChecker]);

  useEffect(() => {
    const setStatusBar = () => {
      if (strength === undefined) return;
      setStatusBarAColor(strength >= 0.25 ? colors.red : colors.gray);
      setStatusBarBColor(strength >= 0.5 ? colors.orange : colors.gray);
      setStatusBarCColor(strength >= 0.75 ? colors.yellow : colors.gray);
      setStatusBarDColor(strength >= 1.0 ? colors.green : colors.gray);

      setTextStatus(
        strength >= 1.0
          ? textStatusArray[3]
          : strength >= 0.75
          ? textStatusArray[2]
          : strength >= 0.5
          ? textStatusArray[1]
          : strength >= 0.25
          ? textStatusArray[0]
          : "Strength"
      );
    };
    setStatusBar();

    onStrengthChange && onStrengthChange(strength);
  }, [strength]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={(e) => handlePasswordChange(e)}
          secureTextEntry={!showInput}
        ></TextInput>
        <TouchableOpacity
          style={styles.showButton}
          onPress={() => setShowInput(!showInput)}
        >
          <Text>{showInput ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
      {confirmPassword && (
        <ConfirmPasswordWidget
          passwordChecker={passwordChecker}
          setPasswordChecker={setPasswordChecker}
          isCorrect={equalPasswords || password === ""}
          showInput={showInput}
        />
      )}
      <View style={styles.status}>
        <View
          style={[styles.statusItem, { backgroundColor: statusBarAColor }]}
        />
        <View
          style={[styles.statusItem, { backgroundColor: statusBarBColor }]}
        />
        <View
          style={[styles.statusItem, { backgroundColor: statusBarCColor }]}
        />
        <View
          style={[styles.statusItem, { backgroundColor: statusBarDColor }]}
        />
      </View>
      {showRecomendations && (
        <View style={styles.recommendContainer}>
          <Text style={styles.recommendHeader}>Recommended</Text>
          <RecommendationItem
            text="1 number"
            color={achievementColors.number}
            achieved={hasAtLeastOneNumber}
          />
          <RecommendationItem
            text="1 upper case character"
            color={achievementColors.upperCase}
            achieved={hasAtLeastOneUpperCase}
          />
          <RecommendationItem
            text="1 special character"
            color={achievementColors.specialChar}
            achieved={hasAtLeastOneSpecialChar}
          />
          <RecommendationItem
            text={`${nrOfChars} characters`}
            color={achievementColors.length}
            achieved={true}
          />
        </View>
      )}
    </View>
  );
};

const RecommendationItem = ({
  text,
  color,
  achieved,
}: {
  text: string;
  color: string;
  achieved: boolean;
}) => {
  return achieved ? (
    <View style={styles.recommendation}>
      <Text style={[styles.recomendIcon, { color: color }]}>✓</Text>
      <Animated.Text
        style={[styles.recommendText, { color: color }]}
        key={color + "-" + text}
        entering={FadeIn}
        exiting={FadeOut}
      >
        {text}
      </Animated.Text>
    </View>
  ) : null;
};

type ConfirmPasswordWidgetProps = {
  passwordChecker: string;
  setPasswordChecker: React.Dispatch<React.SetStateAction<string>>;
  isCorrect: boolean;
  showInput: boolean;
};

const ConfirmPasswordWidget = ({
  passwordChecker,
  setPasswordChecker,
  isCorrect,
  showInput,
}: ConfirmPasswordWidgetProps) => {
  return (
    <View
      style={[
        styles.inputWrapper,
        { backgroundColor: isCorrect ? "none" : colors.warning },
      ]}
    >
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        value={passwordChecker}
        onChangeText={setPasswordChecker}
        secureTextEntry={!showInput}
      />
    </View>
  );
};

const colors = {
  green: "#2a9d8f",
  yellow: "#bbce60",
  orange: "#f4a261",
  red: "#e76f51",
  gray: "#d3d3d3",
  darkGray: "#808080",
  black: "#000",
  warning: "rgba(231, 111, 81, 0.3)",
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 4,
    width: 300,
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 4,
  },
  input: {
    padding: 10,

    flex: 1,
    outline: "none",
  },

  showButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  status: {
    height: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },

  statusItem: {
    backgroundColor: colors.gray,
    flex: 1,
    marginTop: 4,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 12,
    color: colors.darkGray,
  },

  recommendContainer: {
    marginTop: 8,
  },

  recommendHeader: {
    fontSize: 12,
    fontWeight: "bold",
  },

  recomendIcon: {
    fontSize: 12,
    fontWeight: "900",
  },

  recommendText: {
    fontSize: 12,
  },

  recommendation: {
    flexDirection: "row",
    gap: 4,
  },
});

export default PasswordStrengthMeter;
