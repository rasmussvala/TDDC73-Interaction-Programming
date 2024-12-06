import { View } from "react-native";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { styles } from "../../styles/styles";

type Props = {
  strength: number;
  textStatusArray: string[];
};

const StatusBarText = ({ strength, textStatusArray }: Props) => {
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

export default StatusBarText;
