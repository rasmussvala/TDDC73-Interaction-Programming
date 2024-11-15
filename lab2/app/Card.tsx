import { ImageBackground, View, StyleSheet } from "react-native";

import CardFront from "./CardFront";
import CardBack from "./CardBack";

interface CardProps {
  inFocus?: string;
  cardName?: string;
  cvvText?: string;
}

export default function Card({
  inFocus = "",
  cardName = "",
  cvvText = "",
}: CardProps) {
  const ShowCard = () => {
    return inFocus === "cvv" ? (
      <CardBack cvvText={cvvText} />
    ) : (
      <CardFront inFocus={inFocus} cardName={cardName} />
    );
  };

  return (
    <View style={styles.cardContainer}>
      <ShowCard />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    zIndex: 1,
    transform: [{ translateY: 80 }],
    height: 200,
    width: 300,
    borderRadius: 14,
    overflow: "hidden",
    elevation: 20,
  },
});
