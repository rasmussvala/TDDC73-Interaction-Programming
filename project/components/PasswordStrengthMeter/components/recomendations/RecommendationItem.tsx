import { View, Text } from "react-native";
import { styles } from "../../styles/styles";

type Props = {
  text: string;
  color: string;
  achieved: boolean;
};

const RecommendationItem = ({ text, color, achieved }: Props) => {
  return (
    achieved && (
      <View style={styles.recommendation}>
        <Text style={[styles.recommendTextIcon, { color }]}>{`✓`}</Text>
        <Text style={[styles.recommendText, { color }]}>{text}</Text>
      </View>
    )
  );
};

export default RecommendationItem;
