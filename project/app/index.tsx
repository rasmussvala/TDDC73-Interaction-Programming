import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter/PasswordStrengthMeter";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="auto"></StatusBar>
      <PasswordStrengthMeter />
    </View>
  );
}
