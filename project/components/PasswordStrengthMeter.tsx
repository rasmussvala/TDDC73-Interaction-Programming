import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

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

const PasswordStrengthMeter = ({ nrOfCharacters = 8 }) => {
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

  const checkconfirmPassword = true;

  const handlePasswordChange = (event: string) => {
    setPassword(event);
  };

  useEffect(() => {
    const getPasswordStrength = () => {
      const weightLength = Math.min(password.length / nrOfCharacters, 1.0);
      const weightNumber = password.match(/[0-9]/) ? 1.0 : 0.0;
      const weightUpperCase = password.match(/[A-Z]/) ? 1.0 : 0.0;
      const weightSpecialCharacter = /[^a-zA-Z0-9]/.test(password) ? 1.0 : 0.0;

      // @TODO: REPLACE
      const weightNumberOn = 1.0;
      const weightUpperCaseOn = 1.0;
      const weightSpecialCharacterOn = 1.0;

      const num =
        weightLength +
        weightNumber * weightNumberOn +
        weightUpperCase * weightUpperCaseOn +
        weightSpecialCharacter * weightSpecialCharacterOn;
      const denom =
        weightNumberOn + weightUpperCaseOn + weightSpecialCharacterOn + 1.0;

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
          : "Strenght"
      );
    };
    setStatusBar();
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
      {checkconfirmPassword && <ConfirmPasswordWidget />}
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
        <View style={styles.recommendation}>
          <Text>✔</Text>
          <Text style={styles.recommendText}>1 number</Text>
        </View>
        <View style={styles.recommendation}>
          <Text>✔</Text>
          <Text style={styles.recommendText}>1 upper case character</Text>
        </View>
        <View style={styles.recommendation}>
          <Text>✔</Text>
          <Text style={styles.recommendText}>1 special character</Text>
        </View>
        <View style={styles.recommendation}>
          <Text>✔</Text>
          <Text style={styles.recommendText}>{nrOfCharacters} characters</Text>
        </View>
      </View>
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
