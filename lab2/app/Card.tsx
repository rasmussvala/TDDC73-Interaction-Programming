import { View, StyleSheet, Text, Pressable } from "react-native";

import CardFront from "./CardFront";
import CardBack from "./CardBack";
import { useEffect, useState } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = inFocus === "cvv" ? 1 : 0;

    setShowCardBack(inFocus === "cvv");
  }, [inFocus]);

  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });
  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });

  return (
    <View style={styles.cardContainer}>
      <Animated.View style={[styles.card, styles.front, frontAnimatedStyles]}>
        <CardFront
          inFocus={inFocus}
          cardName={cardName}
          cardNumbers={cardNumbers}
          backgroundImageIndex={backgroundImageIndex}
        />
      </Animated.View>
      <Animated.View style={[styles.card, styles.back, backAnimatedStyles]}>
        <CardBack
          cvvText={cvvText}
          card4FirstNumbers={cardNumbers[0]}
          backgroundImageIndex={backgroundImageIndex}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    zIndex: 1,
    transform: [{ translateY: 80 }],
    height: 200,
    width: 300,
  },

  card: {
    borderRadius: 14,
    // phone
    elevation: 20,
    // web
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 30,
    overflow: "hidden",
  },

  front: {
    position: "absolute",
    backfaceVisibility: "hidden",
    width: "100%",
    height: "100%",
  },
  back: {
    position: "absolute",
    backfaceVisibility: "hidden",
    width: "100%",
    height: "100%",
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
