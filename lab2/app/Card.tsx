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
  const showCardBack = inFocus === "cvv";
  return (
    <View style={styles.cardContainer}>
      <View style={!showCardBack ? styles.visible : styles.hidden}>
        <CardFront inFocus={inFocus} cardName={cardName} />
      </View>
      <View style={showCardBack ? styles.visible : styles.hidden}>
        <CardBack cvvText={cvvText} />
      </View>
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

  visible: {
    opacity: 1,
    width: "100%",
    height: "100%",
  },

  hidden: {
    opacity: 0,
    width: 0,
    height: 0,
  },
});
