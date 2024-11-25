import { useState } from "react";
import { View, Text, TextInput } from "react-native";

const confirmPasswordWidget = () => {
  const [confirmPassword, setconfirmPassword] = useState(null);

  return (
    <View>
      <Text>Enter new password</Text>
      <TextInput value={confirmPassword} onChangeText={setconfirmPassword} />
    </View>
  );
};

const PasswordStrengthMeter = () => {
  const [password, setPassword] = useState(null);
  const checkconfirmPassword = true;

  return (
    <View>
      <View>
        <Text>Enter new password</Text>
        <TextInput value={password} onChangeText={setPassword} />
      </View>
      {checkconfirmPassword && confirmPasswordWidget()}
    </View>
  );
};
export default PasswordStrengthMeter;
