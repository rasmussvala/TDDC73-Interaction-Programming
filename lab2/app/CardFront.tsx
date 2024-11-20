import { View, Image, Text, StyleSheet, ImageBackground } from "react-native";

import { colors, sizes } from "./theme";
import useImageWidth from "./hooks/useImageWidth";
import { getCardType, getLogo } from "./cardLogoUtils";
import { getBackgroundImage } from "./backgroundImageUtils";
import { useExpiration } from "./components/ExpirationContext";

interface CardFrontProps {
  inFocus?: string;
  cardName?: string;
  cardNumbers?: Array<string>;
  backgroundImageIndex?: string;
}

function CardFront({
  inFocus = "",
  cardName = "",
  cardNumbers = [],
  backgroundImageIndex = "21",
}: CardFrontProps) {
  const chipURL = require("./assets/images/chip.png");

  const logoHeight = 40;
  const logoSource = getLogo(getCardType(cardNumbers[0]));
  const logoWidth = useImageWidth(logoSource, logoHeight);
  const backgroundImage = getBackgroundImage(backgroundImageIndex);
  const { month, year } = useExpiration();

  const writeNumbers = (cardNumbers: string[]) => {
    return (
      <View
        style={[
          styles.cardNumberContainer,
          inFocus === "cardNumber" && styles.isInFocus,
        ]}
      >
        {cardNumbers.map((chunk, index) => {
          const characters = chunk.split(""); // Split each chunk into characters
          return (
            <View
              key={index}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {characters.map((number, charIndex) => (
                <Text key={charIndex} style={styles.cardNumberText}>
                  {number}
                </Text>
              ))}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.card}>
      <View style={styles.contentContainer}>
        <View style={styles.containerTop}>
          <Image source={chipURL} style={styles.chip} />
          <Image
            source={logoSource}
            style={[
              styles.chip,
              {
                height: logoHeight,
                width: logoWidth,
                maxWidth: 80,
              },
            ]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.containerCenter}>{writeNumbers(cardNumbers)}</View>
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
            <Text style={styles.cardText}>
              {month}/{year.substring(2)}
            </Text>
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
    width: 240,
    height: 40,
  },

  cardText: {
    fontSize: 14,
    color: colors.cardText,
    textShadowColor: colors.textShadowColor,
    textShadowRadius: sizes.textShadowRadius,
    overflow: "hidden",
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
