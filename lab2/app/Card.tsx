import { ImageBackground, View, StyleSheet } from "react-native";

import CardFront from "./CardFront";
import CardBack from "./CardBack";

export default function Card() {
  return (
    <View style={styles.cardContainer}>
      <CardBack />
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
});
