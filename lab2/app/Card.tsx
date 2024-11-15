import { ImageBackground, View, StyleSheet } from "react-native";

import CardFront from "./CardFront";
import CardBack from "./CardBack";

export default function Card() {
  return (
    <View style={styles.cardContainer}>
      <CardFront />
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
