import { View, Text } from "react-native";
import RecommendationItem from "./RecommendationItem";
import { styles } from "../../styles/styles";

type AchievementColors = {
  length: string;
  upperCase: string;
  specialChar: string;
  number: string;
};

type Props = {
  achievementColors: AchievementColors;
  nrOfChars: number;
  hasAtLeastOneUpperCase: boolean;
  hasAtLeastOneSpecialChar: boolean;
  hasAtLeastOneNumber: boolean;
  visible?: boolean;
};

const Recommendations = ({
  achievementColors,
  nrOfChars,
  hasAtLeastOneUpperCase,
  hasAtLeastOneSpecialChar,
  hasAtLeastOneNumber,
  visible = true,
}: Props) => {
  return (
    <View>
      {visible && (
        <View style={styles.recommendContainer}>
          <Text style={styles.recommendHeader}>Recommended</Text>
          <RecommendationItem
            text="1 number"
            color={achievementColors.number}
            achieved={hasAtLeastOneNumber}
          />
          <RecommendationItem
            text="1 upper case character"
            color={achievementColors.upperCase}
            achieved={hasAtLeastOneUpperCase}
          />
          <RecommendationItem
            text="1 special character"
            color={achievementColors.specialChar}
            achieved={hasAtLeastOneSpecialChar}
          />
          <RecommendationItem
            text={`${nrOfChars} characters`}
            color={achievementColors.length}
            achieved={true}
          />
        </View>
      )}
    </View>
  );
};

export default Recommendations;
