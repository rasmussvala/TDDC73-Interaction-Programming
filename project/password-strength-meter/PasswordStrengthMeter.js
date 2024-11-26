import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const confirmPasswordWidget = () => {
  const [confirmPassword, setconfirmPassword] = useState(null);

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
  const [password, setPassword] = useState(null);
  const checkconfirmPassword = true;

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {checkconfirmPassword && confirmPasswordWidget()}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});

export default PasswordStrengthMeter;