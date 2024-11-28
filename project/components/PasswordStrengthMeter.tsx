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
  const [statusColors, setStatusColors] = useState<string[]>(
    Array(4).fill(colors.gray)
  );

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
      <ConfirmPasswordWidget
        passwordChecker={passwordChecker}
        setPasswordChecker={setPasswordChecker}
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

const PasswordInput = ({
  value,
  onChangeText,
  showInput,
  setShowInput,
  placeholder,
}: {
  value: string;
  onChangeText: (value: string) => void;
  showInput: boolean;
  setShowInput: (value: boolean) => void;
  placeholder: string;
}) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showInput}
      />
      <TouchableOpacity
        style={styles.showButton}
        onPress={() => setShowInput(!showInput)}
      >
        <Text>{showInput ? "Hide" : "Show"}</Text>
      </TouchableOpacity>
    </View>
  );
};

type StatusBarProps = { colors: string[] };

const StatusBar = ({ colors }: StatusBarProps) => {
  return (
    <View style={styles.status}>
      {colors.map((color, index) => (
        <Animated.View
          key={`status-bar-${index}-with-color-${color}`}
          entering={FadeIn}
          exiting={FadeOut}
          style={[styles.statusItem, { backgroundColor: color }]}
        />
      ))}
    </View>
  );
};

const StrengthText = ({
  strength,
  textStatusArray,
}: {
  strength: number;
  textStatusArray: string[];
}) => {
  const textStatus =
    strength >= 1.0
      ? textStatusArray[3]
      : strength >= 0.75
      ? textStatusArray[2]
      : strength >= 0.5
      ? textStatusArray[1]
      : textStatusArray[0];

  return (
    <View style={styles.statusTextWrapper}>
      <Animated.Text
        style={styles.statusText}
        key={textStatus}
        entering={FadeInLeft}
        exiting={FadeOutRight}
      >
        {textStatus}
      </Animated.Text>
    </View>
  );
};

type AchievementColors = {
  length: string;
  upperCase: string;
  specialChar: string;
  number: string;
};

const Recommendations = ({
  achievementColors,
  nrOfChars,
  hasAtLeastOneUpperCase,
  hasAtLeastOneSpecialChar,
  hasAtLeastOneNumber,
  visible = true,
}: {
  achievementColors: AchievementColors;
  nrOfChars: number;
  hasAtLeastOneUpperCase: boolean;
  hasAtLeastOneSpecialChar: boolean;
  hasAtLeastOneNumber: boolean;
  visible?: boolean;
}) => {
  return (
    <View>
      {visible && (
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
  return (
    achieved && (
      <View style={styles.recommendation}>
        <Text style={[styles.recommendText, { color }]}>{`✔`}</Text>
        <Text style={[styles.recommendText, { color }]}>{text}</Text>
      </View>
    )
  );
};

type ConfirmPasswordWidgetProps = {
  passwordChecker: string;
  setPasswordChecker: React.Dispatch<React.SetStateAction<string>>;
  isCorrect: boolean;
  showInput: boolean;
  visible?: boolean;
};

const ConfirmPasswordWidget = ({
  visible = true,
  passwordChecker,
  setPasswordChecker,
  isCorrect,
  showInput,
}: ConfirmPasswordWidgetProps) => {
  return (
    <View>
      {visible && (
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
      )}
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

  statusTextWrapper: {
    height: 16,
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
