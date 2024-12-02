import { View, Text } from "react-native";
import { styles } from "../../styles/styles";

const RecommendationItem = ({
  text,
  color,
  achieved,
}: {
  text: string;
  color: string;
  achieved: boolean;
}) => {
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
