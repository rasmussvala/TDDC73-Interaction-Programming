import { View, Image, Text, StyleSheet } from "react-native";
import { colors, sizes } from "./theme";

const chipURL = require("./assets/images/chip.png");
const logoURL = require("./assets/images/mastercard.png");

export default function CardFront() {
  return (
    <>
      <View style={styles.containerTop}>
        <Image source={chipURL} style={styles.chip} />
        <Image source={logoURL} style={styles.chip} />
      </View>
      <View style={styles.containerCenter}>
        <View style={styles.cardNumberContainer}>
          <Text style={styles.cardNumberText}>####</Text>
          <Text style={styles.cardNumberText}>####</Text>
          <Text style={styles.cardNumberText}>####</Text>
          <Text style={styles.cardNumberText}>####</Text>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <View style={styles.cardHolder}>
          <Text style={styles.textHeader}>Card Holder</Text>
          <Text style={styles.cardText}>Yobama Svensson</Text>
        </View>
        <View style={styles.expiration}>
          <Text style={styles.textHeader}>Expires</Text>
          <Text style={styles.cardText}>MM/YY</Text>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  containerTop: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },

  chip: {
    height: 40,
    width: 50,
  },

  containerCenter: {
    flex: 1,
    justifyContent: "center",
  },

  cardNumberContainer: {
    alignSelf: "flex-start",
    padding: 8,
    gap: 24,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: colors.cardFocus,
  },

  cardText: {
    fontSize: 14,
    color: colors.cardText,
    textShadowColor: colors.textShadowColor,
    textShadowRadius: sizes.textShadowRadius,
  },

  cardNumberText: {
    fontSize: 16,
    color: colors.cardText,
    textShadowColor: colors.textShadowColor,
    textShadowRadius: sizes.textShadowRadius,
  },

  textHeader: {
    fontSize: 12,
    color: colors.cardHeader,
  },

  containerBottom: {
    flex: 1,
    flexDirection: "row",
    gap: 22,
  },

  cardHolder: {
    flex: 2.8,
    justifyContent: "flex-end",
    padding: 8,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: colors.cardFocus,
  },

  expiration: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 8,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: colors.cardFocus,
  },
});
