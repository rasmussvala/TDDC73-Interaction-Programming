import { ImageBackground, View, StyleSheet } from "react-native";

import CardFront from "./CardFront";

export default function Card() {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={require("./assets/images/21.jpeg")}
        style={styles.card}
      >
        <View style={styles.contentContainer}>
          <CardFront />
        </View>
      </ImageBackground>
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

  card: {
    flex: 1,
  },

  contentContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    padding: 16,
  },
});
