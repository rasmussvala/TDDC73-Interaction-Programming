import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type PasswordStrengthMeterProps = {
  nrOfChars?: number;
  hasAtLeastOneUpperCase?: boolean;
  hasAtLeastOneSpecialChar?: boolean;
  hasAtLeastOneNumber?: boolean;
  confirmPassword?: boolean;
  onStrengthChange?: (strength: number) => void;
};

const PasswordStrengthMeter = ({
  nrOfChars = 8,
  hasAtLeastOneUpperCase = true,
  hasAtLeastOneSpecialChar = true,
  hasAtLeastOneNumber = true,
  confirmPassword = true,
  onStrengthChange,
}: PasswordStrengthMeterProps) => {
  const [password, setPassword] = useState<string>("");
  const [strength, setStrength] = useState<number>(0.0);
  const [statusColors, setStatusColors] = useState([
    colors.gray,
    colors.gray,
    colors.gray,
    colors.gray,
  ]);
  const textStatusArray = ["Weak", "Okay", "Good", "Strong"];
  const [textStatus, setTextStatus] = useState<string>(textStatusArray[0]);

  const [achievementColors, setAchievementColors] = useState({
    length: colors.darkGray,
    upperCase: colors.darkGray,
    specialChar: colors.darkGray,
    number: colors.darkGray,
  });

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

      console.log(weightLength + " / " + 1.0);

      return num / denom;
    };

    const weight = getPasswordStrength();

    setStrength(weight ? weight : 0.0);
  }, [password]);

  useEffect(() => {
    const setStatusBar = () => {
      if (strength === undefined) return;
      const updatedColors = [
        strength >= 0.25 ? colors.red : colors.gray,
        strength >= 0.5 ? colors.orange : colors.gray,
        strength >= 0.75 ? colors.yellow : colors.gray,
        strength >= 1.0 ? colors.green : colors.gray,
      ];
      setStatusColors(updatedColors);

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
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={(e) => handlePasswordChange(e)}
        />
      </View>
      {confirmPassword && <ConfirmPasswordWidget />}
      <View style={styles.status}>
        {statusColors.map((color, index) => (
          <Animated.View
            key={`status-bar-${index}-with-color-${color}`}
            entering={FadeIn}
            exiting={FadeOut}
            style={[styles.statusItem, { backgroundColor: color }]}
          />
        ))}
      </View>
      <Text style={styles.statusText}>{textStatus}</Text>
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
      <Text style={[styles.recommendText, { color: color }]}>✔</Text>
      <Text style={[styles.recommendText, { color: color }]}>{text}</Text>
    </View>
  ) : null;
};

const ConfirmPasswordWidget = () => {
  const [confirmPassword, setconfirmPassword] = useState("");

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setconfirmPassword}
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
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 4,
    width: 300,
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
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

  recommendText: {
    fontSize: 12,
  },

  recommendation: {
    flexDirection: "row",
    gap: 4,
  },
});

export default PasswordStrengthMeter;
