import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

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

const PasswordStrengthMeter = () => {
  const [password, setPassword] = useState<string>("");
  const [strength, setStrength] = useState<number>(0.0);
  const [statusBarAColor, setStatusBarAColor] = useState<string>(colors.gray);
  const [statusBarBColor, setStatusBarBColor] = useState<string>(colors.gray);
  const [statusBarCColor, setStatusBarCColor] = useState<string>(colors.gray);
  const [statusBarDColor, setStatusBarDColor] = useState<string>(colors.gray);

  const checkconfirmPassword = true;
  const charLength = 8;

  const handlePasswordChange = (event: string) => {
    setPassword(event);
  };

  useEffect(() => {
    const getPasswordStrength = () => {
      const weightLength = Math.min(password.length / charLength, 1.0);
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
      strength >= 0.25
        ? setStatusBarAColor(colors.red)
        : setStatusBarAColor(colors.gray);
      strength >= 0.5
        ? setStatusBarBColor(colors.orange)
        : setStatusBarBColor(colors.gray);
      strength >= 0.75
        ? setStatusBarCColor(colors.yellow)
        : setStatusBarCColor(colors.gray);
      strength >= 1.0
        ? setStatusBarDColor(colors.green)
        : setStatusBarDColor(colors.gray);
    };
    setStatusBar();
  }, [strength]);

  return (
    <View style={styles.wrapper}>
      <View>
        <Text>strength: {strength}</Text>
        <Text>password: {password}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={(e) => handlePasswordChange(e)}
        />
      </View>
      {checkconfirmPassword && <ConfirmPasswordWidget />}
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
      <View style={styles.statusTextContainer}>
        <Text style={styles.statusText}>Strong</Text>
      </View>
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
          <Text style={styles.recommendText}>{charLength} characters</Text>
        </View>
      </View>
    </View>
  );
};

const colors = {
  green: "#2a9d8f",
  yellow: "#e9c46a",
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
    flex: 1,
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

  statusTextContainer: {
    flex: 1,
    flexDirection: "row",
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
