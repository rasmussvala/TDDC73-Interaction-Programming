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
  const [password, setPassword] = useState("");
  const checkconfirmPassword = false;

  return (
    <View style={styles.wrapper}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View>
        <View style={styles.status}>
          <View style={styles.statusItem}></View>
          <View style={styles.statusItem}></View>
          <View style={styles.statusItem}></View>
          <View style={styles.statusItem}></View>
        </View>
        <View style={styles.statusTextContainer}>
          <Text style={styles.statusText}>Strong</Text>
        </View>
      </View>
      {checkconfirmPassword && <ConfirmPasswordWidget />}
    </View>
  );
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
  },

  status: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },

  statusItem: {
    backgroundColor: "lightgray",
    flex: 1,
    marginTop: 4,
    borderRadius: 10,
  },

  statusTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  statusText: {
    fontSize: 12,
    color: "gray",
  },
});

export default PasswordStrengthMeter;
