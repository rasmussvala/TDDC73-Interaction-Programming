import { View, StyleSheet } from "react-native";

import CardFront from "./CardFront";
import CardBack from "./CardBack";
import { useEffect, useState } from "react";

interface CardProps {
  inFocus?: string;
  cardName?: string;
  cvvText?: string;
  cardNumbers?: Array<string>;
  backgroundImageIndex?: string;
}

export default function Card({
  inFocus = "",
  cardName = "",
  cvvText = "",
  cardNumbers = [],
  backgroundImageIndex = "21",
}: CardProps) {
  const [showCardBack, setShowCardBack] = useState<boolean>(false);

  useEffect(() => {
    setShowCardBack(inFocus === "cvv");
  }, [inFocus]);

  return (
    <View style={styles.cardContainer}>
      <View style={!showCardBack ? styles.visible : styles.hidden}>
        <CardFront
          inFocus={inFocus}
          cardName={cardName}
          cardNumbers={cardNumbers}
          backgroundImageIndex={backgroundImageIndex}
        />
      </View>
      <View style={showCardBack ? styles.visible : styles.hidden}>
        <CardBack
          cvvText={cvvText}
          card4FirstNumbers={cardNumbers[0]}
          backgroundImageIndex={backgroundImageIndex}
        />
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
    // phone
    elevation: 20,
    // web
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 30,
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
