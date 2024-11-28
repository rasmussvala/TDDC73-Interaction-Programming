import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { styles } from "../styles/styles";

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

export default StatusBar;
