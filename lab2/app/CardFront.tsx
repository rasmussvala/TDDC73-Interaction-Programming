import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";

import { colors, sizes } from "./theme";

interface CardFrontProps {
  inFocus?: string;
  cardName?: string;
}

const chipURL = require("./assets/images/chip.png");

function CardFront({ inFocus = "", cardName = "" }: CardFrontProps) {
  // Same as in cardBack
  const imageHeight = 40;
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const imageSource = "./assets/images/mastercard.png";

  useEffect(() => {
    const { width, height } = Image.resolveAssetSource(require(imageSource));

    const aspectRatio = width / height;
    const calculatedWidth = imageHeight * aspectRatio;
    setImageWidth(calculatedWidth);
  }, []);

  return (
    <ImageBackground
      source={require("./assets/images/21.jpeg")}
      style={styles.card}
    >
      <View style={styles.contentContainer}>
        <View style={styles.containerTop}>
          <Image source={chipURL} style={styles.chip} />
          <Image
            source={require(imageSource)}
            style={[
              styles.chip,
              {
                height: imageHeight,
                width: imageWidth,
                maxWidth: 80,
              },
            ]}
          />
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
          <View
            style={[
              styles.cardHolder,
              inFocus === "cardHolder" && styles.isInFocus,
            ]}
          >
            <Text style={styles.textHeader}>Card Holder</Text>
            <Text style={styles.cardText}> {cardName}</Text>
          </View>
          <View
            style={[
              styles.expiration,
              inFocus === "expires" && styles.isInFocus,
            ]}
          >
            <Text style={styles.textHeader}>Expires</Text>
            <Text style={styles.cardText}>MM/YY</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    padding: 16,
  },

  card: {
    flex: 1,
  },
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
    borderColor: "transparent", //colors.cardFocus,
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
    borderColor: "transparent", //colors.cardFocus,
  },

  expiration: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 8,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: "transparent", //colors.cardFocus,
  },

  isInFocus: {
    borderColor: colors.cardFocus,
  },
});

export default CardFront;
