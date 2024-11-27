import React, { useState } from "react";
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
  const handlePasswordChange = (event: string) => {
    setPassword(event);
  };

  const [password, setPassword] = useState<string>("");
  const checkconfirmPassword = true;
  const charLength = 8;

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
      <View>
        <View style={styles.status}>
          <View style={styles.statusItem}></View>
          <View style={styles.statusItem}></View>
          <View style={styles.statusItem}></View>
          <View style={styles.statusItem}></View>
        </View>
        <Text style={styles.statusText}>Strong</Text>
        <View style={styles.recommendContainer}>
          <Text style={styles.recommendHeader}>Recommended</Text>
          <View style={styles.recommendation}>
            <Text>✔</Text>
            <Text style={styles.recommendText}>1 lower case character</Text>
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
